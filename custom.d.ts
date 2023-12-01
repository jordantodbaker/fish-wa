declare namespace NodeJS {
  interface ProcessEnv {
    MYSQL_HOST: string;
    MYSQL_USER: string;
    MYSQL_DATABASE: string;
    MYSQL_PASSWORD: string;
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
  }
}
