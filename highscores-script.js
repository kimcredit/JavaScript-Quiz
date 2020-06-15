//show high scores list
var highScores = [];
getList();
storeList();

function renderHighScores () {
    var highScoresList = document.getElementById("high-scores-list");
    //for every high score 
    for (var i = 0; i < highScores.length; i++) {
        //remove placeholder spots from the bottom
        // highScoresList.removeChild(highScoresList.lastElementChild);
        //create a table row and set its data index
        var highScore = highScores[i];
        
        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        
        //make a table data element and give it the high score text
        li.textContent = highScore;
        console.log(li);
       
        //add the table data element to the table row  
        
        //add the table row to the highscores list starting at the top
        highScoresList.appendChild(li);
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


