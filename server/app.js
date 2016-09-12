console.log('app.js sourced');

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jokes = [];

// listen up
var portage = process.env.PORT || 3030;
app.listen(portage, function() {
  console.log('listening on port whatever');
});

// base url
app.get('/', function (req, res){
  console.log('base url hit');
  // send index file from resolved path
  res.sendFile(path.resolve('public/index.html'));
}); // end base url

// set up public folder
app.use(express.static('public'));

//set up a route/url to go to in order to access public
app.post('/jokebook', urlencodedParser, function (req, res) {
  console.log('jokebook hit', req.body);
  // assemble objectToSend
  var objectToSend = {
    whoseJoke: req.body.whoseJoke,
    jokeQuestion: req.body.jokeQuestion,
    punchLine: req.body.punchLine
  };
  res.send( objectToSend );
});

// initial jokes provided by the client
jokes = [
  {
    whoseJoke: "Huck",
    jokeQuestion: "What's the difference between roast beef and pea soup?",
    punchLine: "Anyone can roast beef."
  },
  {
    whoseJoke: "Millie",
    jokeQuestion: "What do you call a pile of cats?",
    punchLine: "A meowntain!"
  },
  {
    whoseJoke: "dEv",
    jokeQuestion: "Why should you not play cards in the forest?",
    punchLine: "Too many Cheetahs"
  }
];
