import dotenv from 'dotenv';

dotenv.config();

const getDbName = () => {
  if (process.env.ENV === 'production') {
    return process.env.DB_NAME_PROD || '';
  }
  if (process.env.ENV === 'development') {
    return process.env.DB_NAME_DEV || '';
  }
  return process.env.DB_NAME_DEV || '';
};

export default {
  port: process.env.PORT || 3000,
  db: {
    dbUrl: process.env.DB_URL || '',
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    name: getDbName() || '',
    username: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  secret: process.env.SECRET_KEY || ''
};
