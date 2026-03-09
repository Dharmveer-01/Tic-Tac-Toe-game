const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const celebration = document.getElementById("celebration");
const modeSelect = document.getElementById("mode");

let gameMode = "pvp";
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];

modeSelect.addEventListener("change", () => {
    gameMode = modeSelect.value;
    restartGame();
});

cells.forEach(cell => {
    cell.addEventListener("click", playerMove);
});

function playerMove(){

    const index = this.getAttribute("data-index");

    if(board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    if(checkWinner()){
        statusText.textContent = `Player ${currentPlayer} wins!`;
        celebration.style.display="block";
        gameActive=false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent="😐 It's a draw!";
        gameActive=false;
        return;
    }

    if(gameMode === "ai" && currentPlayer === "X"){

        currentPlayer="O";
        statusText.textContent="Computer's turn";

        setTimeout(computerMove,500);

    }else{

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;

    }

}

function computerMove(){

    let emptyCells = board
    .map((v,i)=> v==="" ? i : null)
    .filter(v=> v!==null);

    let move = emptyCells[Math.floor(Math.random()*emptyCells.length)];

    board[move] = "O";

    cells[move].textContent="O";
    cells[move].classList.add("O");

    if(checkWinner()){
        statusText.textContent="Computer wins!";
        celebration.style.display="block";
        gameActive=false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent="😐 It's a draw!";
        gameActive=false;
        return;
    }

    currentPlayer="X";
    statusText.textContent="Player X's turn";

}

function checkWinner(){

    for(let pattern of winPatterns){

        if(pattern.every(i => board[i] === currentPlayer)){
            pattern.forEach(i=> cells[i].classList.add("win"));
            return true;
        }

    }

    return false;
}

function restartGame(){

    board=["","","","","","","","",""];
    gameActive=true;
    currentPlayer="X";

    statusText.textContent="Player X's turn";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.className="cell";
    });

    celebration.style.display="none";

}