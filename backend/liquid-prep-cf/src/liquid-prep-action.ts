import { Observable, of } from 'rxjs';
import { LiquidPrepParams } from '@common/params/liquid-prep-params';
import { IftttMessenger } from '@common/ifttt-messenger';
import { util } from '@common/utility';
import { Soil, Weather } from './triggers';
import { CouchDB } from '@common/db/couch-db';

let couchDB;

// Standard entry point for cloud functions
export default function main(params: LiquidPrepParams) {
  let result: any;

  console.log("cloudantDBUrl: ", params.cloudantUrl);
  console.log("databaseName: ", params.databaseName);
  console.log("iamApiKey: ", params.iamApiKey);
  console.log("cloudFunctionUrl: ", params.cloudFunctionsURL);
  console.log("weatherApiKey: ", params.weatherApiKey);

  couchDB = new CouchDB(params.databaseName, params.cloudantUrl, params.iamApiKey);
  
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

(<any>global).main = main;  // required when using webpack to bundle the project

let action = {
  exec: (params: LiquidPrepParams) => {
    const baseUrl = params.cloudFunctionsURL+"/";
    console.log("base URL: ",baseUrl);
    let path = params['__ow_headers']['x-forwarded-url'].replace(baseUrl, '').replace(/\//g, '_').replace(/\?.+/, '');
    console.log('$$$$$$', params['__ow_path'], path, params.moistureLevel, params.rainTomorrow, !params.rainTomorrow, params.weatherApiKey)
    params.days = params.days ? params.days : '1';
    if(!params.date) {
      const date = util.formatMD(util.getDate());
      params.date = `${date.year}${date.month}${date.day}`;
    }
    return (action[path] || action[params.method] || action.default)(params);
  },
  get_weather_info: (params: LiquidPrepParams) => {
      return Observable.create((observer) => {
        // units will either be "m" for Celcius or "e" for Farenheit
        let weather = new Weather(params.weatherApiKey, params.geoCode, params.language, params.units);
        weather.getForecast()
        .subscribe((data) => {
          console.log("MAIN: getForecast retruned response...")
          console.log("MAIN: weather info: ",data)
          observer.next({body: data});
          observer.complete();
        }, (err) => {
          console.log(err);
          observer.error(err)
        });  
      });
  },
  get_crop_list: (params: LiquidPrepParams) => {
    if(params.body) {
      console.log(params.body);
      return couchDB.dbFind(params.body);
    } else {
      let query = {
        "selector": {
           "type": "crop"
        },
        "fields": [
           "cropName"
        ]
     }
      console.log('query', query)
      return couchDB.dbFind(query);
    }
  },
  get_crop_info: (params: LiquidPrepParams) => {
    if(params.body) {
      console.log(params.body);
      return couchDB.dbFind(params.body);
    } else {
      let cropName:string = params.name;
      console.log('cropName', cropName);
      let query = {"selector": {"_id": cropName}};
      console.log('query', query)
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