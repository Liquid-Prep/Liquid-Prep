# Liquid Prep

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack)

Liquid Prep offers an end-to-end solution for farmers looking to optimize their water usage; especially during times of drought. It is specially designed for low-literate farmers in developing countries who also need access to advanced agricultural advice to be successful.

By leveraging the use of an intuitive mobile app, local soil sensors, and backend service in IBM cloud, farmers can be better informed on how to use limited water supplies and increase their chances of growing healthy crop for their small plots of land.

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/readme/IBM-interview-video-image.png)](https://youtu.be/uJ7DUfCzypE)

## Solution Details

The [Call for Code 2019](https://callforcode.org/) Global Challenge asks teams of developers, designers, data scientists and business analysts to build solutions that significantly improve preparedness for natural disasters and accelerate relief when they hit. This year (2019), we are answering the call and are developing a solution for the many low-literate farmers in mostly developing countries to optimize the use of their limited water supply during times of drought. 

Farmers are the key food providers of the world. Their crops are essential to global human survival and prosperity. Natural disasters, such as droughts, end up affecting farmers and all of us down the line. With increasing fluctuations in global climate, we believe this is a very important problem to tackle.

We have developed **Liquid Prep**, an end-to-end solution for farmers looking to optimize their usage of water; especially during times of drought. The following depicts what our Liquid Prep solution consists of:

<p align="center">
  <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/readme/LiquidPrep-Architecture-new.PNG" alt="liquidPrep-architecture" width ="60%" height="60%">
</p>

-	Soil Moisture Sensor Module <br>
  The Soil Moisture Sendor Module, measures the soil moisture level and transmits the data to Clever Crop App via USB serial connection/Bluetooth.  
- Clever Crop App <br>
  Clever Crop App is designed and developed for users/famers with low literacy to easily understand, interact and get water advice for selected crop in their current location. The App interacts with teh Soil Moisture Sensor Module to get the soil moisture data and IBM Cloud Backend Service to get weather data and crop data to generate watering advise for the selected crop.
-	IBM Cloud Backend Service <br>
  The Backend Service exposes APIs that are handled by Cloud Functions which interacts with Cloudant Database for crop data and The Weather Company APIs for weather data. The Backend Service is hosted on [IBM Cloud](https://www.ibm.com/cloud). 
- [The Weather Company APIs](https://business.weather.com/).

### Get Started

1. Project Setup
    - [Soil Moisture Sensor Module Setup](https://github.com/Call-for-Code/Liquid-Prep/blob/master/soilSensor/User-Manual.pdf)
    - Clever Crop App Setup - coming soon
    - [IBM Cloud Backend Service Setup](https://github.com/Call-for-Code/Liquid-Prep/blob/master/backend/README.md)
2. [Project Roadmap](#project-roadmap)
3. [Contributing](#contributing)

## Project Roadmap

The Liquid Prep solution currently comprises mainly a mobile app, a soil humidity sensor module, and IBM cloud platform for accessing weather and crop data. Our future roadmap adds more functionality to the Liquid Prep platform by <br>
1. Localizing the app
2. Add more crops data
3. Consider soil properties for better water advice.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

Copyright 2019-2020 Liquid Prep

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details
