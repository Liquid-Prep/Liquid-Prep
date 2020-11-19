#! /usr/bin/env node
const path = require('path');
const cp = require('child_process'),
  exec = cp.exec;
const fs = require('fs');
require('dotenv').config();

const task = process.env.npm_config_task || 'deploy'
const env = process.env.npm_config_env || 'dev';
const package = process.env.npm_config_package || 'liquidPrep';
const yaml = process.env.npm_config_api ? 'manifest-api.yaml' : 'manifest.yaml';

let build = {
  deploy: () => {
    
    console.log('task: ',task);
    console.log('env: ',env);
    console.log('package: ',package);
    console.log('yaml: ',yaml);

    console.log('iamApiKey: ',process.env.IAM_API_KEY);
    console.log('cloudFunctionUrl: ',process.env.CLOUD_FUNCTIONS_URL);
    console.log('cloudantUrl: ',process.env.CLOUDANT_DB_URL);
    console.log('databaseName: ',process.env.CLOUDANT_DB_NAME);
    console.log('weatherApiKey: ',process.env.WEATHER_API_KEY);

    let cfCMD = `ibmcloud fn deploy -m ${yaml} --param IAM_API_KEY ${process.env.IAM_API_KEY} --param CLOUD_FUNCTIONS_URL ${process.env.CLOUD_FUNCTIONS_URL} --param CLOUDANT_DB_NAME ${process.env.DB_NAME} --param WEATHER_API_KEY ${process.env.WEATHER_API_KEY}`;
    exec(cfCMD, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log(stdout)
        console.log(`done deploying ${package}`);
      } else {
        console.log(stderr);
        console.log('failed to deploy', err);
      }
    });
  }    
}

build[task]();