// --------------------------------------------------------
// Make to upload 04-ultrasonic.ino to Arduino board!
// Credit to Mark Hellar for the exec example!
// --------------------------------------------------------
const SerialPort = require('serialport');
const Readline   = require('@serialport/parser-readline');
const sPort      = new SerialPort('/dev/cu.usbmodem145101', { baudRate: 9600 });
const parser     = sPort.pipe(new Readline({ delimiter: '\n' }));
const exec       = require('child_process').exec;

// --------------------------------------------------------
// a list of voices can be found here:
// https://gist.github.com/mculp/4b95752e25c456d425c6
function sayHello() {
  let possibleGreetings = [
    'Good Evening!',
    'Hello there!',
    'Welcome to Day 2 of Node',
    'Happy Thursday',
    'Tomorrow is Friday!'
  ]

  let greetIndex = Math.floor(Math.random() * Math.floor(possibleGreetings.length));

  exec('say -v Sam ' + possibleGreetings[greetIndex]);
}

// --------------------------------------------------------
// SERIAL PORT 
// --------------------------------------------------------
// Tells us when the serial port is open and available to read from.
// Make sure your serial monitor is not open with Arduino!
sPort.on("open", () => {
  console.log('Serial port open.');
});

// --------------------------------------------------------
// Our parser streams the incoming serial data
parser.on('data', sensorData => {
  console.log(parseInt(sensorData));

  if (parseInt(sensorData) < 10) {
    sayHello();
  }
});