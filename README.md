# Liquid Prep

Liquid Prep offers an end-to-end solution for farmers looking to optimize their water usage; especially during times of drought. It is specially designed for low-literate farmers in developing countries who also need access to advanced agricultural advice to be successful.

By leveraging the use of an intuitive mobile Android app, local soil sensors, and an advanced agricultural decision platform hosted in the cloud, farmers can be better informed on how to use limited water supplies and increase their chances of growing healthy crop for their small plots of land.

[![Watch the video](https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/thumbnail.png)](https://ibm.box.com/s/tf0kwpszgi2idqvxtj9vk2aw048uu5rs)



## Solution Details

The [Call for Code 2019](https://callforcode.org/) Global Challenge asks teams of developers, designers, data scientists and business analysts to build solutions that significantly improve preparedness for natural disasters and accelerate relief when they hit. This year, we are answering the call and are developing a solution for the many low-literate farmers in mostly developing countries to optimize the use of their limited water supply during times of drought. 

Farmers are the key food providers of the world. Their crops are essential to global human survival and prosperity. Natural disasters, such as droughts, end up affecting farmers and all of us down the line. With increasing fluctuations in global climate, we believe this is a very important problem to tackle.

We have developed **Liquid Prep**, an end-to-end solution for farmers looking to optimize their usage of water; especially during times of drought. The following depicts what our Liquid Prep solution consists of:

<p align="center">
  <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/architecture.png" alt="liquidPrep-architecture" width ="60%" height="60%">
</p>

-	Simple humidity sensor (physical stick) - to make the measurement of the soil humidity much more precise.
-	Use of a cheap Android phone (commonly used in developing countries) - with a GPS. The app is less than 5 megabytes in size; about the same size as a song, and should run on almost any Android phone. 
- Intuitive Android app - so farmers with low literacy skills can understand instructions.
-	Connection to cloud services (from within app). The Java back-end is deployed on [Liberty](https://cloud.ibm.com/catalog/starters/liberty-for-java) hosted on the [IBM Cloud](https://www.ibm.com/cloud).
- Access	to up-to-date weather forecasts via [The Weather Company](https://business.weather.com/), and latest information about crop/soil condition at that location using the [IBM Watson Decision Platform for Agriculture](https://www.ibm.com/blogs/research/2018/09/smarter-farms-agriculture/) (satellite-image based).

**Example workflow:** 
-	Rani, a farmer, walks to the field with her Liquid Prep app installed on her Android phone, and the humidity sensor stick.
<p align="center">
  <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/home+stick.png" alt="liquidPrep-home" width ="40%" height="40%">
</p>

-	The app instructs her, in the local language and with clear pictorial explanations, how to insert the sensor stick into the ground.
<p align="center">
  <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/instructions.png" alt="liquidPrep-instructions">
</p>

-	The stick’s sensor reading is transferred to the app on her phone (via NFC).
-	As soon as the reading is successful, the app will connect to the Cloud where the watering advice is computed. *The watering recommendation is computed by taking into account the specific farm’s soil moisture (using the humidity sensor stick) and combining this information with local weather forecasts and other agricultural metrics in the cloud.*
-	The Android app provides the farmer with up-to-date suggestions and recommendations about the best day/time to water their particular crops to increase the chances of having a successful yield. *For example, if the soil moisture is currently normal and rain is expected tomorrow, the app may recommend the farmer to save his/her water and not water their crops today.*
<p align="center">
  <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/suggestions.png" alt="liquidPrep-suggestions">
</p>


## Solution Roadmap

The Liquid Prep solution currently features a mobile Android app, a soil humidity sensor, and a cloud platform for compiling data and decision making. Our future roadmap adds more functionality to the Liquid Prep platform by improving the ease-of-use of the app, using the Internet of Things technologies, and leveraging the use of the [IBM Watson Decision Platform for Agriculture](https://www.ibm.com/blogs/research/2018/09/smarter-farms-agriculture/).

### Ease of use

Since a large focus of ours is to empower farmers which may not be as technologically literate, we plan to incorporate an AI translation system into our front-end mobile app so that the abundance of help/instruction features that are currently present in the app can be geographically aware and adapted to the local language the farmers may use.

We also plan to add the functionality for farmers to take pictures of their crop and upload it to the Liquid Prep platform. Using the [Watson Visual Recognition](https://www.ibm.com/watson/services/visual-recognition/) image processing service that leverages the use of machine learning, we can better judge the state of the crop and improve the watering recommendation confidence level. Additionally, by being able to understand the current crop state via images, we could enhance the illustrations for the action items in our app to reflect the farmers current crop growth stage. 

For example, crop growth stages could be depicted in the app as follows:
<p align="center">
  <img src="https://github.com/Code-and-Response/Liquid-Prep/blob/master/images/explanation.png" alt="liquidPrep-explanation">
</p>

### Internet of Things

The **soil humidity** and **NFC** (near field communication) sensors should cost less than $65 CAD for the entire setup. This includes the following:
- [Kuman Soil Moisture Sensor Kit](https://www.amazon.com/gp/product/B071F4RDHY/ref=as_li_ss_tl?ie=UTF8&linkCode=sl1&tag=piddlerinther-20&linkId=77f1c0f9c67c51d76b687628afa62ce1&language=en_US)
- [Microchip - MCP3008-I/P 10-Bit ADC with SPI](https://www.amazon.com/Microchip-MCP3008-I-10-Bit-ADC-Pack/dp/B011NA0IKC/ref=sr_1_9?imprToken=gAkYZ3Eh54LbdXwi59Ju0Q&keywords=MCP3008&linkCode=w61&qid=1559942788&s=gateway&slotNum=1&sr=8-9)
- [PAXCOO Breadboard kit with Jumper wires](https://www.amazon.com/Paxcoo-Breadboards-Arduino-Circboard-Prototyping/dp/B0727X6N9D/ref=sr_1_6?keywords=breadboard&qid=1559942862&s=gateway&sr=8-6)
- [Raspberry Pi 3 B+ Motherboard](https://www.amazon.com/ELEMENT-Element14-Raspberry-Pi-Motherboard/dp/B07BDR5PDW/ref=sr_1_3?crid=USARW4OM6ZQ2&keywords=raspberry+pi+3+b%2B&qid=1561638882&s=gateway&sprefix=raspberry%2Caps%2C222&sr=8-3)
- [RFID Module V3 Kit Near Field Communication Module](https://www.amazon.com/Gowoops-Module-Field-Communication-Android/dp/B0746GB1RQ/ref=sr_1_10?keywords=PN532+for+raspberry&qid=1559943889&s=gateway&sr=8-10)

The sensor measures the volumetric content of water in soil and presents the moisture value in voltage (0-3.3 V). It sends the analog signals to a microchip via the breadboard. The breadboard acts as an interface between the sensor, microchip and the Raspberry Pi.
We are using a microchip to convert the analog signal of the sensor to digital as the Raspberry Pi can’t process the analog signals. The microchip produces output values from a range of 0-1023 (0 represent 0V and 1023 represents 3.3V). The output value from the microchip is sent to the Raspberry Pi via the breadboard. The Raspberry Pi will process the microchip value and output the moisture content in percentage value. Finally, we send the moisture percentage value to the Android device via RFID/NFC module.

### IBM Watson Decision Platform for Agriculture

Our solution roadmap also adds more functionality to the Liquid Prep platform by leveraging the use of IBM’s [Watson Decision Platform for Agriculture](https://www.ibm.com/blogs/research/2018/09/smarter-farms-agriculture/) which harnesses the power of predictive analytics, artificial intelligence, and the other Internet of Things sensors. This will allow us to incorporate much more data such as satellite imagery for monitoring crop health (specific to a farmer’s particular crop), advanced models for computing soil moisture and weather behaviour, and an advanced AI decision framework to act on all the available information.


### Mock Water Advice API

The webservice to GET mock water advice is deployed on a tomcat server running on a IBM Fyre VM. The link to GET mock water advice is http://9.21.108.205:8080/liquidPrep/api/waterAdvice.

#### NOTE: To access the link to GET mock water advice, you need to be connected on an IBM network.


### License

This project is licensed under the Apache 2 License - see the LICENSE.md file for details
