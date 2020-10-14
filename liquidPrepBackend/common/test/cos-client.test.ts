import {} from 'jasmine';
import 'jasmine-ajax';
import { CosClient } from '../src/cos-client';
import { Params } from '..//src/params';
import { Messenger } from '../src/messenger';

describe('test suite', () => {
  beforeEach(() => {
    jasmine.Ajax.install();
    let params = <Params>{};
    let cosClient = new CosClient(params);

    cosClient.download(params)
  })

  afterEach(() => {
    jasmine.Ajax.uninstall();
  })

});