/*
 * Project: Africa
 * Description: This program reads an analog signal from a capactive
 *              soil moisture sensor. The soil moisture data is then
 *              displayed to an OLED display, sent to a mobile device via bluetooth,
 *              and uploaded to the Adafruit IO dashboard.
 * Author: Christian Chavez, Janel Sanchez, Saige Martinez, and Brian Rashap
 */

// From the Particle Cloud - install Adafruit_MQTT and Adafruit_SSD1306 to enable the below
#include <Adafruit_MQTT.h>
#include "Adafruit_MQTT/Adafruit_MQTT.h" 
#include "Adafruit_MQTT/Adafruit_MQTT_SPARK.h" 
#include "Adafruit_MQTT/Adafruit_MQTT.h" 
#include <Adafruit_SSD1306.h>
#include "Particle.h"
#include "credentials.h"

#define OLED_RESET D4
Adafruit_SSD1306 display(OLED_RESET);

TCPClient client;
Adafruit_MQTT_SPARK mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY); //feed data for Adafruit.io online dashboard
Adafruit_MQTT_Publish feed1 = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Soil Moisture Mapped");
Adafruit_MQTT_Publish feed2 = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Soil Moisture");
Adafruit_MQTT_Subscribe button = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/Africa Button");

const int SOIL_SENSOR = A4; //analog pin to read input from soil moisture sensor
int soilRead;
bool buttonState;

const size_t UART_TX_BUF_SIZE = 4;
uint8_t txBuf[UART_TX_BUF_SIZE];
size_t txLen;
uint8_t i;
uint8_t soil[4];
uint8_t txSoil[4];

unsigned int currentTime;
unsigned int currentTimeTwo;
unsigned int currentTimeThree;

const BleUuid serviceUuid("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid rxUuid("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid txUuid("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

BleCharacteristic txCharacteristic("tx", BleCharacteristicProperty::NOTIFY, txUuid, serviceUuid);
BleCharacteristic rxCharacteristic("rx", BleCharacteristicProperty::WRITE_WO_RSP, rxUuid, serviceUuid, onDataReceived, NULL);
BleAdvertisingData data;

// Variables to store calibration factors
uint16_t dry,wet;

SYSTEM_THREAD(ENABLED);

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C); //initializes the OLED display
  mqtt.subscribe(&button); //begins subscription to virtual button Adafruit.io dashboard
  pinMode(SOIL_SENSOR, INPUT);
  currentTime = millis();
  BLE.on(); //intializes the Particle Argon's bluetooth connection
  Serial.printf("Argon BLE Address: %s\n",BLE.address().toString().c_str()); 

  BLE.addCharacteristic(txCharacteristic);
  BLE.addCharacteristic(rxCharacteristic);
  data.appendServiceUUID(serviceUuid);
  BLE.advertise(&data);

  // get calibration
  dry = EEPROM.read(0x13) << 8 | EEPROM.read(0x14);
  wet = EEPROM.read(0x15) << 8 | EEPROM.read(0x16);
  if(dry==0) dry = 3300;
  if(wet==0) wet = 1500;

  display.setRotation(0);
  display.setCursor(0, 0);
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.display();
  delay(2000);

  currentTime=millis();
  currentTimeTwo=millis();
  currentTimeThree=millis();
}

void loop() {

  MQTTbegin();
  //soilRead = analogRead(SOIL_SENSOR); //reads analog value from soil sensor
  soilRead = map(analogRead(SOIL_SENSOR),dry,wet,0,100);
  Adafruit_MQTT_Subscribe *subscription; //publishes sensor data to Adafruit.io dashboard when virtual button is pressed
  while ((subscription = mqtt.readSubscription(1000))) {
    if(subscription == &button) {
        buttonState = atoi((char *)button.lastread);
        if(buttonState) {
          soilRead = map(analogRead(SOIL_SENSOR),3600,1000,0,100);
          feed1.publish(soilRead);
          feed2.publish(analogRead(SOIL_SENSOR));
        }
    }
  }
  if(millis()-currentTime>1000){
      soilRead = map(analogRead(SOIL_SENSOR),3600,1000,0,100);
      display.clearDisplay();
      display.setCursor(0, 0);
      display.printf("Moisture\nLevel:\n%i%c", soilRead,char(37));
      display.display();
      currentTime = millis();
  }

  if(millis()-currentTimeTwo>5000){
      soilRead = analogRead(SOIL_SENSOR);
      soilRead = map(analogRead(SOIL_SENSOR),3600,1000,0,100);
      soil[0]=soilRead/100; //calculations for accessing individual characters from soil reading
      soil[1]=((soilRead-(soil[0]*100))/10);
      soil[2]=(soilRead-(soil[0]*100)-(soil[1]*10))%10;
      // soil[0] = soilRead/1000; //calculations for accessing raw sensor data
      // soil[1] = ((soilRead-(soil[0]*1000))/100);
      // soil[2] = (soilRead-(soil[0]*1000)-(soil[1]*100))/10;
      // soil[3] = (soilRead-(soil[0]*1000)-(soil[1]*100))%10;
      for(i=0;i<4;i++){
          Serial.printf("Real Read: %i Soil Read: %i%\n", soilRead, soil[i]);
      }
      for(i=0;i<3;i++){
          txSoil[i] = soil[i]+0x30;
      }
      txCharacteristic.setValue(txSoil, 4); //sends sensor hexadecimal data to BlueFruit app
      currentTimeTwo = millis();
  }

  if(millis()-currentTimeThree>30000){
      soilRead = map(analogRead(SOIL_SENSOR),3600,1000,0,100);
      feed1.publish(soilRead);
      feed2.publish(analogRead(SOIL_SENSOR));
      Serial.printf("Published to Adafruit.io Dashboard...\n");
      display.clearDisplay();
      display.setCursor(0, 0);
      display.printf("Moisture\nLevel:\n%i%c\nUploading",soilRead,char(37));
      display.display();
      currentTimeThree = millis();
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
       display.clearDisplay();
       display.setCursor(0, 0);
       display.printf("Connecting\nto MQTT...\n");
       display.display();
       mqtt.disconnect();
       delay(5000);
  }
  Serial.println("MQTT Connected!");
  display.clearDisplay();
  display.setCursor(0, 0);
  display.printf("MQTT\nConnected!");
  display.display();
}

void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) { //prints text received from BlueFruit mobile app
    size_t i;
    Serial.printf("Received data from: %02X:%02X:%02X:%02X:%02X:%02X \n", peer.address()[0], peer.address()[1],peer.address()[2], peer.address()[3], peer.address()[4], peer.address()[5]);
    display.clearDisplay();
    display.setCursor(0, 0);
    for (i = 0; i < len; i++) {
        Serial.printf("%c",data[i]);
        display.printf("%c",data[i]);
        display.display();
    }
    Serial.printf("\n");
    delay(3000);
}