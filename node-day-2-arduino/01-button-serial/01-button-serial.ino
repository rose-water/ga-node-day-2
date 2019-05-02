const int buttonPin = 2;
int buttonState = 0; 

void setup() {
  Serial.begin(9600);
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);

    if (buttonState == HIGH) {
      Serial.println("1");
    } else {
      Serial.println("0");
    }
}

