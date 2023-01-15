import config from '../../config';
import { DataSource, DataSourceOptions } from 'typeorm';

const DB_CONFIG: DataSourceOptions = {
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      "rejectUnauthorized": false
    }
  },
  entities: [
    __dirname + '/../entity/*{.ts,.js}',
  ],
  migrations: [
    __dirname + './migrations/*{.js,.ts}'
  ]
};

export const DB = new DataSource(DB_CONFIG);
