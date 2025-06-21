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

// --- Funciones de autenticación simuladas ---
// En una aplicación real, esto interactuaría con una base de datos de usuarios segura.

interface User {
  id: string;
  email: string;
  passwordHash: string;
}

// Simulación de base de datos de usuarios en memoria
const users: User[] = [];

export async function getUserByEmail(email: string): Promise<User | undefined> {
  // Simula una búsqueda asíncrona en la base de datos
  return new Promise(resolve => {
    setTimeout(() => {
      const user = users.find(u => u.email === email);
      resolve(user);
    }, 100); // Simula latencia de red/DB
  });
}

export async function createUser(email: string, passwordHash: string): Promise<User> {
  // Simula la creación de un usuario en la base de datos
  return new Promise(resolve => {
    setTimeout(() => {
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`, // ID único simple
        email,
        passwordHash,
      };
      users.push(newUser);
      resolve(newUser);
    }, 100);
  });
}

// Simulación de hash de contraseña (NO USAR EN PRODUCCIÓN)
// En producción, usa bibliotecas como bcrypt o argon2
export async function hashPassword(password: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      // Esto es solo una simulación muy básica. NO ES SEGURO.
      resolve(`hashed_${password}`);
    }, 50);
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      // Esto es solo una simulación muy básica. NO ES SEGURO.
      resolve(`hashed_${password}` === hash);
    }, 50);
  });
}