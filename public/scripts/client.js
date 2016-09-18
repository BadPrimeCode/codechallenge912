console.log('client.js sourced');

var jokes = [];

$(document).ready(function() {
    console.log('document ready');
    var joke = '<div class="joke"><p class="question" style="display: none">' + $('#questionIn').val() + '</p><p class="answer" style="display: none">' + $('#answerIn').val() + '</p><p class="whose" style="display: none"> by ' + $('#whoseIn').val() + '</p><button type="button" class="nextJoke" style="display: none" onclick="showJokes(' + ($('.joke').length + 1) + ')">Next Joke</button></div><br>';
    $('.jokesHere').append(joke);

    $('#submitButton').on('click', function() {
        console.log('submit button clicked');
        //

        var jokeInput = {
            whoseJoke: $('#whoseIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#answerIn').val()
        };

        // ajax call
        $.ajax({
            type: 'POST',
            url: '/jokebook',
            data: jokeInput,
            success: function(data) {
                    console.log('got this from server - ', data);
                    jokes.push(data);
                    $('.jokesHere').append(data);
                } // end ajax success
        }); //end ajax call
    }); //end submit button click

    $('#getJokes').on('click', function() {
        $.ajax({
            url: '/getJokes',
            type: 'GET',
            data: {},
            success: function(data) {
                $('.jokesHere').empty();
                for (var i = 0; i < data.length; i++) {
                    var joke = '<div class="joke"><p class="question" style="display: none">' + data[i].jokeQuestion + '</p><p class="answer" style="display: none">' + data[i].punchLine + '</p><p class="whose" style="display: none">Submitted by ' + data[i].whoseJoke + '</p><button type="button" class="nextJoke" style="display: none" onclick="showJokes(' + (i + 1) + ')">Next Joke</button></div><br>';
                    $('.jokesHere').append(joke);
                }
                showJokes(0);
            }
        });
    });
}); //end document ready
