//show high scores list
var highScores = [];
getList();
storeList();

function renderHighScores () {
    //for every high score 
    for (var i = 0; i < highScores.length; i++) {
        //remove placeholder spots from the bottom
        highScoresList.removeChild(highScoresList.lastChild);
        //create a table row and set its data index
        var highScore = highScores[i];
        var row = document.getElementsByClassName("row");
        var tr = document.createElement("tr");
        tr.setAttribute("data-index", i);
        //make a table data element and give it the high score text
        var td = document.createElement("td");
        td.textContent = highScore;
        //add the table data element to the table row  
        tr.appendChild(td);
        //add the table row to the highscores list starting at the top
        highScoresList.insertBefore(tr, row[0]);
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
    // renderHighScores();
}

      
function storeList() {
    // Stringify and set "high-scores" key in localStorage to highScores array
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}


