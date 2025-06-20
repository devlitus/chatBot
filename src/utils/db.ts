const DB_NAME = 'chatDB';
const STORE_NAME = 'messages';
const DB_VERSION = 1;

export interface ChatMessage {
  id?: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

let db: IDBDatabase;

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      return resolve(db);
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error: ", event);
      reject("Database error");
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };
  });
}

export async function addMessageToDB(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const messageWithTimestamp = { ...message, timestamp: Date.now() };
  const request = store.add(messageWithTimestamp);

  return new Promise<void>((resolve, reject) => {
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = (event) => {
      console.error('Error adding message to DB', event);
      reject();
    };
  });
}

export async function getMessagesFromDB(): Promise<ChatMessage[]> {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = (event) => {
      console.error('Error getting messages from DB', event);
      reject([]);
    };
  });
} 