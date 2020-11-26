import { Observable, of } from 'rxjs';
import { LiquidPrepParams } from '@common/params/liquid-prep-params';
import { IftttMessenger } from '@common/ifttt-messenger';
import { util } from '@common/utility';
import { Weather } from './triggers';
import { CloudantDBService } from './services/cloudant/cloudantDBService';
import { BaseResponse } from './services/responses/baseResponse';

// Standard entry point for cloud functions
export default function main(params: LiquidPrepParams) {
  let result: any;

  console.log("cloudantDBUrl: ", params.cloudantUrl);
  console.log("databaseName: ", params.databaseName);
  console.log("iamApiKey: ", params.iamApiKey);
  console.log("cloudFunctionUrl: ", params.cloudFunctionsURL);
  console.log("weatherApiKey: ", params.weatherApiKey);
  
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
    // units will either be "m" for Celcius or "e" for Farenheit
    let weather = new Weather(params.weatherApiKey, params.geoCode, params.language, params.units);
    let fiveDaysWeatherInfo = weather.get5DaysForecast();
    let weatherResponse = new BaseResponse().generateResponse(fiveDaysWeatherInfo, null);
    return weatherResponse;
  },
  get_crop_list: (params: LiquidPrepParams) => {
    let cropList = new CloudantDBService(params).getCropList();
    let cropsListResponse = new BaseResponse().generateResponse(cropList, null);
    return cropsListResponse;
  },
  get_crop_info: (params: LiquidPrepParams) => {
    let cropInfo = new CloudantDBService(params).getCropInfo();
    let cropsInfoResponse = new BaseResponse().generateResponse(cropInfo, null);
    return cropsInfoResponse;
  },
  error: (msg) => {
    return Observable.create((observer) => {
      observer.next(msg);
      observer.complete();
    });
  },
  default: (params: LiquidPrepParams) => {
    return Observable.create((observer) => {
      observer.next(`API not found.`);
      observer.complete();
    });
  }
}