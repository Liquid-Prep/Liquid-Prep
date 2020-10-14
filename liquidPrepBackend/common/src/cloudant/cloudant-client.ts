import * as request from 'request';
import * as Cloudant from '@cloudant/cloudant';
import { CloudantParams } from './cloudant-params';

export class CloudantClient {
  cloudant: any;
  database: any;

  constructor (private params: CloudantParams) {
    this.init(params);
  }

  init(params: CloudantParams) {
    let config = {
      account: params.username,
      password: params.password
    }
    this.cloudant = Cloudant(config);
    this.database = this.cloudant.db.use(params.database);
  }

  write(params: CloudantParams) {
    return this.database.insert(params.body);
  }
}