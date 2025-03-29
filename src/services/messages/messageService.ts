import { Message, MessageResponse, SendMessageParams } from "@/types/message";
import { sendMessage } from "../post/sendMessage";

export class MessageService {
  private static readonly MAX_CONTEXT_MESSAGES = 10;

  /**
   * Valida los parámetros necesarios para enviar un mensaje
   */
  static validateMessageParams(chatId: string | null, model: string): MessageResponse {
    if (!chatId) {
      return { success: false, error: 'No active chat' };
    }

    if (model === "Modelos LLM") {
      return { success: false, error: 'No model selected' };
    }

    return { success: true };
  }

  /**
   * Obtiene los mensajes recientes para contexto
   */
  static getRecentMessages(messages: Message[]): Message[] {
    return messages.slice(-this.MAX_CONTEXT_MESSAGES);
  }

  /**
   * Prepara los mensajes para enviar a la API
   */
  static prepareMessagesToSend(recentMessages: Message[], currentMessage?: string): Message[] {
    if (!currentMessage) {
      return recentMessages;
    }

    return [
      ...recentMessages,
      { role: 'user', content: currentMessage }
    ];
  }

  /**
   * Envía un mensaje a la API
   */
  static async sendMessageToAPI(params: SendMessageParams): Promise<MessageResponse> {
    try {
      const response = await sendMessage(params);
      
      if (response && typeof response === 'string') {
        return { 
          success: true, 
          data: response.trim() 
        };
      }

      return { 
        success: false, 
        error: 'Invalid response from API' 
      };

    } catch (error) {
      console.error('Error sending message:', error);
      return { 
        success: false, 
        error: 'Error sending message' 
      };
    }
  }
}
