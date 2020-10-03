import { Observable } from 'rxjs';
import * as Cloudant from '@cloudant/cloudant';

class CouchDBClass {
  cloudant: any;
  db: any;
  constructor(dbName) {
    let params = {
      url: 'https://d44a1815-07de-4807-bd7a-baf4b9adc1c4-bluemix:2808e309234a627482f093ca8880266394522d2b89c456ec3706cfd40aec3111@d44a1815-07de-4807-bd7a-baf4b9adc1c4-bluemix.cloudantnosqldb.appdomain.cloud'
      // account: 'd44a1815-07de-4807-bd7a-baf4b9adc1c4-bluemix.cloudantnosqldb.appdomain.cloud',
      // plugins: {
      //   iamauth: {
      //     iamApiKey: '6hEXRD9zpfFONrpCBZTvm5HRgidTMByag2vAOm0bwxb8'
      //   }
      // } 
    };
    this.cloudant = Cloudant(params);
    this.db = this.cloudant.db.use(dbName);
  }

  dbFind(query) {
    return Observable.create((observer) => {
      this.db.find(query, (err, data) => {
        if (err) {
          console.log('$$$cloudant:err', err);
          observer.error(err);
        }
        else {
          observer.next(data);
          observer.complete();
        }
      });
    });
  }

  index(field) {
    let first_name = {name:'time', type:'json', index:{fields:['time']}}
    return new Promise((resolve, reject) => {
      this.db.index(field, (err, response) => {
        if (err) {
          reject(err);
        }
        console.log('Index creation result: %s', response.result);
        resolve(response);
      });
    });  
  }
}

export const CouchDB = CouchDBClass;