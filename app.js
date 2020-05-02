/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, previousScore;

function initGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousScore = 0;
    document.querySelector(".dice").style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    alert("- The game has 2 players, playing in rounds\n" +
        "- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score\n" +
        "- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn\n" +
        "- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. " +
        "After that, it's the next player's turn\n" +
        "- If the player rolls two sixes in a row, the score resets!" +"\n" +
        "- The first player to reach 100 points on GLOBAL score wins the game"+
        " ADD THE SCORE YOU WANT TO PLAY TO IN THE FINAL SCORE FIELD"
    )
}

initGame();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying){
        var dice = Math.floor((Math.random() * 6) + 1);
        var diceDOM = document.querySelector(".dice")
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        if(dice === 6 && previousScore === 6){
            previousScore = 0;
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice !== 1) {
            // Add Score
            roundScore += dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        } else{
            nextPlayer()
        }
        previousScore = dice;
    }

});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

}

document.querySelector('.btn-hold').addEventListener('click', function() {
   if (gamePlaying){
       // Add current score to global score
       scores[activePlayer] += roundScore;
       document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
       var input = document.querySelector('.final-score').value;
       var winningScore;
       if(input){
           winningScore = input;
        } else {
           winningScore = 100;
       }
       if (scores[activePlayer] >= winningScore){
           alert("Congrats! Player " + (activePlayer + 1) + " has won the game!");
           document.querySelector('#name-'+activePlayer).textContent = 'WINNER!!';
           document.querySelector('.dice').style.display = 'none';
           document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
           gamePlaying = false;
       } else {
           nextPlayer()
       }
   }
});

document.querySelector('.btn-new').addEventListener('click', initGame);















