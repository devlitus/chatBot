import { vi } from "vitest";

/**
 * Devuelve un mock para el hook useMessage
 */
export function getUseMessageMock() {
  return {
    useMessage: () => ({
      fetchMessage: vi.fn(),
      isLoading: false,
    }),
  };
}
