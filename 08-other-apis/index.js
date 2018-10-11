const express = require('express');
const request = require('request');
const app     = express();
const PORT    = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// --------------------------------------------------------
// Studio Ghibli API
// https://ghibliapi.herokuapp.com/
app.get('/getFilmData', function(req, res) {
  
  let ghibliFilmsUrl = 'https://ghibliapi.herokuapp.com/films';
  let options = {
    json: true 
  };

  // make an api request to the ghibli api /films endpoint
  request(ghibliFilmsUrl, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  }); 
});

// --------------------------------------------------------
// Genderize.io
app.get('/checkName/:name', function(req, res) {
  let url = "https://api.genderize.io/?name=" + req.params.name;
  let options = {
    json: true
  };

  request(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  });
})

// --------------------------------------------------------
// Amiibo API
// http://www.amiiboapi.com/
app.get('/getAmiiboData', function(req, res) {
  let url = "http://www.amiiboapi.com/api/amiibo/?name=mario";
  let options = {
    json: true
  };

  request(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  });
})

// --------------------------------------------------------
// Hello, Salut!
// https://www.fourtonfish.com/hellosalut/hello/
app.get('/getHelloInLang', function(req, res) {
  let url = "https://fourtonfish.com/hellosalut/?lang=dz";
  let options = {
    json: true,
  };

  request(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  });
})


// --------------------------------------------------------
// tell our app where to listen for connections
app.listen(PORT, function() {
  console.log('listening on PORT: ' + PORT);
});