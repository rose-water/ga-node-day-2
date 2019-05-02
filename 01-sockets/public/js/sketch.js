let socket;
let buttonPressed = false;
let c;
let ellipseSize = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  c = color(0, 0, 0);

  // this works if you're running your server on the same port
  // if you're running from a separate server on a different port
  // you'll need to pass in the address to connect()
  socket = io.connect(); 

  // we listen for message on the socket server called 'data'
  socket.on('data',
    (data) => {
      console.log('button data: ', data.buttonData);
      if (parseInt(data.buttonData) == 1) {
        buttonPressed = true;
      } else {
        buttonPressed = false;
        ellipseSize = random(20, 500);
        c = color(random(255), 20, 255);
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
  background(243, 214, 255);
  strokeWeight(0);
  
  if (buttonPressed) {
    fill(c);
    ellipse(width/2, height/2, ellipseSize, ellipseSize);
  }
}