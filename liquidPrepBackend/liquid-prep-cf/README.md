# Liquid Prep Cloud Functions
This repo consists of two directories:

1) common: the common utility libraries (db, cos, common functionalities & etc.) that we may or may not be using all the functionality in this project
2) liquid-prep-cf: source code for business logics

Currently liquid-prep-action has been deployed in my account jefflu under the space "corporate_service_corp" with this endpoint
"https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/49179127a9e2f6a723fc9874cbbff82f0d9dd1504d220c829fa4579b3c355e55/liquid-prep/"


### Instructions for setting up local environment

### 
Install ibmcloud cli - https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started

### Install wskdeploy
brew install wskdeploy

### install kui tools - UI for testing/executing actions
curl -sL https://raw.githubusercontent.com/IBM/kui/master/tools/install.sh | sh

### ibmcloud plugins
ibmcloud plugin repo-plugins -r "IBM Cloud"
ibmcloud plugin install cloud-functions

ibmcloud plugin list
Plugin Name                        Version   Status
cloud-object-storage               1.0.0
container-registry                 0.1.391
dev                                2.2.0
sdk-gen                            0.1.12
cloud-functions/wsk/functions/fn   1.0.32

### sso commandline examples
ibmcloud login --sso -r us-east -o \<user> -s sandbox && ibmcloud wsk list<br>

ibmcloud --account<br>
ibmcloud wsk list<br>
ibmcloud target -r us-south -o \<user> -s sandbox<br>
ibmcloud fn package create ibmcos<br>
ibmcloud version<br>
ibmcloud target --cf sandbox<br>
ibmcloud login --sso<br>
ibmcloud account space dev<br>
ibmcloud fn package list<br>
ibmcloud target<br>
ibmcloud wsk api list<br>

### swithcing account
cd into liquid-prep-cf<br>
run "npm run switch-account --account=serverless"  

OR

ibmcloud login --apikey ****************** -r us-south -o jefflu -s corporate_service_corp

### To refresh token
ibmcloud iam oauth-tokens

### If Token expired
delete /Users/<username>/.wskprops then run "ibmcloud fn package list"

### fsh commands
fsh app invoke weather-stage/cos-intellicast-composer --param animate yes

fsh action invoke weather-stage/cos-intellicast-action --param env prod --param purge byDate --param directory 20190201

fsh app invoke tools/intellicast-composer --param env prod --param animate yes

fsh action invoke tools/intellicast-action --param env prod --param purge byDate --param directory 20190201

### kui commands against twcwebnp@us.ibm.com or twcwebp@us.ibm.com  
kui app invoke weather-dev/cos-intellicast-composer --param animate yes

kui app invoke weather-stage/cos-intellicast-composer --param animate yes

kui app invoke weather-prod/cos-intellicast-composer --param animate yes

kui action invoke weather-prod/cos-intellicast-purge-action --param purge byDate --param directory 20190628

kui action invoke weather-prod/cos-intellicast-purge-action --param purge thisFile --param fileName animate.png

### Example for deployment
npm run deploy --task=deploy --package=demo --env=dev

npm run deploy --task=deploy --package=weather-stage --env=stage --composer=true

npm run deploy --task=deploy --package=weather-prod --env=prod --composer=true

### Test out api call
https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/49179127a9e2f6a723fc9874cbbff82f0d9dd1504d220c829fa4579b3c355e55/liquid-prep/demo_get

https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/49179127a9e2f6a723fc9874cbbff82f0d9dd1504d220c829fa4579b3c355e55/liquid-prep/demo_post

