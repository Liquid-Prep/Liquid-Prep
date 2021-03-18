#include <Arduino.h>
#include <stdlib.h>
#include <String.h>

//Ubidots account data
String token = "  ";      //your token to post value
String temp_id="  ";                                 //ID of your temperature variable
String hum_id="  ";                                 //ID of your humidity variable
String soil_id="  ";                                 //ID of your soil variable
String light_id="  ";                             //ID of your light variable

//sensor output connections
const int light_out = A0;
const int soil_out = A1;
const int temp_out = A2;
const int hum_out = A3;

float temp=0,hum=0;
int soil,light;

void ShowSerialData()
{
  while(Serial2.available()!=0)
  Serial.write(Serial2.read());
}

//this function is to send the sensor data to Ubidots, you should see the new value in Ubidots after executing this function
void save_value(String payload)
{
   String le;                                               // length of the payload in characters
   le = String(payload.length());      //this is to calcule the length of payload 
    
  for(int i = 0;i<7;i++)
  {
    Serial2.println("AT+CGATT?");                                                   //this is made repeatedly because it is unstable
    delay(2000);
    ShowSerialData();
  }
  
  Serial2.println("AT+CSTT=\"http://internet.tatadocomo.com\"");                                    //replace with your providers' APN
  delay(1000);
  ShowSerialData();
  Serial2.println("AT+CIICR");                                                      //bring up wireless connection
  delay(3000);
  ShowSerialData();
  Serial2.println("AT+CIFSR");                                                      //get local IP adress
  delay(2000);
  ShowSerialData();
  Serial2.println("AT+CIPSPRT=0");
  delay(3000);
  ShowSerialData();
  Serial2.println("AT+CIPSTART=\"tcp\",\"things.ubidots.com\",\"80\"");             //start up the connection
  delay(3000);
  ShowSerialData();
  Serial2.println("AT+CIPSEND");                                                    //begin send data to remote server
  delay(3000);
  ShowSerialData();
  Serial2.print(F("POST /api/v1.6/collections/values/?token="));
  delay(100);
  ShowSerialData();
  Serial2.print(token);
  delay(100);
  ShowSerialData();
  Serial2.println(F(" HTTP/1.1"));
  delay(100);
  ShowSerialData();
  Serial2.println(F("Content-Type: application/json"));
  delay(100);
  ShowSerialData();
  Serial2.print(F("Content-Length: "));
  Serial2.println(le);
  delay(100);
  ShowSerialData();
  Serial2.print(F("Host: "));
  Serial2.println(F("things.ubidots.com"));
  Serial2.println(); 
  delay(100);
  ShowSerialData();
  Serial2.println(payload); 
  Serial2.println();
  delay(100);
  ShowSerialData();
  Serial2.println((char)26);
  delay(7000);
  Serial2.println();
  ShowSerialData();
  Serial2.println("AT+CIPCLOSE");                                                //close the communication
  delay(1000);
  ShowSerialData();
}


void setup()
{
  Serial2.begin(9600);                                                             //sim 900 coonected to serial2 of GR-Kaede at 9600 baud rate
  Serial.begin(9600);                                                              //serial communication baud rate
  
  delay(2000);
}

void loop()
{
  int cnt=0;
  String payload;                                           //Variable to collect all sensor data for data upload on Webserver
  
  if (Serial2.available())
  {
  Serial.write(Serial2.read());
  }
    
    temp = analogRead(temp_out);                                                     
    temp = map(temp, 0 , 1023, 0, 100);
    Serial.print("temp = ");
    Serial.println(temp);
    
    hum = analogRead(hum_out);                                                     
    hum = map(hum, 0 , 1023, 0, 100);
    Serial.print("hum = ");
    Serial.println(hum);
  
    soil = analogRead(soil_out);                                                     
    soil = map(soil, 0 , 1023, 0, 100);
    Serial.print("soil = ");
    Serial.println(soil);
    
    light = analogRead(light_out);                                                     
    light = map(light, 0 , 1023, 0, 100);
    Serial.print("light = ");
    Serial.println(light);

   while(cnt<5)
   {
   Serial.println();
   Serial.println("Uploading Sensors Data to Ubidots Cloud Service");
   payload = "[{\"variable\":\"" + temp_id + "\",\"value\":"+ String(temp)+"},{\"variable\":\""+ hum_id+ "\",\"value\":" + String(hum) + "},{\"variable\":\"" +soil_id+ "\",\"value\":" + String(soil) + "},{\"variable\":\"" + light_id + "\",\"value\":" + String(light) + "}]";
   save_value(payload);                                                      //call the save_value function
   cnt++;
   delay(20000);
    
    temp = analogRead(temp_out);                                                     
    temp = map(temp, 0 , 1023, 0, 100);

    hum = analogRead(hum_out);                                                     
    hum = map(hum, 0 , 1023, 0, 100);
  
    soil = analogRead(soil_out);                                                     
    soil = map(soil, 0 , 1023, 0, 100);
    
    light = analogRead(light_out);                                                     
    light = map(light, 0 , 1023, 0, 100);
   }
   
   //Delay for 90 seconds
   delay(45000);
   delay(45000);
}
