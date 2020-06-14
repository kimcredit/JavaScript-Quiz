//get start menu elements from page 
var startMenu = document.getElementById("start-container");
var startButton = document.getElementById("start-button");

//get quiz elements from page 
var quizEl = document.getElementById("quiz-container");
var questionEL = document.getElementById("question-element");
var answerButtons = document.getElementById("buttons");

//get end menu elements from page 
var endMenu = document.getElementById("end-container");
var userInput = document.getElementById("user-input");
var userScore = document.getElementById("user-score");
var scoreInput = document.getElementById("user-initials");
var submitInits = document.getElementById("submit-button");
var restartButton = document.getElementById("restart-quiz");
var seeHighScoresButton = document.getElementById("high-scores-button");

//get right-wrong from page
var rightWrong = document.getElementById("right-wrong");

//countdown elements
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

//start the game when you click the start button
startButton.addEventListener("click" , startGame);

//set countdown
function timer () {
    //set countdown interval to 1 second
    var tick = setInterval(startTimer, 1000);
    function startTimer() {
        //decrease by 1 unit
        currentTime--;
        // if time is 0 or less, make the timer read "time:0" and show the end menu 
        if (currentTime <=0) {
            clearInterval(tick)
            countDown.innerHTML = ("Time : 0");
            showEndMenu();
        }
        //otherwise the timer should show a current countdown
        else if (questions.length === (currentQuestionIndex)) {
            countDown.innerHTML = ("Time : 0"); 
            return;
        }
        else {
        countDown.innerHTML = ("Time : " + currentTime);
        }
    }
}
//set start game function  
function startGame(){
    //make start menu clear and first quiz question appear
    startMenu.classList.add("hide");
    quizEl.classList.remove("hide");
    //change current question index to 0 and run nextQuestion
    currentQuestionIndex = 0;
    nextQuestion();
    timer();
}

function nextQuestion () {
    //if there are no more questions left...
    if (questions.length === (currentQuestionIndex)) {                                                 
        //Move to the end menu 
        showEndMenu();    
    }else {
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
//this removes our current buttons so the new buttons can line up after
function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function chooseAnswer(event) {
    console.log(event.target);
    var button = event.target; 
    if (button.value === questions[currentQuestionIndex].correctAnswer) {
        var userChoice = document.createElement("p");
        userChoice.innerText = "Correct!";
        rightWrong.appendChild(userChoice);
        window.setTimeout(disappear, 1000);
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

function showEndMenu() {
    quizEl.classList.add("hide");
    endMenu.classList.remove("hide");
    var showScore = (totalScore + "/" + questions.length);
    console.log(showScore);
    userScore.innerHTML= ("Your Final Score is " + showScore);
    submitInits.addEventListener("click", function addHighScore () {        
        var submitScore = (scoreInput.value + "  " + showScore);
        console.log(submitScore);
        if ((submitScore === "") || (scoreInput.length > 3)) {
            console.log(submitScore.length);
            var error = document.createElement("p");
            error.innerText = "Must enter value between 1 and 3 characters";
            rightWrong.appendChild(error);
            window.setTimeout(disappear, 2000);
            return;
        } else { 
            highScores.push(submitScore);
            userInput.classList.add("hide");
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }function disappear (){
            error.remove();
        }
    });
    // restartButton.addEventListener("click",quizRestart);
    // seeHighScoresButton.addEventListener("click",seeHighScores);
}







//storing highscores: 

// function storehighscores() {
//     // Stringify and set "todos" key in localStorage to todos array
//     localStorage.setItem("highScores", JSON.stringify(H=highScores));
//   }
  



                                                                             // Parsing the JSON string to an object
//   function init() {
//   var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
// if (storedHighScores !== null) {
//     highScores = storedHighScores;
//   }

//   // Render todos to the DOM
//   renderTodos();
// }



// function storeHighScores() {
//     // Stringify and set "todos" key in localStorage to todos array
//     localStorage.setItem("highScores", JSON.stringify(highScores));
//   }
  
//   // When form is submitted...
//   todoForm.addEventListener("submit", function(event) {
//     event.preventDefault();
  
//     var todoText = todoInput.value.trim();
  
//     // Return from function early if submitted todoText is blank
//     if (todoText === "") {
//       return;
//     }

// var countDown = document.getElementById("countdown");



  //Do code for showing the number of seconds here

//When a key is pressed in the text area, update the timer using myFunction

 //If seconds are equal or greater than 0, countdown until 1 minute has passed
//Else, clear the timer and alert user of how many words they type per minute















// //obsolete solution
// function showQuestion () {
//     questionEL.innerText = questions[currentQuestionIndex].question;
//     console.log(questions[currentQuestionIndex].answers);
//     questions[currentQuestionIndex].answers.forEach(answer => {
//         var button = document.createElement("button");
//         button.textContent = answer;
//         console.log(answer);
//         button.classList.add("btn");
//         // button.addEventListener("click", selectAnswer());
//         answerButtons.appendChild(button);
//     });

// };






// timer


// var timeInterval;
// var startTime = 60;
// var timePassed = 0;
// var timeLeft = startTime;

// var countDown = document.getElementById("count-down");


// function formatTimeLeft(time) {
//     var seconds = math.floor(time/60(time % 60));
//     return seconds;
// }

// function startTimer () {
//     timeInterval = setInterval(function()  {
//         timePassed = (timePassed += 1);
//         timeLeft = (timeInterval - timePassed);
    
//     countDown.innerHTML = timeLeft;
// }, 1000);
// };













//highscore list
//timer



//quiz 
    //quiz is stored in 'object' and made in javascript? or quiz is made in html and then each element is adjusted in javascript? 
    //if right answer is selected
        //text appears saying correct
        //quiz moves to next question
    //else 
        //text appears saying wrong
        //quiz moves to next question
        //5 seconds subtracted from count-down 

//when quiz ends 

//or 

//when time runs out

    //'all done' form 
    //user submits initials
        //initials stored in high-score array 
    //when user submits initials 
        //shows high-score page 

//highscore page

    //can send user back to beginning
    //can clear all high