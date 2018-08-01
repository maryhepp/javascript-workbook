'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

// Whiteboarding 
// Player needs to be swithched after each turn
// Check for player turn's horitzontal win
// Check for player turn's vertical win
// Check for player turn's diagonal win
// If win found, output 'You Win!'
// If winner found, reset board


// Function

function horizontalWin() {
  if([0][0] === playerTurn && [0][1] === playerTurn && [0][2] === playerTurn){
    return true;
  }
  if([1][0] === playerTurn && [1][1] === playerTurn && [1][2] === playerTurn){
    return true;
  }
  if([2][0] === playerTurn && [2][1] === playerTurn && [2][2] === playerTurn){
    return true;
  }
}

function verticalWin() {
  if([0][0] === playerTurn && [1][0] === playerTurn && [2][0] === playerTurn){
    return true;
  }
  if([0][1] === playerTurn && [1][1] === playerTurn && [2][1] === playerTurn){
    return true;
  }
  if([0][2] === playerTurn && [1][2] === playerTurn && [2][2] === playerTurn){
    return true;
  }
}

function diagonalWin() {
  if([0][0] === playerTurn && [1][1] === playerTurn && [2][2] === playerTurn){
    return true;
  }
  if([0][2] === playerTurn && [1][1] === playerTurn && [2][0] === playerTurn){
    return true;
  }
}

function checkForWin() {
  if (horizontalWin()) {
    console.log('horizontal win');
    return "You Win!"
  }
  if (verticalWin()){
    console.log('vertical win');
    return "You Win!"
  }
  if (diagonalWin()){
    console.log('diagonal win');
    return "You Win!"
  }
}

// check for win
function ticTacToe(row, column) {
  if (board[row][column] === ' ') {
    board[row][column] = playerTurn;
  if (checkForWin()){ 
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  } else {
    return playerTurn;
    }
  }
}

function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
