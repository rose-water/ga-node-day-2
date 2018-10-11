let button;

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
function getFilms() {
  httpGet('/getFilmData', function(response) {
    console.log(JSON.parse(response));
  });
}

// --------------------------------------------------------
function draw() {
  background(243, 214, 255);

  textAlign(LEFT);
  textSize(22);
  let titleText = "Exercise 4: Getting data from an API request";
  text(titleText, 60, 60);
}