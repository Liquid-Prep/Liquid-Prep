#! /usr/bin/env node
const path = require('path');
const cp = require('child_process'),
  exec = cp.exec;
const fs = require('fs');
const jsonfile = require('jsonfile')
const dotenv = require('dotenv');

if(fs.existsSync('.env-local')) {
  const localEnv = dotenv.parse(fs.readFileSync('.env-local'));
  for(var i in localEnv) {
    process.env[i] = localEnv[i];
  }
}

const task = process.env.npm_config_task || 'switchAccount';
const package = process.env.npm_config_package || 'weather-dev';
const env = process.env.npm_config_env || 'dev';
const region = process.env.npm_config_region || 'us-south';
const account = process.env.npm_config_account;
const composer = process.env.npm_config_composer;

let build = {
  getEnvVar: () => {
    let pEnv = process.env;
    pEnv.PACKAGE = package;
  },
  switchTarget: (cb) => {
    if(account) {
      console.log(process.env.HOME);
      jsonfile.readFile(`${process.env.HOME}/apikeys/${account}.json`, function (err, obj) {
        if (!err) {
          const arg = `ibmcloud login --apikey ${obj.apiKey} -r ${region} -o ${obj.org} -s ${obj.space} && ibmcloud fn api list`;
          console.log(`switch to ${arg}`);
          exec(arg, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
            if(!err) {
              console.log(stdout)
              console.log(`switch account successfully`);
              cb();
            } else {
              console.log('failed to switch account', err);
            }
          });
        } else {
          console.error(err)
        }
      })
    } else {
      cb();
    }
  },
  switchAccount: () => {
    if(account) {
      build.getEnvVar();
      build.switchTarget(() => {
        console.log('done');
      });
    } else {
      console.log('specify an acount to switch to.')
    }  
  }
}

build[task]();
