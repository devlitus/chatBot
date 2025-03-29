import { describe, it, expect } from 'vitest';
import { getFirstFiveWords } from '../../../../components/chat/utils/textUtils';

describe('textUtils', () => {
  describe('getFirstFiveWords', () => {
    it('should return first five words with ellipsis when text has more than 5 words', () => {
      const text = 'This is a test with more than five words';
      expect(getFirstFiveWords(text)).toBe('This is a test with...');
    });

    it('should return all words when text has exactly 5 words', () => {
      const text = 'This has exactly five words';
      expect(getFirstFiveWords(text)).toBe('This has exactly five words');
    });

    it('should return all words when text has less than 5 words', () => {
      const text = 'Three words only';
      expect(getFirstFiveWords(text)).toBe('Three words only');
    });

    it('should handle empty string', () => {
      expect(getFirstFiveWords('')).toBe('');
    });
  });
});