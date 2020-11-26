import { LiquidPrepParams } from '@common/params/liquid-prep-params';
import { CouchDB } from '@common/db/couch-db';
import { ErrorMessages } from 'src/constants/errorMessages';

export class CloudantDBService {

    private databaseName: string = null;
    private cloudantURL: string = null;
    private iamAPIKey: string = null;

    private cropList: any = null;
    private cropInfo: any = null;
    private cropName: string = null;

    constructor(params: LiquidPrepParams){
        if(params.databaseName){
            this.databaseName = params.databaseName;
        } else {
            throw Error(ErrorMessages.CLOUDANT_DATABASE_NAME_UNDEFINED)
        }
        
        if(params.cloudantUrl){
            this.cloudantURL = params.cloudantUrl;
        } else {
            throw Error(ErrorMessages.CLOUDANT_DATABASE_URL_UNDEFINED)
        }

        if(params.iamApiKey){
            this.iamAPIKey = params.iamApiKey;
        } else {
            throw Error(ErrorMessages.IAM_API_KEY_UNDEFINED)
        }

        if(params.cropName){
            this.cropName = params.cropName;
        } else {
            throw Error(ErrorMessages.CROP_NAME_UNDEFINED)
        }
    }

    private couchDB = new CouchDB(this.databaseName, this.cloudantURL, this.iamAPIKey);

    public getCropList() {
        if(this.cropList) {
            return this.couchDB.dbFind(this.cropList);
        } else {
            let query = {
              "selector": {
                 "type": "crop"
              },
              "fields": [
                 "cropName"
                ]
           }
        console.log('crop list query: ', query);
        this.cropList = this.couchDB.dbFind(query);
        }

        return this.cropList;
    }

    public getCropInfo() {
        if(this.cropInfo) {
            return this.couchDB.dbFind(this.cropInfo);
        } else {
            console.log('cropName', this.cropName);
            let query = {"selector": {"_id": this.cropName}};
            console.log('crop info query: ', query);
            this.cropInfo = this.couchDB.dbFind(query);
            return this.cropInfo;
        }
    }
}