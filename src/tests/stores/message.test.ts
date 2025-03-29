import { describe, it, expect, beforeEach } from 'vitest';
import { useMessageStore } from '../../../src/stores/message';

describe('useMessageStore', () => {
  beforeEach(() => {
    useMessageStore.setState({ isLoading: false });
  });

  it('should initialize with isLoading as false', () => {
    const state = useMessageStore.getState();
    expect(state.isLoading).toBe(false);
  });

  it('should update isLoading state when setIsLoading is called', () => {
    const { setIsLoading } = useMessageStore.getState();
    
    setIsLoading(true);
    expect(useMessageStore.getState().isLoading).toBe(true);
    
    setIsLoading(false);
    expect(useMessageStore.getState().isLoading).toBe(false);
  });
});