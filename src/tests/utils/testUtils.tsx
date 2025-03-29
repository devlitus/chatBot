import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

/**
 * Opciones para renderizar componentes en pruebas
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
  initialState?: Record<string, any>;
}

/**
 * Renderiza un componente con todas las configuraciones necesarias para pruebas
 * @param ui Componente a renderizar
 * @param options Opciones de renderizado
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { route, initialState, ...renderOptions } = options;

  // Configurar la ubicación si se proporciona una ruta
  if (route) {
    window.history.pushState({}, 'Test page', route);
  }

  // Renderizar el componente con las opciones proporcionadas
  return {
    user: userEvent.setup(),
    ...render(ui, renderOptions),
  };
}

/**
 * Crea un mock para eventos de usuario
 * @param eventName Nombre del evento
 */
export function createMockEvent(eventName: string) {
  return {
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    target: {
      name: eventName,
      value: `test-${eventName}`,
    },
  };
}

/**
 * Espera a que se complete la siguiente actualización del DOM
 */
export const waitForNextUpdate = () => new Promise(resolve => setTimeout(resolve, 0));

/**
 * Crea un mock para ResizeObserver
 */
export function mockResizeObserver() {
  const resizeObserverMock = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  
  global.ResizeObserver = resizeObserverMock;
  return resizeObserverMock;
}

/**
 * Crea un mock para IntersectionObserver
 */
export function mockIntersectionObserver() {
  const intersectionObserverMock = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  }));
  
  global.IntersectionObserver = intersectionObserverMock;
  return intersectionObserverMock;
}

/**
 * Crea un mock para window.fetch
 * @param response Respuesta a devolver
 */
export function mockFetch(response: any) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => response,
    text: async () => JSON.stringify(response),
  });
  
  global.fetch = fetchMock;
  return fetchMock;
}
