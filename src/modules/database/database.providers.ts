import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATA_SOURCE } from './database.constants';
import { ConfigService } from '@nestjs/config';
import dataSourceOptions from './typeorm/typeorm.datasource.config';

export const databaseProvider: Provider = {
  provide: DATA_SOURCE,
  inject: [ConfigService],
  useFactory: async (): Promise<DataSource> => {
    const dataSource = new DataSource(dataSourceOptions);
    return dataSource.initialize(); // 1
  },
};
