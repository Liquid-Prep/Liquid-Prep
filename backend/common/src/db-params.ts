import { Params } from './params';

export interface DBParams extends Params {
  database: string;
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