console.log('client.js sourced');

var jokes = [
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

$( document ).ready(function() {
    console.log('document ready');
    $('.jokesHere').append(jokes);

  $('#submitButton').on('click', function(){
    console.log('submit button clicked');

    var whoseJoke = $('#whoseIn').val();
    var jokeQuestion = $('#questionIn').val();
    var punchLine = $('#answerIn').val();

    var jokeInput =
      {
        whoseJoke: whoseJoke,
        jokeQuestion: jokeQuestion,
        punchLine: punchLine
      };

    // ajax call
        $.ajax({
          type: 'POST',
          url: '/jokebook',
          data: jokeInput,
          success: function(data) {
          console.log('got this from server - ' + data);
          jokes.push(data);
          $('.jokesHere').append(data);
          } // end ajax success
        }); //end ajax call

    }); //end submit button click

  }); //end document ready
