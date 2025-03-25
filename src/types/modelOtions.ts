import { ModelResponse } from "./modelResponse";

export interface ModelOption {
  label: string;  // Nombre de la compañía
  options: ModelResponse[];  // Lista de modelos de esa compañía
}

// Mapa de nombres de compañías para mostrar nombres más amigables
export const COMPANY_NAMES: { [key: string]: string } = {
  'groq': 'GROQ',
  'anthropic': 'Anthropic',
  'openai': 'OpenAI',
  'meta': 'Meta',
  'mistral': 'Mistral AI',
  'google': 'Google'
};