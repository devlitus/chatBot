import { addMessageToDB, getMessagesFromDB } from '../utils/db';
import { marked } from 'marked';

const messagesContainer = document.getElementById('messages-container') as HTMLDivElement | null;
const messageInput = document.getElementById('message-input') as HTMLInputElement | null;
const sendButton = document.getElementById('send-button') as HTMLButtonElement | null;

function createUserMessageElement(message: string): HTMLDivElement {
  const messageElement = document.createElement('div');
  messageElement.className = 'flex items-start gap-2.5 justify-end';
  messageElement.innerHTML = `
    <div class="flex flex-col w-fit leading-1.5 p-5 bg-gray-800 rounded-s-xl rounded-ee-xl">
      <p class="text-lg text-balance font-normal text-white"></p>
    </div>
  `;
  const p = messageElement.querySelector('p');
  if (p) {
    p.textContent = message;
  }
  return messageElement;
}

function createBotMessageElement(message: string): HTMLDivElement {
  const messageElement = document.createElement('div');
  messageElement.className = 'flex items-start gap-2.5';
  messageElement.innerHTML = `
    <div class="flex flex-col w-fit leading-1.5 p-5">
       <p class="text-lg text-balance font-normal text-gray-300"></p>
    </div>
  `;
  const parsedContent = marked.parse(message);
  if (typeof parsedContent === 'string') {
    const p = messageElement.querySelector('p');
    if (p) {
      p.innerHTML = parsedContent;
    }
  }
  return messageElement;
}

function renderMessage(message: string, sender: 'user' | 'bot') {
  if (!messagesContainer) return;

  let messageElement: HTMLDivElement;

  if (sender === 'user') {
    messageElement = createUserMessageElement(message);
  } else {
    messageElement = createBotMessageElement(message);
  }

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function addMessage(text: string, sender: 'user' | 'bot') {
  renderMessage(text, sender);
  await addMessageToDB({ text, sender });
}

async function handleSendMessage() {
  if (!messageInput || !messageInput.value) return;

  const message = messageInput.value.trim();
  if (message) {
    await addMessage(message, 'user');
    messageInput.value = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      await addMessage(data, 'bot');
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally, render an error message to the user in the chat
      await addMessage('Error: Could not connect to the server. Please try again later.', 'bot');
    }
  }
}

async function loadMessages() {
  const messages = await getMessagesFromDB();
  if (messages.length === 0) {
    await addMessage('¡Hola! ¿Cómo puedo ayudarte hoy?', 'bot');
  } else {
    messages.forEach(msg => renderMessage(msg.text, msg.sender));
  }
}

function initializeChat(): void {
  if (sendButton) {
    sendButton.addEventListener('click', handleSendMessage);
  }

  if (messageInput) {
    messageInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    });
  }
  loadMessages();
}

// Initialize chat when the DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChat);
} else {
  // DOMContentLoaded has already fired
  initializeChat();
}
