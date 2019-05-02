int potPin = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int reading = analogRead(potPin);     // 0 to 1023
  int angle = reading / 6;              // 0 to 180-ish
  Serial.println(angle);
}
