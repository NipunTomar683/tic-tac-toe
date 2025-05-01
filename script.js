const board = document.getElementById('board');
const message = document.getElementById('message');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(i));
    board.appendChild(cell);
    cells.push('');
  }
}

function makeMove(index) {
  if (cells[index] || !gameActive) return;
  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;
  if (checkWin()) {
    message.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c];
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  message.textContent = `${currentPlayer}'s turn`;
  createBoard();
}

// Start the game
resetGame();