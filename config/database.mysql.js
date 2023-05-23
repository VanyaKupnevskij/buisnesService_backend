import { createPool } from 'mysql2/promise';
import config from 'config';

export const pool = createPool({
  host: config.get('HOST_MYSQL'),
  user: config.get('USER_MYSQL'),
  password: config.get('PASSWORD_MYSQL'),
  port: Number(config.get('PORT_MYSQL')),
  database: config.get('DATABASE_MYSQL'),
  multipleStatements: true,
});
