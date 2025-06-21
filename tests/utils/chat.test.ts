import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { JSDOM } from 'jsdom';
import { 
  createUserMessageElement, 
  createBotMessageElement,
  renderMessage,
  addMessage,
  handleSendMessage,
  loadMessages,
  initializeChat
} from '../../src/utils/chat';
import { marked } from 'marked';
import { getMessagesFromDB } from '../../src/utils/db';

// Mocking marked
vi.mock('marked', () => ({
  marked: {
    parse: vi.fn((text) => text),
  },
}));

// Mocking db functions
vi.mock('../../src/utils/db', () => ({
  addMessageToDB: vi.fn(),
  getMessagesFromDB: vi.fn().mockResolvedValue([]),
}));


describe('Chat utilities', () => {
  beforeEach(() => {
    // Reset DOM before each test
    const dom = new JSDOM(
      `<!DOCTYPE html>
      <html>
        <body>
          <div id="messages-container"></div>
          <input id="message-input" type="text" />
          <button id="send-button"></button>
          <div id="loading-indicator" class="hidden"></div>
        </body>
      </html>`,
      { url: 'http://localhost' }
    );

    global.document = dom.window.document;
    global.window = dom.window as unknown as Window & typeof globalThis;
    global.HTMLElement = dom.window.HTMLElement;
    global.HTMLDivElement = dom.window.HTMLDivElement;
    global.HTMLInputElement = dom.window.HTMLInputElement;
    global.HTMLButtonElement = dom.window.HTMLButtonElement;
    global.fetch = vi.fn();
    vi.clearAllMocks();

    initializeChat();
  });

  describe('createUserMessageElement', () => {
    it('should create a user message element with the correct text', () => {
      const message = 'Hello, world!';
      const element = createUserMessageElement(message);
      
      expect(element).toBeInstanceOf(global.HTMLDivElement);
      expect(element.className).toContain('justify-end');
      const p = element.querySelector('p');
      expect(p?.textContent).toBe(message);
    });
  });

  describe('createBotMessageElement', () => {
    it('should create a bot message element with the correct text', () => {
      const message = 'Hello from the bot!';
      const element = createBotMessageElement(message);

      expect(element).toBeInstanceOf(global.HTMLDivElement);
      expect(element.className).not.toContain('justify-end');
      const p = element.querySelector('p');
      expect(p?.innerHTML).toBe(message);
      expect(marked.parse).toHaveBeenCalledWith(message);
    });
  });

  describe('renderMessage', () => {
    it('should append a user message to the messages container', () => {
      const message = 'User message';
      const initialCount = document.getElementById('messages-container')?.children.length || 0;
      renderMessage(message, 'user');
      const container = document.getElementById('messages-container');
      expect(container?.children.length).toBe(initialCount + 1);
      expect(container?.lastElementChild?.className).toContain('justify-end');
      expect(container?.lastElementChild?.textContent?.trim()).toBe(message);
    });

    it('should append a bot message to the messages container', () => {
      const message = 'Bot message';
      const initialCount = document.getElementById('messages-container')?.children.length || 0;
      renderMessage(message, 'bot');
      const container = document.getElementById('messages-container');
      expect(container?.children.length).toBe(initialCount + 1);
      expect(container?.lastElementChild?.className).not.toContain('justify-end');
    });
  });

  describe('handleSendMessage', async () => {
    it('should do nothing if message input is empty', async () => {
      const input = document.getElementById('message-input') as HTMLInputElement;
      input.value = ' ';
      const initialCount = document.getElementById('messages-container')?.children.length || 0;
      await handleSendMessage();
      const container = document.getElementById('messages-container');
      expect(container?.children.length).toBe(initialCount);
    });

    it('should add user message, call API, and add bot message on success', async () => {
      const input = document.getElementById('message-input') as HTMLInputElement;
      input.value = 'Test message';
      const initialCount = document.getElementById('messages-container')?.children.length || 0;

      const mockResponse = 'Bot response';
      (fetch as Mock).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockResponse),
      });

      await handleSendMessage();

      const container = document.getElementById('messages-container');
      expect(container?.children.length).toBe(initialCount + 2);
      // Messages are appended, so we check the last two children
      const userMessageEl = container?.children[initialCount];
      const botMessageEl = container?.children[initialCount + 1];

      expect(userMessageEl?.textContent?.trim()).toBe('Test message');
      expect(botMessageEl?.textContent?.trim()).toBe(mockResponse);
      expect(input.value).toBe('');
      expect(document.getElementById('loading-indicator')?.classList.contains('hidden')).toBe(true);
    });

     it('should show an error message if fetch fails', async () => {
      const input = document.getElementById('message-input') as HTMLInputElement;
      input.value = 'Test message';
      const initialCount = document.getElementById('messages-container')?.children.length || 0;

      (fetch as Mock).mockRejectedValue(new Error('Network error'));

      await handleSendMessage();

      const container = document.getElementById('messages-container');
      expect(container?.children.length).toBe(initialCount + 2);
      const userMessageEl = container?.children[initialCount];
      const botMessageEl = container?.children[initialCount + 1];
      expect(userMessageEl?.textContent?.trim()).toBe('Test message');
      expect(botMessageEl?.textContent?.trim()).toContain('Error: Could not connect to the server.');
      expect(document.getElementById('loading-indicator')?.classList.contains('hidden')).toBe(true);
    });
  });

  describe('loadMessages', () => {
    it('should render initial bot message if no messages in DB', async () => {
        (getMessagesFromDB as Mock).mockResolvedValue([]);
        // Clear container to test loadMessages in isolation
        const container = document.getElementById('messages-container');
        if(container) container.innerHTML = '';
        await loadMessages();
        expect(container?.children.length).toBe(1);
        expect(container?.firstElementChild?.textContent?.trim()).toBe('¡Hola! ¿Cómo puedo ayudarte hoy?');
    });

    it('should render messages from DB', async () => {
        const messages = [
            { text: 'Hello', sender: 'user' },
            { text: 'Hi there', sender: 'bot' },
        ];
        (getMessagesFromDB as Mock).mockResolvedValue(messages);
        // Clear container to test loadMessages in isolation
        const container = document.getElementById('messages-container');
        if(container) container.innerHTML = '';
        await loadMessages();
        expect(container?.children.length).toBe(2);
        expect(container?.children[0].textContent?.trim()).toBe('Hello');
        expect(container?.children[1].textContent?.trim()).toBe('Hi there');
    });
  });

  describe('initializeChat', () => {
    beforeEach(() => {
      // For these specific tests, we need to reset the DOM and NOT call initializeChat
      const dom = new JSDOM(
        `<!DOCTYPE html>
        <html>
          <body>
            <div id="messages-container"></div>
            <input id="message-input" type="text" />
            <button id="send-button"></button>
            <div id="loading-indicator" class="hidden"></div>
          </body>
        </html>`,
        { url: 'http://localhost' }
      );
  
      global.document = dom.window.document;
      global.window = dom.window as unknown as Window & typeof globalThis;
      vi.clearAllMocks();
      (getMessagesFromDB as Mock).mockResolvedValue([]);
    })
    it('should add event listener to send button and call loadMessages', () => {
      const sendButton = document.getElementById('send-button') as HTMLButtonElement;
      const handleSpy = vi.spyOn(sendButton, 'addEventListener');
      
      initializeChat();

      expect(handleSpy).toHaveBeenCalledWith('click', handleSendMessage);
      // We expect one call from initializeChat -> loadMessages
      expect(getMessagesFromDB).toHaveBeenCalledTimes(1);
    });

     it('should add event listener for Enter key on message input', () => {
      const messageInput = document.getElementById('message-input') as HTMLInputElement;
      const handleSpy = vi.spyOn(messageInput, 'addEventListener');
      
      initializeChat();

      expect(handleSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });
});