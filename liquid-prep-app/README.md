# [Liquid Prep - App](https://liquid-prep-app-v2.s3-web.us-east.cloud-object-storage.appdomain.cloud/)

[![Web App](https://img.shields.io/badge/WebApp-Liquid%20%20Prep-blue)](https://liquid-prep-app-v2.s3-web.us-east.cloud-object-storage.appdomain.cloud/)

Liquid Prep App is an user interface that is accessed on your mobile device to get water advise for the selected crop. It is a [Progressive Web App (PWA)](https://web.dev/progressive-web-apps/) developed with [Angular](https://angular.io/) web framework.

The Liquid Prep App gets the Weather and Crops data from the [Liquid Prep Backend](https://github.com/Call-for-Code/Liquid-Prep/tree/master/backend) service and the soil moisture data from the [Soil Sensor Module](https://github.com/Call-for-Code/Liquid-Prep/tree/master/soilSensor). With all three weather, crop and soil moisture data the app computes and provides water advise for the selected crop.

The Liquid Prep App can be run on your local machine for development and testing purpose. And it is deployed on [IBM Cloud Object Storage](https://www.ibm.com/ca-en/cloud/object-storage) for production to be accessed globally.

**[Click to access Liquid Prep App](https://liquid-prep-app-v2.s3-web.us-east.cloud-object-storage.appdomain.cloud/)**

Instructions on how to run the App,
1. [Locally](#run-app-locally) 
2. [Deploy to IBM Cloud Object Storage](#deploy-app-in-IBM-Cloud-Object-storage)

## Pre-requisites

 1. Node and NPM:
    - [Install Node and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
 2. Angular CLI
    - [Install Angular CLI](https://cli.angular.io/)
 3. Git:
    - [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)
    - [Configure Git](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
    - [Git account setup and configuration](https://git-scm.com/book/en/v2/GitHub-Account-Setup-and-Configuration)
 4. Liquid Prep project:
    - [Git clone Liquid Prep project](https://github.com/Call-for-Code/Liquid-Prep)
 5. IBM Cloud account:
    - [Create an IBM Cloud account](https://cloud.ibm.com/registration)
 6. Liquid Prep Backend Service Endpoint:
    - [Deploy Liquid Prep Backend in IBM Cloud Functions](https://github.com/Call-for-Code/Liquid-Prep/tree/master/backend#deploy-liquid-prep-backend-service) and note down the `CLOUD_FUNCTIONS_URL` which is the Backend service endpoint. This endpoint will be required later for deploying the App.

# Run App Locally:

 1. **Build the App**
    - Start a terminal/CMD in `Liquid-Prep/liquid-prep-app` folder.
    - Run `npm install`.

 2. **Config.json**
    - Rename the file `src/config-sample.json` to `src/config.json`.
    - Update the `src/config.json` with Liquid Prep Backend Service Endpoint noted down in the [Pre-requisites](#pre-requisites) 6th point.

 3. **Run the App**
    - Run `npm start`.
    - Open the browser and enter `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

  **NOTE:**
    - You can also run the App by executing Angular CLI command `ng serve` too. 

# [Deploy App in IBM Cloud Object Storage](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-getting-started-cloud-object-storage)

 1. **Config.json**
    - Rename the file `src/config-sample.json` to `src/config.json`.
    - Update the `src/config.json` with Liquid Prep Backend Service Endpoint noted down in the [Pre-requisites](#pre-requisites) 6th point.

 2. **Build the App for production**
    - Start a terminal/CMD in `Liquid-Prep/liquid-prep-app` folder.
    - Run `npm install`.
    - Run `npm run build-prod`. 
    - The build artifacts will be created and stored in the `dist/liquid-prep-app` directory.

  **NOTE:**
    - You can also build the App by executing Angular CLI command `ng build --prod` too.

 3. **Deploy App in IBM Cloud Object Storage**
    - Log into your [IBM Cloud account](https://cloud.ibm.com/login).
    - Enter **Object Storage** in the search bar and select **Object Storage** from the results.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosSelect.PNG" width ="30%" height="30%">
      </p>
  
    - Select **Cloud Object Storage Lite** or **Cloud Object Storage Classic** based on your requirement and click **Create** button in bottom right.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosOption.PNG" width ="30%" height="30%">
      </p>
  
    - Next configure the Object Storage by selecting the right plan for your requirement, enter a service name, select a resource group and optionally enter a tag.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosConfig.PNG" width ="30%" height="30%">
      </p>

    - Now your Object Storage will be created and you will be routed to its dashboard. Select **Create bucket** tab and click on **Create Bucket** button.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosCreateBucket.PNG" width ="30%" height="30%">
      </p>

    - Configure the bucket by entering a **Unique bucket name**, select the required **Resiliency**, **Location** and **Storage class** options. Then configure **Static website hosting** by clicking **Add rule**, turn on the **Public access** switch and enter `index.html` for **Index document**. Finally click **Create Bucket** button end of the page.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosBucketConfig1.PNG" width ="30%" height="30%">
      </p>
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosBucketConfig3.PNG" width ="30%" height="30%">
      </p>
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosBucketConfig2.PNG" width ="30%" height="30%">
      </p>

    - Now a bucket will be created and shown in your Cloud Object Storage dashboard. Click on the bucket created.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosBucketCreated.PNG" width ="30%" height="30%">
      </p>

    - Click on the **Upload** button and upload all the contents in `dist/liquid-prep-app` directory which was created when you built the app.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosUpload.PNG" width ="30%" height="30%">
      </p>

    - Once uploading is complete, select **Configuration** for the bucket.
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosAppURL1.PNG" width ="30%" height="30%">
      </p>

    - Scroll down to the very bottom of the page and you will find the URL endpoints for the App that can be shared to access the Liquid Prep App in the browser
      <p align="left">
          <img src="https://github.com/Call-for-Code/Liquid-Prep/blob/master/images/App/COS/cosAppURL2.PNG" width ="30%" height="30%">
      </p>

### Important Notes:

  - Once a Bucket is created for a Cloud Object Storage, don't delete it. You can build your App with new changes and upload the `dist/liquid-prep-app` contents for the same Bucket. If you delete the Bucket you won't be able create another with the same name and you will have to wait for 7 days for the same name. Learn more about the [Cloud Object Storage delete bucket](https://cloud.ibm.com/docs/cloud-object-storage?topic=cloud-object-storage-compatibility-api-bucket-operations#compatibility-api-delete-bucket).
