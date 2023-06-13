//NodeJS.ProcessEnv
declare namespace NodeJS{
  interface ProcessEnv{
    DB_HOST:string;
    DB_PORT:number;
    DB_USER:string
    DB_PASSWORD:string;
    DB_DATABASE:string
  }
}