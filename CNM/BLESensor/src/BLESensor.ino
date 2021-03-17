/*
 * Project BLESend
 * Description: Example of sending UART data over BLE
 * Author: Brian Rashap and Christian Chavez
 * Date: 10-MAR-2021
 */

#include "Particle.h"

const size_t UART_TX_BUF_SIZE = 4;
uint8_t txBuf[UART_TX_BUF_SIZE];

size_t txLen;
uint8_t i;

const int soilPin = A2;
int soilRead;

unsigned int currentTime;

uint8_t soil[4];
uint8_t txSoil[4];

// These UUIDs were defined by Nordic Semiconductor and are now the defacto standard for
// UART-like services over BLE. Many apps support the UUIDs now, like the Adafruit Bluefruit app.
const BleUuid serviceUuid("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid rxUuid("6E400002-B5A3-F393-E0A9-E50E24DCCA9E");
const BleUuid txUuid("6E400003-B5A3-F393-E0A9-E50E24DCCA9E");

BleCharacteristic txCharacteristic("tx", BleCharacteristicProperty::NOTIFY, txUuid, serviceUuid);
BleCharacteristic rxCharacteristic("rx", BleCharacteristicProperty::WRITE_WO_RSP, rxUuid, serviceUuid, onDataReceived, NULL);
BleAdvertisingData data;

SYSTEM_MODE(SEMI_AUTOMATIC); //Using BLE and not Wifi

void setup() { 
    Serial.begin();
    delay(1000);
    
    pinMode(soilPin, INPUT);

    currentTime = millis();

    BLE.on();
    Serial.printf("Argon BLE Address: %s\n",BLE.address().toString().c_str());

    BLE.addCharacteristic(txCharacteristic);
    BLE.addCharacteristic(rxCharacteristic);
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);
}

void loop() {

  if(millis()-currentTime>5000){
      soilRead = analogRead(soilPin);
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

//onDataReceived is used to recieve data from Bluefruit Connect App
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context) {
    size_t i;
    Serial.printf("Received data from: %02X:%02X:%02X:%02X:%02X:%02X \n", peer.address()[0], peer.address()[1],peer.address()[2], peer.address()[3], peer.address()[4], peer.address()[5]);
    for (i = 0; i < len; i++) {
        Serial.printf("%c",data[i]);
    }
    Serial.printf("\n");
}