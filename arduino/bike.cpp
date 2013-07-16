int positionPin = 0;
int steeringPin = 2;
int pos = 0;
int step = 0;
int steering = 512; //initialize potentiometer

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  pos = analogRead(positionPin);
  String posMessage = "POSIT:";
  posMessage += pos;
  Serial.println(posMessage);
  if (step == 2)
  {
    steering = analogRead(steeringPin);
    String steeringMessage = "STEER:";
    steeringMessage += steering;
    Serial.println(steeringMessage);
  }
  step++;
  if (step == 3)
  {
    step = 0;
  }
  delay(250);
}