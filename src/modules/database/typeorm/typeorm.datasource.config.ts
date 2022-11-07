import { env } from '../../../env';
import { entities } from '../database.entities';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DotenvParseOutput } from 'dotenv';
import * as fs from 'fs';
import { parse } from 'dotenv';
import { DataSourceOptions } from 'typeorm';

const envPath = `.env${process.env.NODE_ENV === 'test' ? '.test' : ''}`;
const parsed: DotenvParseOutput = parse(fs.readFileSync(envPath));
const baseDir: string = __dirname.split(env.rootDir)[1].split('/')[1];
const migrationBaseDir: string = baseDir === 'src' ? 'src' : 'dist/src';
const ext: string = baseDir === 'src' ? 'ts' : 'js';

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: parsed[env.database.host],
  port: Number(parsed[env.database.port]),
  username: parsed[env.database.user],
  password: parsed[env.database.password],
  database: parsed[env.database.name],
  synchronize: parsed[env.database.sync]?.toUpperCase() === 'TRUE',
  dropSchema: false,
  logging: parsed[env.environment] !== 'production',
  entities: entities,
  migrations: [migrationBaseDir + '/migrations/*.' + ext],
  namingStrategy: new SnakeNamingStrategy(),
};
export default dataSourceOptions;
