let socket;
let minRadius       = 20;
let maxRadius       = 400;
let radiusIncrement = 20;
let degreeIncrement = 10;
let timeIncrement   = 0.000005;
let rotateAmt       = 0.0;
let pointSizeX      = 2;
let pointSizeY      = 2;
let doRotate        = true;

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
      // timeIncrement = parseInt(data.knobData);
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

    if (doRotate) {
      rotateAmt += timeIncrement;
    }

    endShape();
  }
  
}