let button;
let filmsData = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // setup a button (requires p5.dom library, see index.html)
  button = createButton('Get Films');
  button.position(60, 90);
  button.id('films-btn');
  button.mousePressed(getFilms);

  textAlign(CENTER);
}

// --------------------------------------------------------
function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
}

// --------------------------------------------------------
function setupTitle() {
  fill(0);
  textAlign(LEFT);
  textSize(22);
  let titleText = "Exercise 5: Draw something!";
  text(titleText, 60, 60);
}

// --------------------------------------------------------
function getFilms() {
  httpGet('/getFilmData', function(response) {
    console.log(JSON.parse(response));
    filmsData = JSON.parse(response);
  });
}

// --------------------------------------------------------
function createFilmInfo(film, xPos, yPos) {
  let w = 40;
  let h = 40;

  // for now, just draw a circle
  fill(random(255), random(255), 255);
  noStroke();
  ellipse(xPos, yPos, w, h);
}

// --------------------------------------------------------
function draw() {
  background(243, 214, 255);

  setupTitle();

  // because draw() gets called every frame, we may not yet
  // have any data to work with (e.g., the get films button
  // hasn't been clicked yet), therefore we need to check. 
  // One way to check is to see if the array has been populated.

  let startingX = 80;
  let y = 200;

  if (filmsData.length > 0) {
    // do something with the data!
    for (let i = 0; i < filmsData.length; i++) {
      createFilmInfo(filmsData[i], startingX + (50 * i), y);
    }
  }
}