/// <reference types="vite/client" />
//tipar las variables de entorno
interface ImportMetaEnv {
  readonly VITE_GROQ_API_KEY: string;
  
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;

  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_AUTH_TOKEN: string;
  readonly VITE_SENTRY_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
  

  