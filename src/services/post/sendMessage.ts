import { GROQ_API_KEY, GROQ_URL_COMPLETION } from "@/constants";
import { ChatMessage, ChatResponse } from "@/types/chatResponse";

interface SendMessageParams {
  model: string;
  messages: ChatMessage[];
}

/**
 * Envía un mensaje al servicio de chat
 */
export async function sendMessage({ model, messages }: SendMessageParams): Promise<string | undefined> {
  
  try {
    const response = await fetch(GROQ_URL_COMPLETION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: model,
        messages: messages
      })
    });  
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.status}`);
    }
    const data = await response.json() as ChatResponse;
    return mapChatResponse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function mapChatResponse(response: ChatResponse): string | undefined {
  if (!response.choices || response.choices.length === 0) {
    throw new Error('No response choices available');
  }
  return response.choices[0].message.content;
}
