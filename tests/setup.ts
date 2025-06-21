import { vi } from 'vitest';

// Mock indexedDB
global.indexedDB = {
  open: vi.fn().mockReturnValue({
    onupgradeneeded: null,
    onsuccess: null,
    onerror: null,
    result: {
      createObjectStore: vi.fn().mockReturnValue({
        createIndex: vi.fn(),
      }),
      transaction: vi.fn().mockReturnValue({
        objectStore: vi.fn().mockReturnValue({
          add: vi.fn(),
          getAll: vi.fn().mockReturnValue({
            onsuccess: (event) => {
              if (event && event.target) {
                (event.target as any).result = [];
              }
            },
            onerror: null,
          }),
          clear: vi.fn().mockReturnValue({
            onsuccess: null,
            onerror: null,
          }),
        }),
        oncomplete: null,
        onerror: null,
      }),
      close: vi.fn(),
    }
  }),
  deleteDatabase: vi.fn(),
  cmp: vi.fn(),
} as any;
