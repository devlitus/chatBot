import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { useListModelStore } from '@/stores/listModel/listModel';
import { useDropdown } from '@/hooks/dropdown/useDropdown';
import { mockModels } from '@/mocks/modelMocks';
import { mockUser } from '@/mocks/userMocks';
import { useSupabaseAuth } from '@/hooks/auth/useSupabaseAuth';
import { User } from '@supabase/supabase-js';

// Configurar mocks
vi.mock('@/hooks/dropdown/useDropdown');
vi.mock('@/stores/listModel/listModel');
vi.mock('@/hooks/auth/useSupabaseAuth');

describe('Dropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock useDropdown con los modelos de prueba
    vi.mocked(useDropdown).mockReturnValue({
      organizedModels: mockModels
    });

    // Mock useListModelStore con valores iniciales
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: 'Modelos LLM',
      isLoading: false,
      setSelectedModel: vi.fn(),
    });

    // Mock useSupabaseAuth con usuario de prueba
    vi.mocked(useSupabaseAuth).mockReturnValue({
      user: mockUser as User,
      session: null,
      loading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
    });
  });

  test('renderiza el dropdown correctamente', () => {
    render(<Dropdown />);
    expect(screen.getByText('Seleccionar modelo LLM')).toBeInTheDocument();
  });

  test('muestra el spinner de carga mientras carga los modelos', () => {
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: '',
      isLoading: true,
      setSelectedModel: vi.fn(),
    });

    render(<Dropdown />);
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
    expect(screen.getByText('Cargando modelos...')).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay modelos disponibles', () => {
    vi.mocked(useDropdown).mockReturnValue({
      organizedModels: []
    });

    render(<Dropdown />);
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
    expect(screen.getByText('No se encontraron modelos disponibles')).toBeInTheDocument();
  });

  test('muestra la lista de modelos cuando está abierto', () => {
    render(<Dropdown />);
    
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
    
    const companyLabel = screen.getByText(mockModels[0].label);
    const modelOption = screen.getByText(mockModels[0].options[0].id);

    expect(companyLabel).toBeInTheDocument();
    expect(modelOption).toBeInTheDocument();
  });

  test('selecciona un modelo correctamente', () => {
    const setSelectedModel = vi.fn();
    vi.mocked(useListModelStore).mockReturnValue({
      selectedModel: '',
      isLoading: false,
      setSelectedModel,
    });

    render(<Dropdown />);
    
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
    fireEvent.click(screen.getByText(mockModels[0].options[0].id));

    expect(setSelectedModel).toHaveBeenCalledWith(mockModels[0].options[0].id);
  });

  test('formatea correctamente el tamaño del contexto', () => {
    const modelWithContext = {
      label: 'Test Company',
      options: [{
        id: 'test-model',
        ownedBy: 'test',
        contextWindow: 1500000
      }]
    };

    vi.mocked(useDropdown).mockReturnValue({
      organizedModels: [modelWithContext]
    });

    render(<Dropdown />);
    
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
    const contextSize = screen.getByTitle('Tamaño de contexto');
    expect(contextSize.textContent).toBe('1.5M');
  });

  test('cierra el dropdown al seleccionar un modelo', async () => {
    render(<Dropdown />);
    
    fireEvent.click(screen.getByText('Seleccionar modelo LLM'));
    
    const modelOption = screen.getByText(mockModels[0].options[0].id);
    fireEvent.click(modelOption);

    await waitFor(() => {
      expect(screen.queryByText(mockModels[0].label)).not.toBeInTheDocument();
    });
  });
});
