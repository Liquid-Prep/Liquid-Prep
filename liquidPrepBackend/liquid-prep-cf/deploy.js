#! /usr/bin/env node
const path = require('path');
const cp = require('child_process'),
  exec = cp.exec;
const fs = require('fs');
var dotenv = require('dotenv');

if(fs.existsSync('.env-local')) {
  const localEnv = dotenv.parse(fs.readFileSync('.env-local'));
  for(var i in localEnv) {
    process.env[i] = localEnv[i];
  }
}

const env = process.env.npm_config_env || 'dev';
const task = process.env.npm_config_task || 'deploy';
const package = process.env.npm_config_package || 'wx-labs';
const yaml = process.env.npm_config_api ? 'manifest-api.yaml' : 'manifest.yaml';

let build = {
  deploy: () => {
    build.getEnvVar();
    let arg = `WEATHERAPIKEY=${process.env.WEATHERAPIKEY} CLOUDANT_URL=${process.env.CLOUDANT_URL} wskdeploy -m ${yaml}`;
    console.log('deploying...')
    exec(arg, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log(stdout)
        console.log(`done deploying ${package}`);
      } else {
        console.log('failed to deploy', err);
      }
    });
  },
  getEnvVar: () => {
    const weather = JSON.parse(process.env.WEATHER_ACCESS);
    let pEnv = process.env;
    pEnv.PACKAGE = package;
    pEnv.WEATHERAPIKEY = weather[env]['weatherApiKey'];
    pEnv.CLOUDANT_URL = weather[env]['cloudantUrl'];

  }    
}

build[task]();