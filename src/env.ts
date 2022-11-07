export const env = {
  environment: process.env.NODE_ENV,
  rootDir: process.cwd(),
  debug: 'DEBUG',
  database: {
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    user: 'DATABASE_USER',
    password: 'DATABASE_PASSWORD',
    name: 'DATABASE_NAME',
    sync: 'DATABASE_SYNCHRONIZE',
  },
};
