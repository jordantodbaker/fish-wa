/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  env: {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    PS_DB_HOST: process.env.PS_DB_HOST,
    PS_DB_USER: process.env.PS_DB_USER,
    PS_DB_DATABASE: process.env.PS_DB_DATABASE,
    PS_DB_PASSWORD: process.env.PS_DB_PASSWORD,
    IS_DEV: process.env.IS_DEV,
  },
};
