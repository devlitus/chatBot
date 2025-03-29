import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message } from '../../../../components/chat/components/Message';

// Mock MessageContent component since we're testing Message in isolation
vi.mock('../../../../components/chat/components/MessageContent', () => ({
  MessageContent: ({ content }: { content: string }) => <div data-testid="message-content">{content}</div>
}));

describe('Message', () => {
  it('should render user message correctly', () => {
    const content = "Hello, this is a user message";
    render(<Message role="user" content={content} />);
    
    // Check content is rendered directly for user messages
    const messageText = screen.getByText(content);
    expect(messageText).toBeInTheDocument();
    
    // Check styling for user messages
    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveClass('bg-[var(--color-accent)]');
    expect(messageContainer).toHaveClass('text-[var(--color-text-inverse)]');
    
    // Check alignment
    const wrapper = screen.getByTestId('message-wrapper');
    expect(wrapper).toHaveClass('justify-end');
  });

  it('should render assistant message correctly', () => {
    const content = "Hello, this is an assistant message";
    render(<Message role="assistant" content={content} />);
    
    // Check content is rendered through MessageContent for assistant messages
    const messageContent = screen.getByTestId('message-content');
    expect(messageContent).toBeInTheDocument();
    expect(messageContent).toHaveTextContent(content);
    
    // Check styling for assistant messages
    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveClass('bg-[var(--color-bg-secondary)]');
    expect(messageContainer).toHaveClass('text-[var(--color-text-primary)]');
    
    // Check alignment
    const wrapper = screen.getByTestId('message-wrapper');
    expect(wrapper).toHaveClass('justify-start');
  });

  it('should apply common styles to both message types', () => {
    render(<Message role="user" content="Test message" />);
    
    const messageContainer = screen.getByTestId('message-container');
    expect(messageContainer).toHaveClass('max-w-[80%]');
    expect(messageContainer).toHaveClass('px-4');
    expect(messageContainer).toHaveClass('py-2');
    expect(messageContainer).toHaveClass('rounded-lg');
  });
});