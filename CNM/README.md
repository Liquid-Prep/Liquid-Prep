![DeepDive Image](images/dd.jpg)

# IoT Bootcamp: Liquid Prep Soil Moisture Monitor

### The goal of this project is to develop a smart, internet connected soil moisture sensor to be integrated into IBM's Liquid Prep app. To do this, recent IoT Bootcamp graduates developed code for Particle Gen 3 microcontrollers to communicate analog data from a capacitive soil moisture sensor data via bluetooth and WiFi. The Adafruit BlueFruit app for iOS and Android is used to receive UART bluetooth data. Also, data is visualized on an Adafruit.io dashboard which allows the user to track soil moisture over time.

![closeup](images/SensorCloseUp.jpg)

## The Platform

The Soil Moisture probe was developed on Particle's Boron development platform. The featherwing-compatible development board was selected for its integrated cellular and bluetooth connectivity, which allows for multiple avenues of data transfer between the probe and the Liquid-Prep application. In addition, the Boron has a readily available LiPo battery connection to enable the device to work in a fully wireless mode. 

![Boron_Image](images/boron.jpg)

Coding for the current iteration of the soil moisture probe was done using the Particle Workbench extension for VSCode.

![workbench](images/workbench.png)


## The Soil Probe

The  Moisture Probe is created around a simple capacitive soil moisture sensor ( <$3 USD). It is wired into an analog input on of the Boron system. In addition, a low cost display is added to the system to allow a user to directly read the soil moisture measuremet. The sensor provides a unitless integer representation of the moisture (a lower value wetter, a higher value drier). This would need to be calibrated to specific situations. 

![Schematic](images/SensorSchematic.jpg)

### Soil penentration device

The capacitive sensor is attached to a metal penetration that can be pushed into the soil by stepping on a platorm near the base. The pentration device was cut from 0.25 inch steel on a Torchmate CNC Plasma Table. The /Torchmate folder in this respository includes the files to plasma cut the penetration device. 

![SoilProbe](images/Probe.jpg)

### Electronics holder
Additionally, the students designed and 3D printed a smartphone holder that can be placed at the top of the penetration pole, holding the electronics and display. The .stl files for the 3D prints are included the /3D Print folder in this repository.

![3DB](images/3DPrintBottomView.jpg)

![3DT](images/3DPrintTopView.jpg)

## Data Transfer

### BLE
The Boron microcontroller sends the soil moisture data over BLE via a UART stream. This data can be read by a future Liquid-Prep application allowing it directly get data from the probe. Sample data is seen below using the Bluefruit smartphone app.

![ble](images/BluefruitUART.jpg)

### Adafruit.io
Additionally, the Boron microcontroller sends the soil moisture data to an Adafruit.io dashboard via its cellular connection. This allows for easy visualization of the moisture data.  

![adafruitio](images/AdafruitDashboard.jpg)

## About the Students

The original work was created by students of Central New Mexico Community College's Internet of Things Deep Dive bootcamp (www.cnm.edu/deepdive). Since graduating, the two students have continued to work with IBM's Call for Code Liquid-Prep team to add functionality and connectivity, as well as improve upon the physical components. 

### Janel Sanchez

A student from the Deep Dive Internet of Things Cohort 3, which allowed her the opportunity to learn the fundamentals of creating and coding smart connected devices. Coming from a medical background and a strong passion to help in her community, Janel seeks to find opportunities that aid in kindness and positive change. By taking the bootcamp she was able to incorporate new STEM skills that she hopes to pass on to future generations.

In this project she was able to contribute in the planning of the project as well as design from the beginning to end stages. From incorporation code previously learned in the bootcamp to cutting and welding metal pieces together and powder coating them, she enjoyed being able to be part of a team that is set out to make a difference in the world.


### Christian Chavez

Christian is a recent graduate of CNM Ingenuity's Internet of Things Coding and Hardware Design bootcamp. He is currently working as a Technical Resident at CNM's Technology Solutions Labs under the direction of Dr. Brian Rashap. Christian helped to write code and design hardware for the Liquid Prep Soil Moisture Project.

### Brian Rashap (Professor)

Janel and Christian worked on this project under the guidance of Dr. Brian Rashap. Brian is a workforce development instructor focused on training the next generation of Internet of Things professionals. 

##
##
##


![TSL Image](images/TSL.jpg)


