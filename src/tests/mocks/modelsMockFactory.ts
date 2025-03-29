import { vi } from "vitest";
import { ModelResponse } from "@/types/modelResponse";
import { ModelOption } from "@/types/modelOptions";

/**
 * Genera un array de modelos mock para pruebas de la API
 */
export function getModelResponseMock(): ModelResponse[] {
  return [
    {
      id: "gpt-3.5-turbo",
      object: "model",
      created: 1677610602,
      owned_by: "openai",
      active: true,
      context_window: 16384,
      public_apps: null
    },
    {
      id: "gpt-4",
      object: "model",
      created: 1687882411,
      owned_by: "openai",
      active: true,
      context_window: 32768,
      public_apps: null
    },
    {
      id: "claude-2",
      object: "model",
      created: 1687882412,
      owned_by: "anthropic",
      active: true,
      context_window: 100000,
      public_apps: null
    },
    {
      id: "llama-2-70b",
      object: "model",
      created: 1687882413,
      owned_by: "meta",
      active: true,
      context_window: 4096,
      public_apps: null
    }
  ];
}

/**
 * Genera un array de modelos mock para pruebas de la UI
 * Los modelos están agrupados por compañía y ordenados alfabéticamente
 */
export function getModelOptionsMock(): ModelOption[] {
  return [
    {
      label: "Anthropic",
      options: [
        { 
          id: "claude-2", 
          owned_by: "anthropic",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 100000,
          public_apps: null
        },
        { 
          id: "claude-instant-1", 
          owned_by: "anthropic",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 100000,
          public_apps: null
        }
      ]
    },
    {
      label: "Meta",
      options: [
        { 
          id: "llama-2-13b", 
          owned_by: "meta",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 4096,
          public_apps: null
        },
        { 
          id: "llama-2-70b", 
          owned_by: "meta",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 4096,
          public_apps: null
        }
      ]
    },
    {
      label: "OpenAI",
      options: [
        { 
          id: "gpt-3.5-turbo", 
          owned_by: "openai",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 4096,
          public_apps: null
        },
        { 
          id: "gpt-4", 
          owned_by: "openai",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 32768,
          public_apps: null
        },
        { 
          id: "gpt-4-turbo", 
          owned_by: "openai",
          object: "model",
          created: 1687882413,
          active: true,
          context_window: 32768,
          public_apps: null
        }
      ]
    }
  ];
}

/**
 * Devuelve un mock para el hook useDropdown
 * @param options Opciones de configuración
 */
export function getUseDropdownMock(options = { withModels: true }) {
  return {
    useDropdown: () => ({
      listModels: options.withModels ? getModelOptionsMock() : [],
      fetchModels: vi.fn().mockResolvedValue(
        options.withModels ? getModelResponseMock() : []
      ),
      isLoading: false,
      error: null,
    }),
  };
}

/**
 * Devuelve un mock para el store de modelos
 * @param options Opciones de configuración
 */
export function getModelStoreMock(options = { 
  selectedModel: "gpt-3.5-turbo",
  withModels: true 
}) {
  return {
    useListModelStore: () => ({
      selectedModel: options.selectedModel,
      setSelectedModel: vi.fn(),
      listModels: options.withModels ? getModelOptionsMock() : [],
      setListModels: vi.fn()
    }),
  };
}

/**
 * Devuelve un mock para el servicio getListModels
 * @param options Opciones de configuración
 */
export function getListModelsMock(options = { success: true }) {
  if (options.success) {
    return vi.fn().mockResolvedValue(getModelResponseMock());
  }
  return vi.fn().mockRejectedValue(new Error("API Error"));
}
