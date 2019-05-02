int potPin = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int reading = analogRead(potPin);
  int degree = map(reading, 0, 1023, 0, 360);
  Serial.println(degree);
}
