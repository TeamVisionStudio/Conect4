const ROWS = 6;
const COLS = 7;
const board = [];
const playerNames = {
  'R': 'Red',
  'Y': 'Yellow'
};
for (let r = 0; r < ROWS; r++) board.push(new Array(COLS).fill(''));
let currentPlayer = 'R';
const table = document.getElementById('board');
for (let r = 0; r < ROWS; r++) {
    const rowElement = table.insertRow();
    for (let c = 0; c < COLS; c++) {
    const cell = rowElement.insertCell();
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.onclick = function () {
          drop(parseInt(this.dataset.col));
        };
    }
}
function drop(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === '') {
          board[row][col] = currentPlayer;
          const cell = table.rows[row].cells[col];
          cell.classList.add(currentPlayer);
          if (checkWin(row, col)) {
            document.getElementById('message').textContent = playerNames[currentPlayer] + ' win!';
            disableBoard();
          } else {
            currentPlayer = currentPlayer === 'R' ? 'Y' : 'R';
          }
          break;
        }
    }
}
function disableBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          table.rows[r].cells[c].onclick = null;
        }
    }
}
function checkWin(r, c) {
    return checkDirection(r, c, 0, 1) || checkDirection(r, c, 1, 0) || checkDirection(r, c, 1, 1) || checkDirection(r, c, 1, -1);
}
function checkDirection(r, c, dr, dc) {
    let count = 1;
    let i = 1;
    while (true) {
        let nr = r + dr * i, nc = c + dc * i;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== currentPlayer) break;
        count++;
        i++;
    }
    i = 1;
    while (true) {
        let nr = r - dr * i, nc = c - dc * i;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== currentPlayer) break;
        count++;
        i++;
    }
    return count >= 4;
}
function resetGame() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      board[r][c] = '';
      const cell = table.rows[r].cells[c];
      cell.className = '';
      cell.onclick = function () {
        drop(parseInt(this.dataset.col));
      };
    }
  }
  currentPlayer = 'R';
  document.getElementById('message').textContent = '';
}