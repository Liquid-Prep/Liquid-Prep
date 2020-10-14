#! /usr/bin/env node
const fs = require('fs');
const jsonfile = require('jsonfile');
const Cloudant = require('@cloudant/cloudant'); 

const name = process.env.npm_config_name;

console.log('name', name)

if(name) {
  let params = {
    //url: 'https://d44a1815-07de-4807-bd7a-baf4b9adc1c4-bluemix:2808e309234a627482f093ca8880266394522d2b89c456ec3706cfd40aec3111@d44a1815-07de-4807-bd7a-baf4b9adc1c4-bluemix.cloudantnosqldb.appdomain.cloud'
    url: 'https://446ac891-dd3c-4287-8dc3-6996f9df27b4-bluemix.cloudantnosqldb.appdomain.cloud'
  };
  let cloudant = Cloudant(params);
  let db = cloudant.db.use('liquid-prep')
  let filename = `./bin/data/${name}`;
  console.log(filename)

  jsonfile.readFile(filename, (err, objArr) => {
    if (!err) {
      db.bulk({docs: objArr}).then((body) => {
        console.log(body);
      })
      console.log(objArr)
    } else {
      console.log(`failed to read ${filename}`, err);
      process.exit(1);
    }
  });  
}
