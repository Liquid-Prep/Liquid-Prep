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
    let arg = `APIKEY=${process.env.APIKEY} CLOUDANT_URL=${process.env.CLOUDANT_URL} wskdeploy -m ${yaml}`;
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
    pEnv.APIKEY = weather[env]['apikey'];
    pEnv.CLOUDANT_URL = weather[env]['cloudantUrl'];

  },
  createComposer: () => {
    console.log(process.cwd());
    build.generateComposerJson();
    exec(`compose ./dist/watson-services/src/watson-composer-${package}.js > ./dist/watson-services/src/watson-composer-${package}.json`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log('done composing watson-composer...');
        exec(`deploy ${package}/watson-composer ./dist/watson-services/src/watson-composer-${package}.json -w`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
          if(!err) {
            console.log(`done deploying ${package}/watson-composer...`);
          } else {
            console.log(err);
          }
        });
      } else {
        console.log('failed to add/update watson-composer', err);
      }  
    });  
  },
  generateComposerJson: () => {
    if(fs.existsSync('./dist/watson-services/src/watson-composer.js')) {
      const file = fs.readFileSync('./dist/watson-services/src/watson-composer.js').toString().split('\n');
      let output = [];
      let match;
      file.forEach((line, i) => {
        if(line.indexOf('${package}') > 0) {
          line = line.replace('${package}', package);
          console.log('package', line);
          output.push(line);
        } else {
          output.push(line);
        }
      });
      let text = output.join('\n');
      fs.writeFileSync(`./dist/watson-services/src/watson-composer-${package}.js`, text, function (err) {
        if (err) {
          console.log(err);
          process.exit(1);
        } else {
          console.log(`generated ./dist/watson-services/src/watson-composer-${package}.js`);
        } 
      });
    }
  }    
}

build[task]();