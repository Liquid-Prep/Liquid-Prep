# Liquid Prep - Backend Service

Liquid Prep backend service exposes REST API endpoints for Clever Crop application to query weather and crop information. The backend service is deployed and hosted on IBM Cloud. It mainly consists of 2 IBM Cloud services;
1. **[IBM Cloud Functions](https://cloud.ibm.com/docs/openwhisk)**
2. **[IBM Cloudant DB](https://cloud.ibm.com/docs/Cloudant)**

Currently the backend service is deployed and hosted on IBM Cloud Liquid Prep's account.
You can also setup and deploy the Liquid Prep backend service on your own IBM Cloud account.

Instructions on how to setup, configure and deploy the backend service is as follows:

## Pre-requisites

1. IBM Cloud account:
   - Create an IBM Cloud account. [Link](https://cloud.ibm.com/registration)
   - Install IBM Cloud CLI, [Link](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started)
   - Setup the Cloud Functions CLI plug-in, [Link](https://cloud.ibm.com/docs/openwhisk?topic=openwhisk-cli_install)

2. Git:
   - Install Git, [Link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git/)
   - Configure Git, [Link](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
   - Git account setup and configuration, [Link](https://git-scm.com/book/en/v2/GitHub-Account-Setup-and-Configuration)

3. Liquid Prep project:
   - Git clone Liquid Prep project, [Link](https://github.com/Call-for-Code/Liquid-Prep)

4. The Weather Company API Key:
   - Register and subscribe The Weather Company service API key, [Link](https://www.ibm.com/products/weather-company-data-packages/details)

## IBM Cloud Functions

1.	Create a new IBM cloud account. If you already have an account, please log in to account.
2.	Select `IBM Cloud Functions icon` on left the pane of the IBM Cloud account dashboard <br>
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
    Or you can search for `Functions` in search bar and select `Functions`.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
3.	Select `Actions` option on the left pane of `IBM Cloud Functions` dashboard.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
4.	Create new Actions by clicking the `Create` on top right of the dashboard, enter Action Name as `liquid-prep-action`. Create new Package `liquidPrep`. Select `Node.js 12` as Runtime.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
5.	Go back to **IBM Cloud Functions** dashboard and select `APIs` option on the left pane.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
6.	Select `Create API` option on top right of the dashboard, enter API name as `liquidPrep-cf-api`. Let the `Base path for API` be default `/liquidPrep-cf-api`. Let other settings be default values, unless other specific entries are required. Scroll down the page and select `Create`.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
7.	Once API is created, select the API `liquidPrep-cf-api`, select `Mange Sharing and Keys` on the left pane of the API dashboard. Enable `Include API in organization-level Shared APIs view`.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>

## IBM Cloudant

1.	Enter `Cloudant` in the IBM Cloud search bar and select `Cloudant`.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
2.	Under **Select an environment** section, enter Instance Name as `Cloudant-liquidPrep`.
3.	Select `IAM` as Authentication method.
4.	Select a suitable pricing Plan – Lite, Standard and Standard on Transaction Engine.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
5.	Select `Create` on the bottom right pane of Cloudant dashboard. After you click `Create`, a message displays to say that the instance is being provisioned, which returns you to the Resource list. From the Resource list, you see the status for your instance is, `Provision in progress.`
6.	When status of the instance changes to `Active`, click the **Cloudant-liquidPrep** instance and select `Service Credentials` tab on left pane of dashboard.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
7.	Select `New Credential`, enter Name as `liquid-prep` and Role as `Manager`. A service credential will be created.
8.	Select `Manage` tab on the left pane and select `Launch Dashboard` on the top right of the page. It will launch a Cloudant dashboard to create new database.
9.	On the Databases page, select `Create Database` on the top right of the Cloudant dashboard.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
10.	Enter Database name as `liquid-prep-crops`. Select the Partitioning option as `Non-partitioned`. And click on `Create` button at the bottom.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
11.	**liquid-prep-crops** database will be created and listed in Databases page.
12.	Select **liquid-prep-crops** and click on `Create Document` on top right of the page. A document with auto generated `_id` key will open.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
13.	Go to Liquid Prep project Git repository for crops documents, [Link](https://github.com/Call-for-Code/Liquid-Prep/tree/master/backend/resources/crops). Open each crop document, copy the contents in the document and paste it in the `New Document` that was opened in **liquid-prep-crops** database and click `Create Document` button. <br>
    Example for Corn crop;
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p> 
    Corn document will be created and listed in **liquid-prep-crops** database.
    <p align="center">
        <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="30%" height="30%">
    </p>
14.	Similarly, create documents for all other crops in Liquid Prep project Git repository, https://github.com/Call-for-Code/Liquid-Prep/tree/master/backend/resources/crops.