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
const task = process.env.npm_config_task || 'createAction';
const package = process.env.npm_config_package || 'labs';
process.chdir('intellicast-action');

let build = {
  createAction: () => {
    process.chdir('../intellicast-action');
    console.log(process.cwd(), `${package}`);
    if(fs.existsSync('intellicast-action.zip')) {
      fs.unlinkSync('intellicast-action.zip');
    }  
    exec(`zip -r intellicast-action.zip *`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log('done zipping intellicast action...');
        let arg = `bx wsk action update ${package}/intellicast-action --kind nodejs:8 --timeout 280000 intellicast-action.zip`;
        arg += ` --param AWS_PROD_ACCESS_KEY ${process.env['AWS_PROD_ACCESS_KEY']} --param AWS_PROD_SECRET_ACCESS_KEY ${process.env['AWS_PROD_SECRET_ACCESS_KEY']}`; 
        arg += ` --param AWS_STAGE_ACCESS_KEY ${process.env['AWS_STAGE_ACCESS_KEY']} --param AWS_STAGE_SECRET_ACCESS_KEY ${process.env['AWS_STAGE_SECRET_ACCESS_KEY']}`;
        arg += ` --param AWS_DEV_ACCESS_KEY ${process.env['AWS_DEV_ACCESS_KEY']} --param AWS_DEV_SECRET_ACCESS_KEY ${process.env['AWS_DEV_SECRET_ACCESS_KEY']}`; 
        // arg += ` --web true`;
        exec(arg, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
          if(!err) {
            console.log(`done add/update ${package}/intellicast-action`);
            build.createAnimateAction();
          } else {
            console.log('failed to add/update intellicast action', err);
          }
        });  
      } else {
        console.log(err);
      }
    });
  },
  createAnimateAction: () => {
    process.chdir('../intellicast-animate-action');
    if(fs.existsSync('intellicast-animate-action.zip')) {
      fs.unlinkSync('intellicast-animate-action.zip');
    }  
    console.log(process.cwd());
    exec(`zip -r intellicast-animate-action.zip *`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log('done zipping intellicast animate action...');
        arg = `bx wsk action update ${package}/intellicast-animate-action --kind nodejs:8 --memory 2048 --timeout 280000 intellicast-animate-action.zip`;
        exec(arg, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
          if(!err) {
            console.log(`done add/update ${package}/intellicast-animate-action`);
            build.createBetaComposer();
          } else {
            console.log('failed to add/update intellicast action', err);
          }
        });  
      } else {
        console.log(err);
      }
    });  
  },
  createBetaComposer: () => {
    process.chdir('../intellicast-composer');
    console.log(process.cwd());
    exec(`compose index-${package}.js > index-${package}.json`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log('done composing intellicast-composer...');
        exec(`deploy ${package}/intellicast-composer index-${package}.json -w`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
          if(!err) {
            console.log(`done deploying ${package}/intellicast-composer...`);
          } else {
            console.log(err);
          }
        });
      } else {
        console.log('failed to add/update intellicast-composer', err);
      }  
    });  
  },
  createComposer: () => {
    process.chdir('../intellicast-composer');
    console.log(process.cwd());
    exec(`bx wsk action update ${package}/intellicast-animate-while --kind nodejs:8 ./intellicast-animate-while.js`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
      if(!err) {
        console.log('done composing intellicast-animate-while...');
        exec(`fsh app update ${package}/intellicast-composer --kind nodejs:8 --timeout 280000 ./index-${package}.js`, {maxBuffer: 1024 * 2000}, (err, stdout, stderr) => {
          if(!err) {
            console.log('done composing intellicast-composer...');
          } else {
            console.log(err);
          }
        });
      } else {
        console.log('failed to add/update intellicast-composer', err);
      }  
    });  
  }
}

build[task]();

// fsh app invoke tools/cms-composer --param env prod