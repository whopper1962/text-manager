declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly APP_PORT: number;
        readonly VUE_APP_ORIGIN: string;
        readonly DB_HOST: string;
        readonly DB_PORT: number;
        readonly DB_DATABASE: string;
        readonly DB_USERNAME: string;
        readonly DB_PASSWORD: string;
      }
    }
  }
}
