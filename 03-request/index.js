const express = require('express');
const request = require('request');
const app     = express();
const PORT    = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// define a route - what happens when people visit /
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// make an api request to the ghibli api /films endpoint
let ghibliFilmsUrl = 'https://ghibliapi.herokuapp.com/films';
let options = {
  json: true 
};

request(ghibliFilmsUrl, options, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    console.log(body);
  } else {
    console.log(err);
  }
}); 

// tell our app where to listen for connections
app.listen(PORT, function() {
  console.log('listening on PORT: ' + PORT);
});