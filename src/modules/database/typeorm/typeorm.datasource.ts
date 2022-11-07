import { DataSource } from 'typeorm';
import dataSourceOptions from './typeorm.datasource.config';

/**
 * cli 용도로만 사용하는 instance
 */
export default new DataSource(dataSourceOptions);
