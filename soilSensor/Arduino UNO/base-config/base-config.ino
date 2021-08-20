void setup() {
  Serial.begin(9600); // open serial port, set the baud rate as 9600 bps
}
void loop() {
  //For UNO R3 micro-controller the max and min moisture reading are;
  int max = 220;
  int min = 530;
  int val;
  val = analogRead(0); //connect sensor to Analog 0

  int valueMinDiff = abs(val - min);
  int maxMinDiff = abs(max - min);
  float moistPercentage = ((float)valueMinDiff / maxMinDiff) * 100;
  Serial.println(moistPercentage); //print the value to serial port
  delay(1000); //wait one second
}
