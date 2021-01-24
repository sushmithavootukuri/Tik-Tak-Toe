"use strict";
var statusDisplay = document.querySelector('.game--status');
var Players;
(function (Players) {
    Players["X"] = "X";
    Players["O"] = "O";
})(Players || (Players = {}));
var gameActive = true;
var currentPlayer = Players.X;
var gameState = ["", "", "", "", "", "", "", "", ""];
var winningMessage = function () { return "Player " + currentPlayer + " has won!"; };
var drawMessage = function () { return "Game ended in a Draw!"; };
var currentPlayerTurn = function () { return "It's " + currentPlayer + "'s turn"; };
statusDisplay.innerHTML = currentPlayerTurn();
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (currentPlayer == "X") {
        clickedCell.setAttribute("style", "color:blue");
    }
    else {
        clickedCell.setAttribute("style", "color:orangered");
    }
}
function changePlayer() {
    currentPlayer = currentPlayer === Players.X ? Players.O : Players.X;
    statusDisplay.innerHTML = currentPlayerTurn();
    if (statusDisplay.innerHTML === "It's X's turn") {
        statusDisplay.setAttribute("style", "color:blue");
    }
    if (statusDisplay.innerHTML === ("It's O's turn")) {
        statusDisplay.setAttribute("style", "color:orangered");
    }
}
function validateResult() {
    var roundWon = false;
    for (var i = 0; i <= 7; i++) {
        var winCondition = winningConditions[i];
        var a = gameState[winCondition[0]];
        var b = gameState[winCondition[1]];
        var c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            console.log(a, b, c);
            roundWon = true;
            console.log(document.querySelectorAll('.cell'));
            document.querySelectorAll('.cell')[winCondition[0]].classList.add("won");
            document.querySelectorAll('.cell')[winCondition[1]].classList.add("won");
            document.querySelectorAll('.cell')[winCondition[2]].classList.add("won");
            break;
        }
    }
    if (roundWon) {
        console.log("msg " + winningMessage().slice(0, 6));
        statusDisplay.innerHTML = winningMessage();
        if (winningMessage().slice(0, 6) === "Player") {
            statusDisplay.setAttribute("style", "color:blue;");
        }
        gameActive = false;
        return;
    }
    console.log(gameState);
    var roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    changePlayer();
}
function handleCellClick(clickedCellEvent) {
    var clickedCell = clickedCellEvent.target;
    var clickedCellIndex = clickedCell.getAttribute('data-cell-index');
    if (clickedCellIndex === null) {
        return;
    }
    var clickedCellIndexValue = parseInt(clickedCellIndex);
    if (gameState[clickedCellIndexValue] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndexValue);
    validateResult();
}
function restartGame() {
    gameActive = true;
    currentPlayer = Players.X;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.innerHTML = "";
        cell.classList.remove("won");
        statusDisplay.setAttribute("style", "color:blue");
    });
}
document.querySelectorAll('.cell').forEach(function (cell) { return cell.addEventListener('click', handleCellClick); });
document.querySelector('.game--restart').addEventListener('click', restartGame);
