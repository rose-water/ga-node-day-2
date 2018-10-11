let button;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // setup a button (requires p5.dom library, see index.html)
  button = createButton('Get Data');
  button.position(60, 90);
  button.id('data-btn');
  button.mousePressed(getGenderFromName);

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
  let titleText = "Exercise 8: Other APIs";
  text(titleText, 60, 60);
}

// --------------------------------------------------------
function getFilms() {
  httpGet('/getFilmData', function(response) {
    console.log(JSON.parse(response));
  });
}

// --------------------------------------------------------
function getGenderFromName() {
  let name = "alex";
  httpGet('/checkName/' + name, function(response) {
    console.log(JSON.parse(response));
  });
}

// --------------------------------------------------------
function getAmiibo() {
  httpGet('/getAmiiboData', function(response) {
    console.log(JSON.parse(response));
  });
}

// --------------------------------------------------------
function getHello() {
  httpGet('/getHelloInLang', function(response) {
    console.log(JSON.parse(response));
  });
}


// --------------------------------------------------------
function draw() {
  background(243, 214, 255);
}