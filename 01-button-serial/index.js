const express    = require('express');
const app        = express();
const PORT       = 3000;

const SerialPort = require('serialport');
const Readline   = require('@serialport/parser-readline');
const sPort      = new SerialPort('/dev/cu.usbmodem145101', { baudRate: 9600 });
const parser     = sPort.pipe(new Readline({ delimiter: '\n' }));

// --------------------------------------------------------
// SERIAL PORT STUFF
// --------------------------------------------------------
// Tells us when the serial port is open and available to read from.
// Make sure your serial monitor is not open with Arduino!
sPort.on("open", () => {
  console.log('Serial port open.');
});

// --------------------------------------------------------
// Our parser streams the incoming serial data
parser.on('data', buttonData => {
  console.log(buttonData);
});


// --------------------------------------------------------
// EXPRESS STUFF
// --------------------------------------------------------
// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// --------------------------------------------------------
// tell our app where to listen for connections
app.listen(PORT, () => {
  console.log('listening on PORT: ' + PORT);
});