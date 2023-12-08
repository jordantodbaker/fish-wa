declare namespace NodeJS {
  interface ProcessEnv {
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    AUTH0_SECRET: string;
    AUTH0_BASE_UR: string;
    AUTH0_ISSUER_BASE_URL: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
  }
}
