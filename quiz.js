//function constructor
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
//prototype property
Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}
//check attributes for answer, return right or wrong after answer with sounds!
var ding = new Audio();
ding.src = "dings.mp3"

var wrong = new Audio();
wrong.src = "priceiswrong.mp3"
Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        document.getElementById("action").innerHTML = ("You were right!!".fontcolor("green").fontsize("30px"));
        ding.play();
        this.score++;
    }
    else {
        document.getElementById("action").innerHTML = ("You were Wrong!!".fontcolor("red").fontsize("30px"));
        wrong.play();
    }
    this.questionIndex++;
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}
//restarts quiz from start
function reload() {
    document.location.href = ("");
}
//if loop to quiz is complete then calls showScores to display results
function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};
//when user press on button 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};
//shows the number of current question out of total
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

//displays results from quiz
function showScores() {
    //set timer 0 because done
    mins = 0;
    secs = 0;
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<div id='highscore'><h2 id='score'> All Done Your Score is: " + (quiz.score * 20) + "%" + "</h2>"
        + "<p2>enter initials </p2>"
        + "<input type = 'text'  id = 'input' maxlength='3'size='1' style='text-transform:uppercase' >"
        + "<input type = 'button' value = 'add score' id= 'add' ></button> "
        + "<input type='button' value = 'Clear' id = 'clearsc' onclick ='removeAll()'>"
        + "<ol id ='scorelist'></ol></div>"
        + "<input type='button' value = 'Restart' id = 'start' onclick ='reload()'>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
    document.getElementById("add").onclick = function () {
        var text = document.getElementById("input").value;
        var li = "<li>" + text + "   -   " + (quiz.score * 20) + "%" + "</li>";
        document.getElementById("scorelist").insertAdjacentHTML('beforeend', li);
        document.getElementById("input").value = "";
    };
}
//when timer runs out shows score
function timeScores() {
    highScores()
};
//clears list of names
function removeAll() {
    document.getElementById("scorelist").innerHTML = "";
}
//set minutes 
var mins = .5;
//calculate the seconds 
var secs = mins * 60;
//countdown function is evoked when page is loaded 
function countdown() {
    setTimeout('Decrement()', 60);
}
//Decrement function decrement the value. 
function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        if (seconds < 20) {
            seconds.value = secs;
        }
        else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        //when timer is below 10 seconds text turns red
        if (secs < 10) {
            seconds.style.color = "red";
        }
        //show results when timer runs out
        if (secs < 0) {
            showScores();
            minutes.value = 0;
            seconds.value = 0;
        }
        else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}
//get minutes
function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}
// get seconds
function getseconds() {
    return secs - Math.round(mins * 60);
}

// questions with answerS
var questions = [
    new Question("Who was the creator of Javascript?",
        ["1.) Charles F. Goldfarb", "2.) John Resig", "3.) Hakon Wium Lie ", "4.) Brendan Eich "], "4.) Brendan Eich "),
    new Question("Which tool can you use to ensure code quality?",
        ["1.) ESLint", "2.) Angular", "3.) jQuery", "4.) RequireJS"], "1.) ESLint"),
    new Question("Which is not a JavaScript Framework?",
        ["1.) Python Script", "2.) JQuery", "3.) Django", "4.) NodeJS"], "3.) Django"),
    new Question("Which is used for Connect To Database?",
        ["1.) PHP", "2.) HTML", "3.) JS", "4.) All"], "1.) PHP"),
    new Question(" What is the function of Array object that adds and/or removes elements from an array?",
        ["1.) unshift()", "2.) toSource()", "3.) sort()", "4.) splice()"], "4.) splice()")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();