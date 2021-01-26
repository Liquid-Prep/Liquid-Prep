import { Params } from './params';

export interface DBParams extends Params {
  databaseName: string;
  collection: string;
  username: string;
  user: string;
  password: string;
  query: any;
  cert: string;
  uri: string;
  options: any;
  cloudantUrl: string;
}