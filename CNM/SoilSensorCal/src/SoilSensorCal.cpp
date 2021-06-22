/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "c:/Users/IoT_Instructor/Documents/TSL/Liquid-Prep/CNM/SoilSensorCal/src/SoilSensorCal.ino"
/*
 * Project SoilSensorCal
 * Description: Calibration program for capacitive soil sensor
 * Author: Brian Rashap
 * Date: 19-MAY-2021
 */

void setup();
void loop();
#line 8 "c:/Users/IoT_Instructor/Documents/TSL/Liquid-Prep/CNM/SoilSensorCal/src/SoilSensorCal.ino"
const int SOILSENSOR = A2; //analog pin to read input from soil moisture sensor
const int BUTTONPIN = D2;
int soilRead;
bool buttonState;

// Variables to store calibration factors
uint16_t dry,wet;

void setup() {
  Serial.begin(9600);
  waitFor(Serial.isConnected, 5000); //wait 5 seconds for Serial Monitor to connect

  pinMode(SOILSENSOR, INPUT);
  pinMode(BUTTONPIN, INPUT_PULLDOWN);

  Serial.printf("Wipe off probe and leave in dry air, press button\n");
  while(!BUTTONPIN);  //wait for button to be pressed
  dry = analogRead(SOILSENSOR);
  Serial.printf("Dry Cal Factor = %i\n",dry);

  Serial.printf("Place sensor in water, press button\n");
  while(!BUTTONPIN);  //wait for button to be pressed
  wet = analogRead(SOILSENSOR);
  Serial.printf("Wet Cal Factor = %i\n",wet);

  // write calibration
  EEPROM.write(0x13,dry>>8);
  EEPROM.write(0x14,dry & 0x00FF);
  EEPROM.write(0x15,dry>>8);
  EEPROM.write(0x16,dry & 0x00FF);

  Serial.printf("Calibration factors saved to EEPROM \n");
}

void loop() {}