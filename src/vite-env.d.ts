/// <reference types="vite/client" />
//tipar las variables de entorno
interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
  

  