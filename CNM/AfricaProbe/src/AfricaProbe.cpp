/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#include "Particle.h"
#line 1 "/Users/christian/Documents/LiquidPrep/AfricaProbe/src/AfricaProbe.ino"
/*
 * Project: Africa
 * Description: This program reads an analog signal from a capactive
 *              soil moisture sensor. The soil moisture data is then
 *              displayed to an OLED display and uploaded to the 
 *              Adafruit IO dashboard.
 * Author: Christian Chavez, Janel Sanchez, & Saige Martinez
 */

#include <Adafruit_MQTT.h>
#include "Adafruit_MQTT/Adafruit_MQTT.h" 
#include "Adafruit_MQTT/Adafruit_MQTT_SPARK.h" 
#include "Adafruit_MQTT/Adafruit_MQTT.h" 
#include "config.h"
#include "Adafruit_GFX.h"
#include "Adafruit_SSD1306.h"
void setup();
void loop();
void MQTTbegin();
#line 17 "/Users/christian/Documents/LiquidPrep/AfricaProbe/src/AfricaProbe.ino"
#define OLED_RESET D4
Adafruit_SSD1306 display(OLED_RESET);
TCPClient client;
// Adafruit_MQTT_SPARK mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY); 
// Adafruit_MQTT_Publish feed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Africa Soil Moisture");
// Adafruit_MQTT_Subscribe button = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/Africa Button");
const int SOIL_SENSOR = A0;
int soilMoisture;
bool buttonState;
void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  mqtt.subscribe(&button);
  pinMode(SOIL_SENSOR, INPUT);
}
void loop() {
  MQTTbegin();
  soilMoisture = analogRead(SOIL_SENSOR);
  display.clearDisplay();
  display.setRotation(1);
  display.setCursor(0, 0);
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.printf(" %i", soilMoisture);
  display.display();
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(10000))) {
    if(subscription == &button) {
        buttonState = atoi((char *)button.lastread);
        if(buttonState) {
          feed.publish(soilMoisture);
        }
    }
  }
}
void MQTTbegin() {
  int8_t ret;
  if(mqtt.connected()) {
    return;
  }
  Serial.print("Connecting to MQTT... ");
  while((ret = mqtt.connect()) != 0) {
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);
  }
  Serial.println("MQTT Connected!");
}