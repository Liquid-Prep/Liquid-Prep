#include "Adafruit_MQTT_SPARK.h"
#include "Adafruit_MQTT.h"

/************************* Adafruit.io Setup *********************************/

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883                   // use 8883 for SSL
#define AIO_USERNAME    "...your AIO username (see https://accounts.adafruit.com)..."
#define AIO_KEY         "...your AIO key..."

/************ Global State (you don't need to change this!) ******************/
TCPClient TheClient;

// Setup the MQTT client class by passing in the WiFi client and MQTT server and login details.
Adafruit_MQTT_SPARK mqtt(&TheClient,AIO_SERVER,AIO_SERVERPORT,AIO_USERNAME,AIO_KEY);

/****************************** Feeds ***************************************/

// Setup a feed called 'photocell' for publishing.
// Notice MQTT paths for AIO follow the form: <username>/feeds/<feedname>
Adafruit_MQTT_Publish photocell = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/photocell");

// Setup a feed called 'onoff' for subscribing to changes.
Adafruit_MQTT_Subscribe onoffbutton = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/onoff");

/*************************** Sketch Code ************************************/
int x = 0;
void setup()
{
    Serial.begin(115200);
    delay(10);
    
    Serial.println(F("Adafruit MQTT demo"));
    
    // Setup MQTT subscription for onoff feed.
    mqtt.subscribe(&onoffbutton);
}

void loop()
{
    if( mqtt.Update() )
    {
        // this is our 'wait for incoming subscription packets' busy subloop
        // try to spend your time here
        Adafruit_MQTT_Subscribe *subscription;
        while ((subscription = mqtt.readSubscription(5000)))
        {
            if (subscription == &onoffbutton)
            {
                Serial.print(F("Got: "));
                Serial.println((char *)onoffbutton.lastread);
            }
        }
        
        // Now we can publish stuff!
        Serial.print(F("\nSending photocell val "));
        Serial.print(x);
        Serial.print("...");
        if (!photocell.publish(x++))
        {
            Serial.println(F("Failed"));
        }
        else
        {
            Serial.println(F("OK!"));
        }
  
        // ping the server to keep the mqtt connection alive
        // NOT required if you are publishing once every KEEPALIVE seconds
        /*
        if(! mqtt.ping())
        {
            mqtt.disconnect();
        }
        */
    }
}








