import { Observable, of } from 'rxjs';
import { LiquidPrepParams } from '@common/params/liquid-prep-params';
import { IftttMessenger } from '@common/ifttt-messenger';
import { util } from '@common/utility';
import { Soil, Weather } from './triggers';
import { CouchDB } from '@common/db/couch-db';

let couchDB = new CouchDB('liquid-prep');

export default function main(params: LiquidPrepParams) {
  let result: any;
  return new Promise((resolve, reject) => {
    action.exec(params)
    .subscribe((data) => {
      result = data;
      console.log('$data', result);
    }, (err) => {
      console.log(err);
      const response = new IftttMessenger(params);
      resolve(response.error('something went wrong...', 400));
    }, () => {
      const response = new IftttMessenger(params);
      resolve(response.send(result));
    });
  });
}

(<any>global).main = main;  // required when using webpack

let action = {
  exec: (params: LiquidPrepParams) => {
    const baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/49179127a9e2f6a723fc9874cbbff82f0d9dd1504d220c829fa4579b3c355e55/liquid-prep/';
    let path = params['__ow_headers']['x-forwarded-url'].replace(baseUrl, '').replace(/\//g, '_').replace(/\?.+/, '');
    console.log('$$$$$$', params['__ow_path'], path, params.moistureLevel, params.rainTomorrow, !params.rainTomorrow)
    params.days = params.days ? params.days : '1';
    if(!params.date) {
      const date = util.formatMD(util.getDate());
      params.date = `${date.year}${date.month}${date.day}`;
    }
    return (action[path] || action[params.method] || action.default)(params);
  },
  demo_get: (params: LiquidPrepParams) => {
    return of({body: 'test demo get'});
  },
  demo_post: (params: LiquidPrepParams) => {
    return of({body: params.body});
  },
  is_water_needed: (params: LiquidPrepParams) => {
    if(params.rainTomorrow === undefined) {
      return Observable.create((observer) => {
        let weather = new Weather(params.apiKey, params.geoCode, params.language, params.units);
        weather.willItRainTomorrow()
        .subscribe((data) => {
          let soil = new Soil(params.moistureLevel, data.rain);
          observer.next({body: soil.isWaterNeeded()});
          observer.complete();
        }, (err) => {
          console.log(err);
          observer.error(err)
        });  
      });
    } else {
      let soil = new Soil(params.moistureLevel, params.rainTomorrow === 'true');
      return of({body: soil.isWaterNeeded()});
    }
  },
  get_crop_list: (params: LiquidPrepParams) => {
    if(params.body) {
      console.log(params.body);
      return couchDB.dbFind(params.body);
    } else {
      let query = JSON.parse(params.query);
      // console.log('query', query)
      return couchDB.dbFind(query);
    }
  },
  error: (msg) => {
    return Observable.create((observer) => {
      observer.next(msg);
      observer.complete();
    });
  },
  default: (params: LiquidPrepParams) => {
    return Observable.create((observer) => {
      observer.next(`Method ${params.method} not found.`);
      observer.complete();
    });
  }
}