import { LiquidPrepParams } from '@common/params/liquid-prep-params';
import { CouchDB } from '@common/db/couch-db';
import { ErrorMessages } from 'src/constants/errorMessages';

export class CloudantDBService {

    private params: LiquidPrepParams;
    private cropList: any;
    private cropInfo: any;
    private couchDB;

    constructor(params: LiquidPrepParams){
        this.params = params;
        this.instantiateCloudantService(this.params);
    }

    private instantiateCloudantService(params){
        let databaseName: string;
        let cloudantURL: string;
        let iamAPIKey: string;

        if(params.databaseName){
            databaseName = params.databaseName;
        } else {
            throw Error(ErrorMessages.CLOUDANT_DATABASE_NAME_UNDEFINED)
        }
        
        if(params.cloudantUrl){
            cloudantURL = params.cloudantUrl;
        } else {
            throw Error(ErrorMessages.CLOUDANT_DATABASE_URL_UNDEFINED)
        }

        if(params.iamApiKey){
            iamAPIKey = params.iamApiKey;
        } else {
            throw Error(ErrorMessages.IAM_API_KEY_UNDEFINED)
        }

        this.couchDB = new CouchDB(databaseName, cloudantURL, iamAPIKey);
    }

    public getCropList() {
        console.log('getCropList method initiated');
        if(this.cropList) {
            return this.cropList;
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
        return this.cropList;
        }
    }

    public getCropInfo() {
        console.log('getCropInfo method initiated');
        let cropName: string;
        if(this.params.cropName){
            cropName = this.params.cropName;
        } else {
            throw Error(ErrorMessages.CROP_NAME_UNDEFINED)
        }
        console.log('cropName', cropName);
        let query = {"selector": {"_id": cropName}};
        console.log('crop info query: ', query);
        this.cropInfo = this.couchDB.dbFind(query);

        return this.cropInfo;
    }
}