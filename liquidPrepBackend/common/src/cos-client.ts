import { Observable, forkJoin } from 'rxjs';
const AWS = require('ibm-cos-sdk');
import { Params } from './params';

export class CosClient {
  client: any;

  constructor (private params: Params) {
    // if (!params.bucket) throw new Error("Missing bucket parameter.");
    // if (!params.ibmAuthEndpoint || !params.endpoint) throw new Error("Missing endpoint or credential.");
    this.init(params);
  }

  init(params: any) {
    let config = {
      endpoint: params.endpoint,
      ibmAuthEndpoint: params.ibmAuthEndpoint,
      apiKeyId: params.apiKeyId,
      accessKeyId: params.accessKeyId,
      secretAccessKey: params.secretAccessKey,
      serviceInstanceId: params.serviceInstanceId,
      region: params.region
    }
    this.client = new AWS.S3(config);
  }
  ls(bucket, directory, delimiter = null)  {
    return Observable.create((observer) => {
      let data;
      let config = { 
        Bucket: bucket,
        MaxKeys: 1000,
        Prefix: directory
      }
      if(delimiter) {
        config['Delimiter'] = delimiter;
      }
      // console.log('config', config)
      this.client.listObjects(config, (err, data) => {
        if(err) {
          console.error(`unable to list: ${directory}` + err.stack);
          observer.error(err);
        } else {
          // console.log('done')
          observer.next(data);
          observer.complete();
        }
      });
    });  
  }
  listAll(params: Params, token, keys) {
    return Observable.create((observer) => {
      let list = (params, token, keys) => {
        let config = {
          Bucket: params.bucket,
          Prefix: params.key
        };
        if(token) {
          config['ContinuationToken'] = token;
        }
        console.log('$$$config',  config);
        this.client.listObjectsV2(config, function(err, data){
          // console.log('$$$data',  data, err);
          if(data) {
            keys = keys.concat(data.Contents);
            
            if (data.IsTruncated) {
              list(params, data.NextContinuationToken, keys);
            } else {
              observer.next(keys);
              observer.complete();
            }  
          } else {
            observer.next(keys);
            observer.complete();
          }  
        });    
      };
      list(params, token, keys);
    });
  }
  mkdir(params: Params) {
    return Observable.create((observer) => {
      // Note directory must have trailing slash or it will be treated as a file
      const directory = params.directory;
      const bucket = params.bucket;
      const acl = params.acl ? params.acl : 'private';
      this.client.putObject(
        { 
          Bucket: bucket, 
          ACL: acl,
          Key: directory,
          Body: 'content does not matter' 
        }, (err, data) => {
          if (err) { 
            console.error(`mkdir failed: ` + err);
            observer.next({result: `unable to mkidr: ${directory}`});
            observer.complete();
          } else { 
            observer.next({result: `${directory} was created successfully.`});
            observer.complete();
          }  
      });
    });
  }
  copyFiles(params: Params) {
    return Observable.create((observer) => {
      const files = Array.isArray(params.filename) ? params.filename : [params.filename]; 
      let $files = [];
      let config = {
        Bucket: params.bucket,
        CopySource: '',
        Key: ''
      };
      files.forEach((f) => {
        config.Key = f.dest;
        config.CopySource = `${params.bucket}/${f.src}`;
        $files.push(this.client.copyObject(config).promise());
      });
      let res;
      forkJoin($files)
      .subscribe((resp) => {
        res = resp;
      }, (err) => {
        observer.next({result: `unable to copy: ${config.CopySource}, ${config.Key}, ${err}`});
        observer.complete();
      }, () => {
        observer.next({result: `${files.length} file(s) copied successfully, ${config.CopySource}, ${config.Key}, ${config.Bucket}`});
        observer.complete();
      });
    }); 
  }
  deleteDir(params: Params) {
    return Observable.create((observer) => {
      let items = 0;
      let $dir = [];
      let files:any = [];
      console.log('$$$$$$file', params.directory)
      params.directory.forEach((dir) => {
        let config = <Params>{
          key: dir,
          bucket: params.bucket
        }  
        $dir.push(this.listAll(config, null, []));
      });
      forkJoin($dir)
      .subscribe((res) => {
        res.forEach((keys: any[]) => {
          items += keys.length;
          keys.forEach((key) => {
            files.push(key.Key);
          })
        });
        params.filename = files;
        this.delete(params)
        .subscribe((res) => {
          observer.next({result: `${items} item(s) deleted successfully`});
          observer.complete();
        })
      });
    });
  }
  delete(params: Params) {
    return Observable.create((observer) => {
      console.log('$$$$$$file', params.filename)
      const files = params.filename instanceof Array ? params.filename : [params.filename]; 
      let $files = [];
      let config = {
        Bucket: params.bucket,
        Key: ''
      };
      files.forEach((f) => {
        config.Key = f;
        $files.push(this.client.deleteObject(config).promise());
      });
      forkJoin($files)
      .subscribe(() => {
        observer.next({result: `${files.length} file(s) deleted successfully`});
        observer.complete();
      });
    }); 
  }
  upload(params: Params) {
    return Observable.create((observer) => {
      const bucket = params.bucket;
      const cacheControl = params.cacheControl ? params.cacheControl : `cacheControl='max-age=600'`;
      const acl = params.acl ? params.acl : 'public-read';
      const f = params.filename;

      let ct = params.contentType;
      if (f.indexOf('.html') >= 0) ct = 'text/html';
      else if (f.indexOf('.json') >= 0) ct = 'application/json';
      else if (f.indexOf('.css') >= 0) ct = 'text/css';
      else if (f.indexOf('.js') >= 0) ct = 'application/x-javascript';
      else if (f.indexOf('.png') >= 0) ct = 'image/png';
      else if (f.indexOf('.gif') >= 0) ct = 'image/gif';
      else if (f.indexOf('.jpg') >= 0) ct = 'image/jpg';
      else if (!ct && f.indexOf('.csv') >= 0) ct = 'text/csv';

      let config = {
        Bucket: bucket,
        Key: f,
        ACL: acl,
        Body: params.body,
        ContentType: ct,
        CacheControl: cacheControl
      };
      this.client.putObject(config, (err, res) => {
        if (err) {
          console.error(`unable to upload: ${f}` + err);
          observer.next({result: `unable to upload: ${f}`});
          observer.complete();
        } else {
          observer.next({result: `uploaded: ${f}`});
          observer.complete();
        }
      });
    });  
  }
  downloadFile(params: Params) {
    return Observable.create((observer) => {
      const f = params.filename;
      const bucket = params.bucket;
      let config = {
        Bucket: bucket,
        Key: f
      };
      this.client.getObject(config, (err, res) => {
        if (err) {
          console.error(`unable to download: ${f}` + err);
          observer.next({result: `unable to download: ${f}`});
          observer.complete();
        } else {
          try {
            observer.next(res.Body);
            observer.complete();
          } catch(e) {
            observer.next({result: `unable to download: ${f}`});
            observer.complete();
          }
        }
      });
    });  
  }
  download(params: Params) {
    return Observable.create((observer) => {
      const f = params.filename;
      const bucket = params.bucket;
      let config = {
        Bucket: bucket,
        Key: f
      };
      try{
        this.client.getObject(config)
        .promise()
        .then((data) => {
          observer.next(data);
          observer.complete();
        });
      } catch(e) {
        observer.next({result: `unable to download: ${f}`});
        observer.complete();
      }
    });  
  }
  uploadBuffer(params: Params) {
    return Observable.create((observer) => {
      const bucket = params.bucket;
      const files = params['__ow_method'] === 'post' ? params.filename : [params.filename];
      const cacheControl = params.cacheControl ? params.cacheControl : `cacheControl='max-age=900'`;
      const acl = params.acl ? params.acl : 'private';
      let ct = 'application/json';
      let $files = [];
      let config = {
        Bucket: bucket,
        Key: '',
        ACL: acl,
        Body: params.body,
        ContentType: ct,
        CacheControl: cacheControl
      };
      console.log('upload', bucket, params.filename);
      files.forEach((f) => {
        config.Key = f;
        ct = config.ContentType;
        if (f.indexOf('.html') >= 0) ct = 'text/html';
        else if (f.indexOf('.css') >= 0) ct = 'text/css';
        else if (f.indexOf('.js') >= 0) ct = 'application/x-javascript';
        else if (f.indexOf('.png') >= 0) ct = 'image/png';
        else if (f.indexOf('.gif') >= 0) ct = 'image/gif';
        else if (f.indexOf('.jpg') >= 0) ct = 'image/jpg';

        $files.push(this.client.putObject(config).promise());
      });
      forkJoin($files)
      .subscribe(() => {
        observer.next({result: `${files.length} file(s) uploaded successfully`});
        observer.complete();
      });
    });
  }
  setFileAcl(params: Params) {
    // console.log(params.filename, params.bucket, params.acl)
    return Observable.create((observer) => {
      const files = params['__ow_method'] === 'post' ? params.filename : [params.filename]; 
      let $files = [];
      let config = {
        Bucket: params.bucket,
        Key: '',
        ACL: params.acl
      };
      // console.log(files, params['__ow_method'])
      files.forEach((f) => {
        config.Key = f;
        $files.push(this.client.putObjectAcl(config).promise());
      });
      forkJoin($files)
      .subscribe(() => {
        observer.next({result: `${files.length} file(s) set to ${params.acl}`});
        observer.complete();
      });
    }); 
  }
  getSignedUrl(params: Params) {
    return Observable.create(async (observer) => {
      let config = {
        Bucket: params.bucket,
        Key: params.filename,
        Expires: params.expires ? params.expires : 900
      };
      try {
        let url = await this.client.getSignedUrl('getObject', config);
        observer.next({url: url});
        observer.complete();
      } catch (err) {
        console.log(err);
        observer.next({result: `unable to generate signed url: ${err}`});
        observer.complete();

      }
    });
  }
  putSignedUrl(params: Params) {
    return Observable.create(async (observer) => {
      let config = {
        Bucket: params.bucket,
        Key: params.filename,
        Expires: params.expires ? params.expires : 900
      };
      try {
        let url = await this.client.getSignedUrl('putObject', config);
        observer.next({url: url});
        observer.complete();
      } catch (err) {
        console.log(err);
        observer.next({result: `unable to generate signed url: ${err}`});
        observer.complete();
      }
    });
  }
}