import { IDBConfig } from '@flashcoffee/fctypes';

export enum TypeOrmConnection {
  SQLITE = 'sqlite',
  MYSQL = 'mysql',
}

export interface Config {
  accessKeyId?: string;
  secretAccessKey?: string;
  postAlertTopicArn: string;
}

export interface ModuleFactory {
  dbConfiguration?: IDBConfig;
  config: Config;
}
