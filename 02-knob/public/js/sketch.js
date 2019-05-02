// --------------------------------------------------------
// 02-knob
// --------------------------------------------------------
let socket;
let minRadius       = 20;
let maxRadius       = 400;
let radiusIncrement = 30;
let degreeIncrement = 10;
let rotateAmt       = 0.0;
let pointSizeX      = 3;
let pointSizeY      = 3;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // this works if you're running your server on the same port
  // if you're running from a separate server on a different port
  // you'll need to pass in the address to connect()
  socket = io.connect(); 

  // we listen for message on the socket server called 'data'
  socket.on('data',
    (data) => {
      console.log('knob data: ', data.knobData);
      if (parseInt(data.knobData) != rotateAmt) {
        rotateAmt = (parseInt(data.knobData));
      }
    }
  );
}

// --------------------------------------------------------
function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// --------------------------------------------------------
function draw() {
  background(0);

  push();
  translate(width/2, height/2);

  for (let i = minRadius; i <= maxRadius; i+= radiusIncrement) {
    rotate(rotateAmt);

    beginShape();
    for (let j = 0; j <= 360; j+= degreeIncrement) {
      rotate(30);
      let x = cos(radians(j)) * i;
      let y = sin(radians(j)) * i;

      ellipse(x, y, pointSizeX, pointSizeY);
      stroke(255);
    }

    endShape();
  }
}