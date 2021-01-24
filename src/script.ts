const statusDisplay: Element = document.querySelector('.game--status')!;

enum Players {
    X = "X",
    O = "O"
}

let gameActive: boolean = true;
let currentPlayer: Players = Players.X;
let gameState: string[] = ["", "", "", "", "", "", "", "", ""];

const winningMessage: () => string = () => `Player ${currentPlayer} has won!`;
const drawMessage: () => string = () => `Game ended in a Draw!`;
const currentPlayerTurn: () => string = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();


const winningConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell: Element, clickedCellIndex: number): void {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    if (currentPlayer == "X") {
        clickedCell.setAttribute("style", "color:blue")
    } else {
        clickedCell.setAttribute("style", "color:orangered")
    }

}

function changePlayer(): void {
    currentPlayer = currentPlayer === Players.X ? Players.O : Players.X;
    statusDisplay.innerHTML = currentPlayerTurn();

    if (statusDisplay.innerHTML === "It's X's turn") {
        statusDisplay.setAttribute("style", "color:blue");
    }
    if (statusDisplay.innerHTML === ("It's O's turn")) {
        statusDisplay.setAttribute("style", "color:orangered");
    }

}

function validateResult(): void {
    let roundWon: boolean = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition: number[] = winningConditions[i];
        let a: string = gameState[winCondition[0]];
        let b: string = gameState[winCondition[1]];
        let c: string = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            console.log(a, b, c)
            roundWon = true;

            console.log(document.querySelectorAll('.cell'));

            document.querySelectorAll('.cell')[winCondition[0]].classList.add("won");
            document.querySelectorAll('.cell')[winCondition[1]].classList.add("won");
            document.querySelectorAll('.cell')[winCondition[2]].classList.add("won");

            break;
        }


    }

    if (roundWon) {
        console.log("msg " + winningMessage().slice(0, 6))
        statusDisplay.innerHTML = winningMessage();
        if (winningMessage().slice(0, 6) === "Player") {
            statusDisplay.setAttribute("style", "color:blue;");
        }
        gameActive = false;
        return;
    }
    console.log(gameState)
    let roundDraw: boolean = !gameState.includes("")
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayer();
}

function handleCellClick(clickedCellEvent: Event) {
    const clickedCell: Element = <Element>clickedCellEvent.target;
    const clickedCellIndex: string | null = clickedCell.getAttribute('data-cell-index');

    if (clickedCellIndex === null) {
        return;
    }

    const clickedCellIndexValue: number = parseInt(clickedCellIndex);

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
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("won");
        statusDisplay.setAttribute("style", "color:blue");
    });
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart')!.addEventListener('click', restartGame);