// The MIT License (MIT)
//
// Copyright (c) 2015 Adafruit Industries
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
#include "Adafruit_MQTT_SPARK.h"

bool Adafruit_MQTT_SPARK::Update()
{
    // Stop if already connected.
    if (!connected())
    {
        DEBUG_PRINT(F("Connecting to MQTT... "));
        
        uint8_t retries = 0;
        for(int8_t ret = connect() ; ret != 0 && retries < 3 ; ret = connect() , retries++)
        { // connect will return 0 for connected
            DEBUG_PRINT(connectErrorString(ret));
            DEBUG_PRINT(F("Retrying MQTT connection in 5 seconds..."));
            disconnect();
            delay(5000);  // wait 5 seconds
        }
      
        if( connected() )
        {
            DEBUG_PRINT(F("MQTT Connected"));
        }
        else
        {
            DEBUG_PRINT(F("Failed to connect"));
            return false;
        }
    }
    return true;
}

bool Adafruit_MQTT_SPARK::connectServer(){
  // Grab server name from flash and copy to buffer for name resolution.
  memset(buffer, 0, sizeof(buffer));
  strcpy((char *)buffer, servername);
  DEBUG_PRINT(F("Connecting to: ")); DEBUG_PRINTLN((char *)buffer);
  // Connect and check for success (0 result).
  int r = client->connect((char *)buffer, portnum);
  DEBUG_PRINT(F("Connect result: ")); DEBUG_PRINTLN(r);
  return r != 0;
}

bool Adafruit_MQTT_SPARK::disconnectServer() {
  // Stop connection if connected and return success (stop has no indication of
  // failure).
  if (client->connected()) {
    client->stop();
  }
  return true;
}

bool Adafruit_MQTT_SPARK::connected() {
  // Return true if connected, false if not connected.
  return client->connected();
}

uint16_t Adafruit_MQTT_SPARK::readPacket(uint8_t *buffer, uint16_t maxlen,
                                          int16_t timeout) {
  /* Read data until either the connection is closed, or the idle timeout is reached. */
  uint16_t len = 0;
  int16_t t = timeout;

  while (client->connected() && (timeout >= 0)) {
    //DEBUG_PRINT('.');
    while (client->available()) {
      //DEBUG_PRINT('!');
      char c = client->read();
      timeout = t;  // reset the timeout
      buffer[len] = c;
      //DEBUG_PRINTLN((uint8_t)c, HEX);
      len++;
      if (len == maxlen) {  // we read all we want, bail
        DEBUG_PRINT(F("Read data:\t"));
        DEBUG_PRINTBUFFER(buffer, len);
        return len;
      }
    }
    timeout -= MQTT_CLIENT_READINTERVAL_MS;
    delay(MQTT_CLIENT_READINTERVAL_MS);
  }
  return len;
}

bool Adafruit_MQTT_SPARK::sendPacket(uint8_t *buffer, uint16_t len) {
  uint16_t ret = 0;

  while (len > 0) {
    if (client->connected()) {
      // send 250 bytes at most at a time, can adjust this later based on Client

      uint16_t sendlen = min(len, 250);
      //Serial.print("Sending: "); Serial.println(sendlen);
      ret = client->write(buffer, sendlen);
      DEBUG_PRINT(F("Client sendPacket returned: ")); DEBUG_PRINTLN(ret);
      len -= ret;

      if (ret != sendlen) {
	DEBUG_PRINTLN("Failed to send packet.");
	return false;
      }
    } else {
      DEBUG_PRINTLN(F("Connection failed!"));
      return false;
    }
  }
  return true;
}
