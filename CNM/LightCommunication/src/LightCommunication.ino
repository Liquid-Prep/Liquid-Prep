/*
 * Project LightCommunication
 * Description: Uses a NeoPixel to send soil moisture data via morse code to a mobile app
 * Author: Christian Chavez
 * Date: March 2021
 */

SYSTEM_MODE(SEMI_AUTOMATIC);

// Note, the neopixel library needs to be installed / imported from the Particle Cloud 
#include <neopixel.h>

#define PIXEL_PIN D2
#define PIXEL_COUNT 12
#define PIXEL_TYPE WS2812B

Adafruit_NeoPixel pixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

unsigned int currentTime;
unsigned int delayTime;
unsigned int cameraTime;
unsigned int morseTime;

int soilRead;
int soilPin=A2;
uint8_t i;
uint8_t n;
uint8_t soil[3];

bool calState=true;
bool cameraState=false;
bool morseState=false;

uint16_t dry,wet; // Variables to store calibration factors

void setup() {
  Serial.begin(9600);
  pinMode(soilPin, INPUT);
  pixel.begin();
  pixel.show();
  pixel.clear();
  pixel.setBrightness(20);
  currentTime=millis();

  dry = EEPROM.read(0x13) << 8 | EEPROM.read(0x14); //get calibration
  wet = EEPROM.read(0x15) << 8 | EEPROM.read(0x16);
  if(dry==0) dry = 3300;
  if(wet==0) wet = 1500;
}

void loop() {
  if(millis()-currentTime>10000){ //sends morse code sequence every 10 seconds
    soilRead = map(analogRead(soilPin),3800,1200,0,100);
    soil[0]=soilRead/100; //calculations for accessing individual characters from soil reading
    soil[1]=((soilRead-(soil[0]*100))/10);
    soil[2]=(soilRead-(soil[0]*100)-(soil[1]*10))%10;
    //soil[3]=(soilRead-(soil[0]*1000)-(soil[1]*100))%10;
    sendMorse();
  }
}
  
void sendMorse(){  //.-. / -.-.- <your message> .-.-. //format for sending messages
  if(calState==true){
    Serial.printf("Soil Read: %i\n",soilRead);
    dot(); dash(); dot(); //calibrate camera brightness
    calState=false;
    cameraState=true;
    cameraTime=millis();
    Serial.printf("Calibrate\n");
  }
  if(millis()-cameraTime>300&&cameraState==true){
   dash(); dot(); dash(); dot(); dash();//gain camera attention
   cameraState=false;
   morseState=true;
   morseTime=millis();
   Serial.printf("Camera\n");
  }
  if(millis()-morseTime>300&&morseState==true){
    for(i=0;i<3;i++){ //loop for sending morse code to neopixel
      Serial.printf("soil[i] = %i i = %i\n",soil[i],i);
      switch (soil[i]){
        case 0:
          dash(); dash(); dash(); dash(); dash(); space(); break;
        case 1:
          dot(); dash(); dash(); dash(); dash(); space(); break;
        case 2:
          dot(); dot(); dash(); dash(); dash(); space(); break;
        case 3:
          dot(); dot(); dot(); dash(); dash(); space(); break;
        case 4:
          dot(); dot(); dot(); dot(); dash(); space(); break;
        case 5:
          dot(); dot(); dot(); dot(); dot(); space(); break;
        case 6:
          dash(); dot(); dot(); dot(); dot(); space(); break;
        case 7:
          dash(); dash(); dot(); dot(); dot(); space(); break;
        case 8:
          dash(); dash(); dash(); dot(); dot(); space(); break;
        case 9:
          dash(); dash(); dash(); dash(); dot(); space(); break;
      }
      if(i==2){
        dot(); dash(); dot(); dash(); dot(); //end of message
        Serial.printf("Over\n");
        currentTime=millis();
        calState=true;
        cameraState=false;
        morseState=false;
      }
    }
  }
}

void dash(){
  unsigned int dashOnTime=millis();
  while(millis()-dashOnTime<300){
    for(n=0;n<=12;n++){
      pixel.setPixelColor(n,255,255,255);
      pixel.show();
    }
  }
  unsigned int dashOffTime=millis();
  while(millis()-dashOffTime<100){
    pixel.clear();
    pixel.show();
  }
}

void dot(){
  unsigned int dotOnTime=millis();
  while(millis()-dotOnTime<100){
    for(n=0;n<=12;n++){
      pixel.setPixelColor(n,255,255,255);
      pixel.show();
    }
  }
  unsigned int dotOffTime=millis();
  while(millis()-dotOffTime<100){
    pixel.clear();
    pixel.show();
  }
}

void space(){
  unsigned int spaceTime=millis();
  while(millis()-spaceTime<300){
    pixel.clear();
    pixel.show();
  }
}