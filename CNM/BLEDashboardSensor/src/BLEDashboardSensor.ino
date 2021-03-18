/*
 * Project: Africa
 * Description: This program reads an analog signal from a capactive
 *              soil moisture sensor. The soil moisture data is then
 *              displayed to an OLED display, sent to a mobile device via bluetooth,
 *              and uploaded to the Adafruit IO dashboard.
 * Author: Christian Chavez
 */

#include <Adafruit_MQTT.h>
#include "Adafruit_MQTT/Adafruit_MQTT.h" 
#include "Adafruit_MQTT/Adafruit_MQTT_SPARK.h" 
#include "Adafruit_MQTT/Adafruit_MQTT.h" 
#include <Adafruit_SSD1306.h>
#include "Particle.h"
#include "config.h"

#define OLED_RESET D4
Adafruit_SSD1306 display(OLED_RESET);

TCPClient client;
Adafruit_MQTT_SPARK mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY); 
Adafruit_MQTT_Publish feed = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/Africa Soil Moisture");
Adafruit_MQTT_Subscribe button = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/Africa Button");

const int SOIL_SENSOR = A2;
int soilRead;
bool buttonState;

const size_t UART_TX_BUF_SIZE = 4;
uint8_t txBuf[UART_TX_BUF_SIZE];
size_t txLen;
uint8_t i;
uint8_t soil[4];
uint8_t txSoil[4];

unsigned int currentTime;

const BleUuid serviceUuid("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid rxUuid("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid txUuid("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

BleCharacteristic txCharacteristic("tx", BleCharacteristicProperty::NOTIFY, txUuid, serviceUuid);
BleCharacteristic rxCharacteristic("rx", BleCharacteristicProperty::WRITE_WO_RSP, rxUuid, serviceUuid, onDataReceived, NULL);
BleAdvertisingData data;

void setup() {
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  mqtt.subscribe(&button);
  pinMode(SOIL_SENSOR, INPUT);
  currentTime = millis();
  BLE.on();
  Serial.printf("Argon BLE Address: %s\n",BLE.address().toString().c_str());

  BLE.addCharacteristic(txCharacteristic);
  BLE.addCharacteristic(rxCharacteristic);
  data.appendServiceUUID(serviceUuid);
  BLE.advertise(&data);
}

void loop() {
  MQTTbegin();
  soilRead = analogRead(SOIL_SENSOR);
  display.clearDisplay();
  display.setRotation(1);
  display.setCursor(0, 0);
  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.printf(" %i", soilRead);
  display.display();
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(10000))) {
    if(subscription == &button) {
        buttonState = atoi((char *)button.lastread);
        if(buttonState) {
          feed.publish(soilRead);
        }
    }
  }
  
  if(millis()-currentTime>5000){
      soilRead = analogRead(SOIL_SENSOR);
      soil[0] = soilRead/1000;
      soil[1] = ((soilRead-(soil[0]*1000))/100);
      soil[2] = (soilRead-(soil[0]*1000)-(soil[1]*100))/10;
      soil[3] = (soilRead-(soil[0]*1000)-(soil[1]*100))%10;

      for(i=0;i<4;i++){
          Serial.printf("Real Read: %i Soil Read: %i\n", soilRead, soil[i]);
      }
      for(i=0;i<4;i++){
          txSoil[i] = soil[i]+0x30;
      }
      txCharacteristic.setValue(txSoil, 4);  ///char itoa(int)
      currentTime = millis();
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

void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    size_t i;
    Serial.printf("Received data from: %02X:%02X:%02X:%02X:%02X:%02X \n", peer.address()[0], peer.address()[1],peer.address()[2], peer.address()[3], peer.address()[4], peer.address()[5]);
    for (i = 0; i < len; i++) {
        Serial.printf("%c",data[i]);
    }
    Serial.printf("\n");
}