
#include "Adafruit_SSD1306.h"
#include "Adafruit_GFX.h"


/* ============== MAIN =====================*/

 //Use I2C with OLED RESET pin on D4
 #define OLED_RESET D4
 Adafruit_SSD1306 oled(OLED_RESET);


 unsigned long previousMillis;
 unsigned long interval = 30000;

 void setup() {
  // by default, we'll generate the high voltage from the 3.3v line internally! (neat!)
  oled.begin(SSD1306_SWITCHCAPVCC, 0x3D);  // initialize with the I2C addr 0x3D (for the 128x64)
  // init done     
     
  oled.display(); // show splashscreen

  Serial.begin(9600);
  Serial.println("Waiting...");
  Spark.function("surf",surf);
}

void loop() {
  unsigned long currentMillis = millis();
  
  if(currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;
    Spark.publish("refresh","2456");
    Serial.println("Refreshing...");
  }
}

int surf(String args) {
  char c;
  char d = '/';
  int i;
  int current_line = 0;
  int current_col = 0;
  oled.clearDisplay();
  //String decoded;
  urlDecode(args);
  
  Serial.print("Received: ");
  Serial.println(args);
  
  Serial.print("Size: ");
  Serial.println(args.length());
  for( i = 0; i < args.length(); i++ ) {
      c = args.charAt(i);
        if( c == d ) {
          current_line++;
          current_col = 0;
      } else {
          Serial.println(c);
          current_col++;
      }
  }
  return 1;
}

void urlDecode(String &input)
{
  input.trim();
  input.replace("%20", " ");
  input.replace("+", " ");
  input.replace(".", "mph");
  input.replace("@", "ft ");
  input.replace("_", "");
  input.replace("%21", "Today: ");
  input.replace("%7E", "Tomorrow: ");
  input.replace("%22", "\"");
  input.replace("%23", "#");
  input.replace("%24", "$");
  input.replace("%25", "%");
  input.replace("%26", "&");
  input.replace("%27", "\'");
  input.replace("%28", "(");
  input.replace("%29", ")");
  input.replace("%30", "*");
  input.replace("%31", "+");
  input.replace("%2C", ",");
  input.replace("%2E", ".");
  input.replace("%2F", "/");
  input.replace("%2C", ",");
  input.replace("%3A", ":");
  input.replace("%3A", ";");
  input.replace("%3C", "<");
  input.replace("%3D", "=");
  input.replace("%3E", ">");
  input.replace("%3F", "?");
  input.replace("%40", "@");
  input.replace("%5B", "[");
  input.replace("%5C", "\\");
  input.replace("%5D", "]");
  input.replace("%5E", "^");
  input.replace("%5F", "-");
  input.replace("%60", "`");
}

