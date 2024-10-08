import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

dotenv.config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  entities: ['src/**/*.entity{.js,.ts}'],
  migrations: ['src/migrations/*.ts'],
  seeds: ['src/seeds/*{.ts,.js}'],
};

const dataSource = new DataSource(options);

export default dataSource;
