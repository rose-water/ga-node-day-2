int trigPin = 7;
int echoPin = 8;

int duration, distance;


void setup() {
  Serial.begin (9600);

  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
}


void loop() {

  measure(trigPin, echoPin);
  delay(300);
}

void measure(int trig, int echo) {
  
  digitalWrite (trig, HIGH);
  delayMicroseconds(100);
  digitalWrite (trig, LOW);
  delayMicroseconds(100);

  // Measure amount of time that the pulse stays high for the pin
  duration = pulseIn(echo, HIGH);

  // We divide by two because the distance is for a return trip
  // Sound takes 29.154 microseconds to travel 1 centimeter, 
  // (ultrasonic waves travel as fast as the speed of sound)
  // For reference, 2.54 cm = 1 in
  distance = (duration / 2) / 29.1;

  Serial.println(distance);
}

