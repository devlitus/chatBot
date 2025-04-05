import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { useListModelStore } from '@/stores/listModel/listModel';
import { useDropdown } from '@/hooks/dropdown/useDropdown';
import { mockModels } from '@/tests/mocks/modelMocks';

// Mock de los hooks
vi.mock('@/hooks/dropdown/useDropdown');
vi.mock('@/stores/listModel/listModel');

describe('Dropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock del hook useDropdown
    vi.mocked(useDropdown).mockReturnValue({
      listModels: mockModels,
      fetchModels: vi.fn(),
    });

    // Mock del hook useListModelStore
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM',
      setSelectedModel: vi.fn(),
      listModels: [],
      setListModels: vi.fn(),
    });
  });

  test('renderiza el dropdown correctamente', async () => {
    render(<Dropdown />);
    await waitFor(() => {
      const button = screen.getByText('Seleccionar modelo LLM');
      expect(button).toBeInTheDocument();
    });
  });

  test('muestra el spinner de carga mientras carga los modelos', async () => {
    vi.mocked(useDropdown).mockReturnValue({
      listModels: [],
      fetchModels: vi
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 100)),
        ),
    });

    render(<Dropdown />);

    // Abrir el dropdown para ver el spinner
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));

    await waitFor(() => {
      expect(screen.getByText('Cargando modelos...')).toBeInTheDocument();
    });
  });

  test('muestra mensaje cuando no hay modelos disponibles', async () => {
    vi.mocked(useDropdown).mockReturnValue({
      listModels: [],
      fetchModels: vi.fn().mockResolvedValue([]),
    });

    render(<Dropdown />);

    // Esperar a que se complete la carga
    await waitFor(() => {
      fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
      expect(
        screen.getByText('No se encontraron modelos disponibles'),
      ).toBeInTheDocument();
    });
  });

  test('muestra la lista de modelos cuando está abierto', async () => {
    render(<Dropdown />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Seleccionar modelo LLM'));

      // Verificar que se muestran las compañías y los modelos
      const companyLabel = screen.getByText(mockModels[0].label);
      const modelOption = screen.getByText(mockModels[0].options[0].id);

      expect(companyLabel).toBeInTheDocument();
      expect(modelOption).toBeInTheDocument();
    });
  });

  test('selecciona un modelo correctamente', async () => {
    const setSelectedModel = vi.fn();
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM',
      setSelectedModel,
      listModels: [],
      setListModels: vi.fn(),
    });

    render(<Dropdown />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
      fireEvent.click(screen.getByText(mockModels[0].options[0].id));

      expect(setSelectedModel).toHaveBeenCalledWith(
        mockModels[0].options[0].id,
      );
    });
  });

  test('formatea correctamente el tamaño del contexto', async () => {
    const modelWithLargeContext = {
      ...mockModels[0],
      options: [
        {
          ...mockModels[0].options[0],
          context_window: 1500000,
        },
      ],
    };

    vi.mocked(useDropdown).mockReturnValue({
      listModels: [modelWithLargeContext],
      fetchModels: vi.fn(),
    });

    render(<Dropdown />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
      const contextSize = screen.getByTitle('Tamaño de contexto');
      expect(contextSize.textContent).toBe('1.5M');
    });
  });

  test('cierra el dropdown al seleccionar un modelo', async () => {
    render(<Dropdown />);

    await waitFor(async () => {
      // Abrir el dropdown
      fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
      const companyLabel = screen.getByText(mockModels[0].label);
      expect(companyLabel).toBeInTheDocument();

      // Seleccionar un modelo
      fireEvent.click(screen.getByText(mockModels[0].options[0].id));

      // Verificar que el dropdown se cerró
      await waitFor(() => {
        expect(screen.queryByText(mockModels[0].label)).not.toBeInTheDocument();
      });
    });
  });
});
