/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  env: {
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB: process.env.DB,
    DB_PASSWORD: process.env.DB_PASSWORD,
    IS_DEV: process.env.IS_DEV,
  },
};
