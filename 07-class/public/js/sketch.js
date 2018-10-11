let button;
let filmsData = [];
let films = []; 

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
  let titleText = "Exercise 7: A custom p5 class";
  text(titleText, 60, 60);
}

// --------------------------------------------------------
function getFilms() {
  httpGet('/getFilmData', function(response) {
    console.log(JSON.parse(response));
    filmsData = JSON.parse(response);

    // here we create an array of filmClass instances
    let x = 60;
    let startingY = 200;
    for (let i = 0; i < filmsData.length; i++) {
      let filmClassInstance = new FilmClass(filmsData[i], x, startingY + (40 * i));
      films.push(filmClassInstance);
    }
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
  
  if (films.length > 0) {
    // do something with the data!
    for (let i = 0; i < films.length; i++) {
      films[i].display();
    }
  }
}

// --------------------------------------------------------
// Our custom class
// --------------------------------------------------------
function FilmClass(filmData, xPos, yPos) {
  this.xPos        = xPos;
  this.yPos        = yPos;
  this.diameter    = 30;
  this.fillColor   = color(113, 65, 244);

  // Store the data from the API response that we care about
  this.description = filmData.description;
  this.director    = filmData.director;
  this.id          = filmData.id;
  this.producer    = filmData.producer;
  this.releaseDate = filmData.release_date;
  this.rottenScore = filmData.rt_score;
  this.title       = filmData.title;

  // --------------------------------------------------------
  this.display = function() {
    noStroke();    
    if (this.handleHover() == true) {
      fill(0);
      textSize(16);
      text(this.title, this.xPos + 30, this.yPos + 8);

      // set the fill for the ellipse (not hovered)
      fill(66, 212, 244);
    } else {
      // set the fill for the ellipse (hovered)
      fill(this.fillColor);
    }

    ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
  }
  
  // --------------------------------------------------------
  this.handleHover = function() {
    let d = dist(mouseX, mouseY, this.xPos, this.yPos);
    if (d < this.diameter / 2) {
      return true;
    } else {
      return false;
    }
  }
}

