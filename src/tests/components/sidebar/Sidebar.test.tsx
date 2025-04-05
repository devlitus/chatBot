import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterAll } from 'vitest';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useChatStore } from '@/stores/chat';
import { getFirstFiveWords } from '@/components/chat/utils/textUtils';

// Mock de las dependencias
vi.mock('@/stores/chat', () => ({
  useChatStore: vi.fn(),
}));

vi.mock('../../../components/chat/utils/textUtils', () => ({
  getFirstFiveWords: vi.fn(),
}));

// Mock de window.confirm
const originalConfirm = window.confirm;
window.confirm = vi.fn();

// Tipo para el mock de useChatStore
type MockChatStore = {
  chats: Array<{
    id: string;
    title: string;
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
    }>;
  }>;
  currentChatId: string | null;
  addChat: () => void;
  setCurrentChat: (chatId: string) => void;
  loadChats: () => void;
  deleteChat: (chatId: string) => void;
};

describe('Sidebar Component', () => {
  // Datos de prueba
  const mockChats = [
    {
      id: 'chat1',
      title: 'Chat 1',
      messages: [
        { role: 'user' as const, content: 'Este es un mensaje de prueba' },
      ],
    },
    {
      id: 'chat2',
      title: 'Chat 2',
      messages: [],
    },
  ];

  // Configuración inicial antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock de getFirstFiveWords
    (getFirstFiveWords as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (text: string) => text.split(' ').slice(0, 5).join(' ')
    );
    
    // Mock del store
    const mockStore: MockChatStore = {
      chats: mockChats,
      currentChatId: 'chat1',
      addChat: vi.fn(),
      setCurrentChat: vi.fn(),
      loadChats: vi.fn(),
      deleteChat: vi.fn(),
    };
    
    (useChatStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
    
    // Mock de window.confirm para que devuelva true por defecto
    (window.confirm as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
  });

  // Restaurar mocks después de todos los tests
  afterAll(() => {
    window.confirm = originalConfirm;
  });

  test('should render the component correctly', () => {
    render(<Sidebar />);
    
    // Verificar que el botón de nuevo chat se renderiza
    expect(screen.getByText('Nuevo Chat')).toBeInTheDocument();
    
    // Verificar que los chats se renderizan correctamente
    expect(screen.getByText('Este es un mensaje de')).toBeInTheDocument();
    expect(screen.getByText('Chat sin título')).toBeInTheDocument();
  });

  test('should call loadChats on mount', () => {
    render(<Sidebar />);
    const { loadChats } = useChatStore();
    
    expect(loadChats).toHaveBeenCalledTimes(1);
  });

  test('should add a new chat when clicking the New Chat button', () => {
    render(<Sidebar />);
    const { addChat } = useChatStore();
    
    // Hacer clic en el botón de nuevo chat
    fireEvent.click(screen.getByText('Nuevo Chat'));
    
    // Verificar que se llamó a la función addChat
    expect(addChat).toHaveBeenCalledTimes(1);
  });

  test('should set current chat when clicking on a chat', () => {
    render(<Sidebar />);
    const { setCurrentChat } = useChatStore();
    
    // Hacer clic en un chat
    fireEvent.click(screen.getByText('Este es un mensaje de'));
    
    // Verificar que se llamó a setCurrentChat con el ID correcto
    expect(setCurrentChat).toHaveBeenCalledWith('chat1');
  });

  test('should delete a chat when clicking the delete button and confirming', () => {
    render(<Sidebar />);
    const { deleteChat } = useChatStore();
    
    // Encontrar todos los botones de eliminar
    const deleteButtons = screen.getAllByTitle('Eliminar chat');
    
    // Hacer clic en el primer botón de eliminar
    fireEvent.click(deleteButtons[0]);
    
    // Verificar que se mostró el diálogo de confirmación
    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar esta conversación?');
    
    // Verificar que se llamó a deleteChat con el ID correcto
    expect(deleteChat).toHaveBeenCalledWith('chat1');
  });

  test('should not delete a chat when canceling the confirmation dialog', () => {
    // Cambiar el mock de window.confirm para que devuelva false
    (window.confirm as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
    
    render(<Sidebar />);
    const { deleteChat } = useChatStore();
    
    // Encontrar todos los botones de eliminar
    const deleteButtons = screen.getAllByTitle('Eliminar chat');
    
    // Hacer clic en el primer botón de eliminar
    fireEvent.click(deleteButtons[0]);
    
    // Verificar que se mostró el diálogo de confirmación
    expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar esta conversación?');
    
    // Verificar que NO se llamó a deleteChat
    expect(deleteChat).not.toHaveBeenCalled();
  });

  test('should update chat titles when chats change', () => {
    const { rerender } = render(<Sidebar />);
    
    // Actualizar los chats con un nuevo mensaje
    const updatedMockChats = [
      {
        ...mockChats[0],
        messages: [
          { role: 'user' as const, content: 'Este es un nuevo mensaje de prueba' },
        ],
      },
      mockChats[1],
    ];
    
    // Actualizar el mock del store con los nuevos chats
    (useChatStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useChatStore(),
      chats: updatedMockChats,
    });
    
    // Re-renderizar el componente
    rerender(<Sidebar />);
    
    // Verificar que el título del chat se actualizó
    expect(screen.getByText('Este es un nuevo mensaje')).toBeInTheDocument();
  });
});
