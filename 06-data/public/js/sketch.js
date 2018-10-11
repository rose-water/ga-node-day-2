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
  let title       = film.title;
  let releaseDate = film.release_date;
  let rottenScore = film.rt_score;
  let content = "\"" + title + "\" was released in " + releaseDate + " and has a rotten tomatoes score of: " + rottenScore;

  textSize(16);
  text(content, xPos, yPos);
}

// --------------------------------------------------------
function draw() {
  background(243, 214, 255);
  setupTitle();

  // because draw() gets called every frame, we may not yet
  // have any data to work with (e.g., the get films button
  // hasn't been clicked yet), therefore we need to check. 
  // One way to check is to see if the array has been populated.

  let x = 60;
  let startingY = 200;

  if (filmsData.length > 0) {
    // do something with the data!
    for (let i = 0; i < filmsData.length; i++) {
      createFilmInfo(filmsData[i], x, startingY + (30 * i));
    }
  }
}