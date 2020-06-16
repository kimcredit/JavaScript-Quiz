//show high scores list



getList();


function renderHighScores (array) {
    var highScoresList = document.getElementById("high-scores-list");
    //for every high score 
    for (var i = 0; i < array.length; i++) {
        //remove placeholder spots from the bottom
        console.log(array[i]);
        highScoresList.removeChild(highScoresList.lastElementChild);
        var initials = array[i];
        //create a list item
        var li = document.createElement("li");
        var pi = document.createElement("p");
        var ps = document.createElement("p");
        pi.textContent = initials + "- - -";
        ps.textContent = localStorage.getItem(array[i]);
        li.appendChild(pi);
        li.appendChild(ps);
        //assign the list item the high score
        // li.textContent = initials;
        //add the list item to the highscores list starting at the top
        highScoresList.insertBefore(li, highScoresList.childNodes[0]);
    }
}


function getList() {
    // Get stored scores from localStorage
    // Parsing the JSON string to an object
    var storedHighScores = Object.keys(localStorage);
    // If high scores were retrieved from localStorage, update the high scores array to it
    // if (storedHighScores !== null) {
    //     highScores = storedHighScores;
    // }
    // Render high scores to the DOM
    renderHighScores(storedHighScores);
}

    

