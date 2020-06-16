//get the high scores data from local storage
getList();

//propogate the high scores list with quiz results
function renderHighScores (array) {
    var highScoresList = document.getElementById("high-scores-list");
    //for every high score 
    for (var i = 0; i < array.length; i++) {
        //remove placeholder spots from the bottom
        highScoresList.removeChild(highScoresList.lastElementChild);
        var initials = array[i];
        //create a list item
        var li = document.createElement("li");
        //create two children p's for the initials and score
        var pi = document.createElement("p");
        var ps = document.createElement("p");
        //assign p's content of initals and score
        pi.textContent = initials + "- - -";
        ps.textContent = localStorage.getItem(array[i]);
        //add the p's to the li
        li.appendChild(pi);
        li.appendChild(ps);
        //add the list item to the highscores list starting at the top
        highScoresList.insertBefore(li, highScoresList.childNodes[0]);
    }
}
function getList() {
    // Get stored scores from localStorage
    var storedHighScores = Object.keys(localStorage);

    // Render high scores to the DOM
    renderHighScores(storedHighScores);
}

    

