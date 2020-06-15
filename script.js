//pages 
var mainPage = document.getElementById("main-page");
var hsPage = document.getElementById("hs-page");

//Start menu elements
var startMenu = document.getElementById("start-container");
var startButton = document.getElementById("start-button");

//Quiz elements
var quizEl = document.getElementById("quiz-container");
var questionEL = document.getElementById("question-element");
var answerButtons = document.getElementById("buttons");

//Menu elements
var endMenu = document.getElementById("end-container");
var userInput = document.getElementById("user-input");
var userScore = document.getElementById("user-score");
var scoreInput = document.getElementById("user-initials");
var submitInits = document.getElementById("submit-button");
var restartButton = document.getElementById("restart-quiz");
var seeHighScoresButton = document.getElementById("see-high-scores");

//Right-wrong elements
var rightWrong = document.getElementById("right-wrong");

//Highscores elements
var highScoresList = document.getElementById("high-scores-list");

//Countdown elements
var countDown = document.getElementById("countdown");

//create a function that holds the quiz questions, user options, and the correct answer
function quizQuestions (question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}
//create an array that holds different quiz questions within the created quizQuestion function
var questions = [
    new quizQuestions ("Commonly used data types DO NOT include:",["01. strings", "02. booleans", "03. alerts","04. numbers"], "03. alerts"),
    new quizQuestions ("The condition in an if/else statement is inclosed in:",["01. quotes", "02. curly brackets", "03. parentheses","04. square brackets"], "03. parentheses"),
    new quizQuestions ("Arrays in Javascript can be used to store _____", ["01. numbers and strings", "02. other arrays", "03. numbers","04. all of the above"], "04. all of the above"),
    new quizQuestions ("String values must be enclosed within _____ when being assigned to variables.",["01. commas", "02. curly brackets", "03. quotes","04. parenthesis"], "02. curly brackets"),
    new quizQuestions ("A very useful tool used during development and debugging for printing content to the debugger is:",["01. JavaScript", "02. terminal/bash", "03. for loops","04. console.log"], "04. console.log"),
];



//stored variables 
var totalScore = (questions.length);
var highScores = [];
var currentQuestionIndex = 0;
var currentTime = 60;
var tick;
var timer_is_on = 0;



//start the game when you click the start button
startButton.addEventListener("click" , startGame);

//timer function
function timedCount() {
    currentTime--;
    countDown.value = currentTime;
    countDown.innerHTML = ("Time : " + currentTime);
    if (currentTime <= 0) {
        stopTimer();
        showEndMenu();
    }
}
//start timer and set interval
function startTimer() {
if (!timer_is_on) {
    timer_is_on = 1;
    tick = setInterval(timedCount, 1000);
    timedCount();
}
}
//stop timer and clear interval
function stopTimer() {
clearInterval(tick);
timer_is_on = 0;
countDown.innerHTML = ("Time : 0");
}

//set start game function  
function startGame(){
    //make start menu clear and first quiz question appear
    startMenu.classList.add("hide");
    quizEl.classList.remove("hide");
    //change current question index to 0 and run nextQuestion
    currentQuestionIndex = 0;
    nextQuestion();
    startTimer();
}
function nextQuestion () {
    //if there are no more questions left...
    if (questions.length === (currentQuestionIndex)) {                                                 
        //Move to the end menu and stop the timer
        showEndMenu();    
        stopTimer()
    } else {
        //otherwise run ShowQuestion for the current question index
        showQuestion(currentQuestionIndex);
    }
}
//propogate the question items
function showQuestion () {
    //run resetState function(removing current buttons)
    resetState();
    //change the inner text of the question element to the current question
    questionEL.innerText = questions[currentQuestionIndex].question;
    //for each possible answer
    for (var i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
        //make a button, change the inner text of the button to be an answer
        var button = document.createElement("button");
        button.innerText = questions[currentQuestionIndex].answers[i];
        //give the button the class 'btn' to attach it to our css
        button.classList.add("btn");
        //add it in our buttons div
        answerButtons.appendChild(button);
        button.setAttribute('value', questions[currentQuestionIndex].answers[i]);
        //make it so when the button is clicked, the form runs a chooseAnswer function
        button.addEventListener("click", chooseAnswer);
        console.log(currentQuestionIndex);
    }
}
//remove current buttons 
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
//user selection responses
function chooseAnswer(event) {
    var button = event.target; 
    //if the button is right, give a correct response 
    if (button.value === questions[currentQuestionIndex].correctAnswer) {
        var userChoice = document.createElement("p");
        userChoice.innerText = "Correct!";
        rightWrong.appendChild(userChoice);
        window.setTimeout(disappear, 1000);
    //if the button is wrong, give a 'wrong' responce
    } else {
        var userChoice = document.createElement("p");
        userChoice.innerText ="Wrong!";
        rightWrong.appendChild(userChoice);
        window.setTimeout(disappear, 1000);
        //Subtract 1 from the user's score
        totalScore = (totalScore - 1);
        // subtract 15 seconds
        currentTime = (currentTime - 10);
    }
    function disappear (){
        userChoice.remove();
    }
    currentQuestionIndex++;
    nextQuestion();
}
//hide the quiz and show the end menu
function showEndMenu() {
    quizEl.classList.add("hide");
    scoreInput.classList.remove("hide");
    submitInits.classList.remove("hide");
    endMenu.classList.remove("hide");   
    submitInitials();
}
function submitInitials() {
    //make the user score show up in the end menu
    var showScore = (totalScore + "/" + questions.length);
    userScore.innerHTML= ("Your Final Score is " + showScore);
    //the user submits their initials
    submitInits.addEventListener("click", function addHighScore (event) {   
        event.preventDefault();

        var submitScore = (scoreInput.value + "  " + showScore);
        //if the user's submission is empty or is too long, an error message appears
        if ((scoreInput.value === "") || (scoreInput.value.length > 3)) {
            userScore.innerHTML = "";
            var error = document.createElement("p");
            error.innerText = "Must enter value between 1 and 3 characters";
            rightWrong.appendChild(error);
            //the warning disappears after two seconds and the user needs to resubmit their initials
            window.setTimeout(disappear, 2000);
            scoreInput.value = "";
            return;
        //if the users submission meets the criteria, their initials are added to the highscores array, and the input box disappears so they can't try and submit again
        }else {
            highScores.unshift(submitScore);
            scoreInput.value = "";
            scoreInput.classList.add("hide");
            submitInits.classList.add("hide");
            console.log(highScores);
            storeList();
            getList();
        }
        function disappear () {
        error.remove();
        }
    });
    restartButton.addEventListener("click", resetQuiz);
    seeHighScoresButton.addEventListener("click",switchPage)
}
//hide the end menu and show the start menu
function resetQuiz() {
    endMenu.classList.add("hide");
    startMenu.classList.remove("hide");
    //reset the timer to say 60 seconds
    countDown.innerHTML = ("Time : 60");
    totalScore = (questions.length);
    currentQuestionIndex = 0;
    currentTime = 60;
}
function switchPage () {
    window.location.href = 'highscores.html';
}
function getList() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    var storedHighScores = JSON.parse(localStorage.getItem("high-scores"));
    // If high scores were retrieved from localStorage, update the high scores array to it
    if (storedHighScores !== null) {
      highScores = storedHighScores;
    }
}
function storeList() {
    // Stringify and set "high-scores" key in localStorage to highScores array
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}

