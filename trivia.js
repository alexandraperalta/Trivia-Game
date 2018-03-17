
var clockRunning = false;
var qCount = 0;
var intervalId;
var time = 10;
var answeredCorrectly = 0;
var answeredIncorrectly = 0;


function displayQuestionsAndOptions() {
    $("#start_button").prop("disabled", true);
    stopwatch.reset();
    stopwatch.start();
    $(".question").text(questionArray[qCount].question);
    displayOptions(qCount);
}
function displayOptions(qCount) {

    $(".options").text("");
    for (var i = 0; i < questionArray[qCount].options.length; i++) {
        var btnAnswers = $("<button        >");
        btnAnswers.addClass("btnAnswers");
        btnAnswers.prop("id", questionArray[qCount].options[i]);
        btnAnswers.text(questionArray[qCount].options[i]);
        $(".options").append(btnAnswers);
    }
    $('.btnAnswers').off("click");
    $(".btnAnswers").on('click', function () {
        if (time > 0) {
            userInput = this.id;
            questionArray[qCount].userAnswer = userInput;
            if (userInput == questionArray[qCount].correctAnswer()) {
                answeredCorrectly++;
                display("right");
            }
            else {
                answeredIncorrectly++;
                display("wrong");
            }
        }
    });
    $('.btnAnswers').css('cursor', 'pointer');
}
var stopwatch = {
    reset: function () {
        time = 10;
        $("#timer").text(stopwatch.timeConverter(time));
    },
    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
    },
    start: function () {
        $("#timer").css("color", "black");
        //  Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(stopwatch.count, 1000);
            clockRunning = true;
        }
    },
    count: function () {

        // decrement time by 1, remember we cant use "this" here.
        time -= 1;
        //  Get the current time, and save the result in a variable.
        var result = time;
        //  Use the variable you just created to show the converted time in the "display" div.
        if (time < 0) {
            stopwatch.stop();
            display("timeUp");
        }
        else {
            $("#timer").text(stopwatch.timeConverter(result));
        }
    },
    timeConverter: function (t) {
        var minutes = 0;
        var seconds = time;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }

};
$("#start_button").on('click', function () {
    answeredCorrectly = 0;
    answeredIncorrectly = 0;
    if (qCount == questionArray.length - 1) {
        qCount = 0;
    }
    stopwatch.start();
    displayQuestionsAndOptions();
});
$("#start_button").css('cursor', 'pointer');

var questionArray = [
    question1 = {
        question: "Who was the Terminator sent to kill?",
        options: ["Sarah Connor", "his (human) self from the past", "John Connor", "Troy Connor"],
        correctAnswer: function () { return this.options[0] },
        userAnswer: "",
        correct: ""
    },
    question2 = {
        question: "What day does Marty travel to in 'Back to the Future'?",
        options: ["November 15, 1955", "July 4, 1955", "October 15, 2015", "July 2, 1968"],
        correctAnswer: function () { return this.options[0] },
        userAnswer: "",
        correct: ""
    },
    question3 = {
        question: "Who wrote the screenplay for 'Ghostbusters?'",
        options: ["Bill Murray & Harold Ramis", "Dan Aykroyd & Harold Ramis", "Steven Spielberg", "Christopher Nolan"],
        correctAnswer: function () { return this.options[1] },
        userAnswer: "",
        correct: ""
    }
];

function gameOver() {
    $("#timer").css("color", "black");
    $("#start_button").prop("disabled", false);
    $(".question").text("");
    $(".options").text("");
    
    $("#timer").css("font-size", "55px");
    $("#timer").text("QUIZ OVER! \nCorrect: " + answeredCorrectly + "\nIncorrect: " + answeredIncorrectly);
    $("#start_button").text("Try again!");
}
function display(questionOver) {
    $('.btnAnswers').off("click");
    stopwatch.stop();
    switch (questionOver) {
        case "right":
            $("#timer").text("CORRECT!");
            $("#timer").css("color", "#7fff00");
            break;
        case "wrong":
            $("#timer").text("WRONG! RIGHT ANSWER WAS " + questionArray[qCount].correctAnswer().toUpperCase());
            $("#timer").css("color", "#B22222");
            break;
        case "timeUp":
            $("#timer").text("TIME'S UP, RIGHT ANSWER WAS " + questionArray[qCount].correctAnswer().toUpperCase());
            $("#timer").css("color", "#B22222");
            answeredIncorrectly++;
            break;
    }
    if (qCount < questionArray.length - 1) {
        qCount++;
        setTimeout(displayQuestionsAndOptions, 4000);
    }
    else {
        setTimeout(gameOver, 4000);
    }
}

