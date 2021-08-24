# Liquid Prep

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/static/v1?label=Community&message=%23liquid-prep&color=blue)](https://developer.ibm.com/callforcode/solutions/projects/get-started/) [![Web App](https://img.shields.io/badge/WebApp-Liquid%20%20Prep-blue)](https://liquid-prep-app-v2.s3-web.us-east.cloud-object-storage.appdomain.cloud/)

Liquid Prep offers an end-to-end solution for farmers who want to optimize their water usage; especially during times of drought. It is specially designed for low-literate farmers in developing countries who also need access to advanced agricultural advice to be successful.

By using an intuitive mobile app, local soil sensors, and backend service in IBM cloud, farmers can be better informed on how to use limited water supplies and increase their chances of growing healthy crops for their small plots of land.

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/readme/IBM-interview-video-image.png)](https://youtu.be/uJ7DUfCzypE)

## Solution Details

The [Call for Code 2019](https://callforcode.org/) Global Challenge asked teams of developers, designers, data scientists and business analysts to build solutions that significantly improve preparedness for natural disasters and accelerate relief when they hit. That year, the team answered the call and we have developed a solution for the many low-literate farmers in mostly developing countries to optimize the use of their limited water supply during times of drought.

> Learn more about the [history, testing, and ecosystem of Liquid Prep](BACKGROUND.md)

Farmers are the key food providers of the world. Their crops are essential to global human survival and prosperity. Natural disasters, such as droughts, end up affecting farmers and all of us down the line. With increasing fluctuations in global climate, we believe this is a very important problem to tackle.

We have developed **Liquid Prep**, an end-to-end solution for farmers looking to optimize their usage of water; especially during times of drought. The following depicts the Liquid Prep solution architecture:

<p align="center">
  <img src="https://raw.githubusercontent.com/Call-for-Code/Liquid-Prep/master/images/readme/LiquidPrep-Architecture-LF.PNG" alt="Liquid Prep architecture" width ="100%" height="120%">
</p>

#### Soil Moisture Sensor Module

The Soil Moisture Sensor Module, measures the soil moisture level and transmits the data to Liquid Prep App via USB serial connection/Bluetooth.

#### Liquid Prep App

Liquid Prep App is designed and developed for users/farmers with low literacy to easily understand, interact and get water advice for selected crop in their current location. The App interacts with the Soil Moisture Sensor Module to get the soil moisture data and IBM Cloud Backend Service to fetch weather data and crop data to generate watering advice for the selected crop.

#### IBM Cloud Backend Service

The Backend Service exposes APIs that are handled by [Cloud Functions](https://cloud.ibm.com/docs/openwhisk) which interacts with [Cloudant Database](https://www.ibm.com/cloud/cloudant) for crop data and [The Weather Company APIs](https://business.weather.com/) for weather data. The Backend Service is hosted on the [IBM Cloud](https://www.ibm.com/cloud).

#### The Weather Company

The Weather Data for a given location is being requested to [The Weather Company APIs](https://business.weather.com/) from the Backend Service.

### Get Started

1. Project Setup
   - [Soil Moisture Sensor Device Setup](./soilSensor/README.md)
   - [IBM Cloud Backend Service Setup](./backend/README.md)
   - [Liquid Prep App Setup](./liquid-prep-app/README.md)
2. [Project Roadmap](#project-roadmap)
3. [Contributing](#contributing)

## Project Roadmap

The Liquid Prep solution currently comprises mainly highly visual and easy-to-use mobile web application, a hardware sensor to measure soil moisture, a back-end data service to power the app, and the IBM Cloud platform for accessing weather and crop data. Our future roadmap adds more functionality to the Liquid Prep platform by: 

1. Localizing the app
2. Adding more crop data
3. Considering soil properties for better watering advice.

The goal of the project is to help farmers globally farm their crops with the least amount of water by taking advantage of real-time information that can help improve sustainability and build resiliency to climate change.

Participation is welcomed from software developers, designers, testers, agronomists/agri experts/soil experts, IoT engineers, researchers, students, farmers, and others that can help improve the quality and value of the solution for small farmers around the world. 

Key areas the team are interested in developing include localizing the mobile app, considering soil properties for the improvement of the watering advice, updating project documentation, software and hardware testing, more in-depth research, and adding more crops data to the database.

## Contributors

<a href="https://github.com/Call-for-Code/Liquid-Prep/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Call-for-Code/Liquid-Prep" />
</a>

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, areas where we'd like to see community contributions, and the process for submitting pull requests to the project.

## License

Copyright 2019-2021 Liquid Prep

Unless otherwise noted, this project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
