/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#line 1 "/Users/christian/Documents/LiquidPrep/BLESend/src/BLESend.ino"
/*
 * Project BLESend
 * Description: Example of sending UART data over BLE
 * Author: Brian Rashap
 * Date: 2-MAR-2021
 */

#include "Particle.h"

void setup();
void loop();
void onDataReceived(const uint8_t* data, size_t len, const BlePeerDevice& peer, void* context);
#line 10 "/Users/christian/Documents/LiquidPrep/BLESend/src/BLESend.ino"
const size_t UART_TX_BUF_SIZE = 20;
uint8_t txBuf[UART_TX_BUF_SIZE];
size_t txLen;
uint8_t i;

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
 
    BLE.on();
    Serial.printf("Argon BLE Address: %s\n",BLE.address().toString().c_str());

    BLE.addCharacteristic(txCharacteristic);
    BLE.addCharacteristic(rxCharacteristic);
    data.appendServiceUUID(serviceUuid);
    BLE.advertise(&data);
}

void loop() {
    for(i=0;i<UART_TX_BUF_SIZE-1;i++) {
        txBuf[i] = random(64,91); //Captial ASCII characters plus @
    }
    txBuf[UART_TX_BUF_SIZE-1]=13;
    txCharacteristic.setValue(txBuf, UART_TX_BUF_SIZE);
    for(i=0;i<UART_TX_BUF_SIZE;i++) {
        Serial.printf("%c",txBuf[i]);
    }
    Serial.printf("\n");
    delay(5000);
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