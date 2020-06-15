//show high scores list
var highScores = [];
getList();
storeList();

function renderHighScores () {
    var highScoresList = document.getElementById("high-scores-list");
    //for every high score 
    for (var i = 0; i < highScores.length; i++) {
        //remove placeholder spots from the bottom
        highScoresList.removeChild(highScoresList.lastElementChild);
        var highScore = highScores[i];
        //create a list item
        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        //assign the list item the high score
        li.textContent = highScore;
        //add the list item to the highscores list starting at the top
        highScoresList.insertBefore(li, highScoresList.childNodes[0]);
    }
}


function getList() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    var storedHighScores = JSON.parse(localStorage.getItem("high-scores"));
    // If high scores were retrieved from localStorage, update the high scores array to it
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
    // Render high scores to the DOM
    renderHighScores();
}

      
function storeList() {
    // Stringify and set "high-scores" key in localStorage to highScores array
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}


