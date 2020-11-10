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
  //couchDB = new CouchDB('crop-info', params.cloudantUrl);
  
  //couchDB = new CouchDB('crop-info', "https://446ac891-dd3c-4287-8dc3-6996f9df27b4-bluemix.cloudantnosqldb.appdomain.cloud", "DjMXPTr84L_Ox_gY36AnEFWhkZTS2a9eHFFkLK1JRrKU");
  couchDB = new CouchDB('crop_info', "https://446ac891-dd3c-4287-8dc3-6996f9df27b4-bluemix.cloudantnosqldb.appdomain.cloud", "kZj0arpbSl2qIVl_DZsraZgR8oKK1JO9Gme0IXFvQL3x");
  
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
    //const baseUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/49179127a9e2f6a723fc9874cbbff82f0d9dd1504d220c829fa4579b3c355e55/liquid-prep/';
    const baseUrl = 'https://service.us-east.apiconnect.ibmcloud.com/gws/apigateway/api/ac06cb5991ae6aa5dc50c799b05a1cbcadc93c9d815442e69a5a3acdbeb46e1d/liquid-prep/'
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
          //let soil = new Soil(params.moistureLevel, data.rain);
          console.log("weather info: ",data)
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
      //let query = JSON.parse(params.query);
      //let query = {"selector": {"_id": {"$gt": "0"}},"fields": ["_id"],"sort": [{"_id": "asc"}]};
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
      //let query = JSON.parse(params.query);
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