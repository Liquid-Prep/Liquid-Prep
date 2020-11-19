import { Observable } from 'rxjs';
import  * as https from 'https';
import * as uuid from 'node-uuid';
import { Params } from './params';
import { CouchDB } from './db';

const util = {
  path: 'https://api.weather.com',
  httpGet: (url) => {
    return Observable.create((observer) => {
      https.get(url, (resp) => {
        let data = '';
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          observer.next(JSON.parse(data));
          observer.complete();
        });     
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        observer.error(err);
      });
    });  
  },
  getDate: (date = null) => {
    let theDate = !date ? new Date() : new Date(date) || new Date();
    let locale = theDate.toLocaleString('en-US', {timeZone: 'America/New_York'});
    return new Date(locale);
  },
  formatMD: (date, UTC='') => {
    let dayOfMonth = UTC === 'UTC' ? date.getUTCDate() : date.getDate();
    let monthOfYear = UTC === 'UTC' ? date.getUTCMonth() + 1 : date.getMonth() + 1;
    dayOfMonth = dayOfMonth > 9 ? dayOfMonth : `0${dayOfMonth}`;
    monthOfYear = monthOfYear > 9 ? monthOfYear : `0${monthOfYear}`;
    return {day: dayOfMonth, month: monthOfYear, year: date.getFullYear()};
  },
  defaultLocation: (params: any) => {
    params.lat = params.triggerFields && params.triggerFields.location ? params.triggerFields.location.lat.toFixed(2) : 33.96;
    params.lng = params.triggerFields && params.triggerFields.location ? params.triggerFields.location.lng.toFixed(2) : -84.41;    
  },
  uuid: () => {
    return uuid.v4();
  },
  timeOffset: (tf) => {
    let date = new Date();
    let locale = new Date(date.toLocaleString('en-US', {timeZone: tf.tz}));
    let offset = date.getHours() - locale.getHours();
    tf.time = (parseInt(tf.hour)+offset)*60 + parseInt(tf.minutes);
    console.log(`tf.time$$:  ${tf.time}, ${offset}, ${date.getHours()}, ${locale.getHours()}`)
    return tf;
  },
  updateDB: (couchDB, params) => {
    return Observable.create((observer) => {
      let _id = `wu:${params.trigger_identity}`;
      couchDB.db.get(_id, (err, doc) => {
        if(!err || err.statusCode === 404) {
          if(doc) {
            doc.active = false;
          }
          couchDB.db.insert(doc, function (err, result) {
            if (err) {
              console.log(err);
              observer.error('db insert failed...', err)
            } else {
              observer.next([]);
              observer.complete();
            }
          });
        } else {
          console.log('db get', err);
          observer.error('db get failed...', err)
        }
      })
    });    
  },
  dbUpdate: (couchDB: any, body: any) => {
    return Observable.create((observer) => {
      couchDB.db.get(body._id, (err, doc) => {
        if(!err || err.statusCode === 404) {
          if(doc) {
            console.log('doc', doc);
            body = Object.assign(doc, body);
          }
          couchDB.db.insert(body, function (err, result) {
            if (err) {
              console.log(err);
              observer.error('db insert failed...', err)
            } else {
              observer.next([]);
              observer.complete();
            }
          });
        } else {
          console.log('db get', err);
          observer.error('db get failed...', err)
        }
      })
    });    
  },
  dbFind: (couchDB: any, query: any) => {
    return Observable.create((observer) => {
      couchDB.db.find(query, (err, doc:any) => {
        if(doc) {
          console.log('$doc', doc);
          observer.next(doc);
          observer.complete();
        } else {
          console.log('db get', err);
          observer.error('db get failed...', err)
        }
      })
    });  
  },
  dbRemove: (couchDB: any, id: string) => {
    return Observable.create((observer) => {
      let query = {
        "selector": {
          "_id": id
        },
        "fields": ["_id", "_rev"],
        "skip": 0,
        "execution_stats": true
      };  
      util.dbFind(couchDB, query).subscribe((data) => {
        let docs = data.docs;
        if(docs) {
          couchDB.db.destroy(id, docs[0]._rev, (err, doc:any) => {
            if(doc) {
              console.log('removed doc', doc._id);
              observer.next(`${doc._id} removed`);
              observer.complete();
            } else {
              console.log('db remove', err);
              observer.error('Remove failed...', err)
            }
          })
        }
      })
    });  

  }
}

export { util };