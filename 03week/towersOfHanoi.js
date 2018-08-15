'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Goal is to move all the pieces from the left post (a) over to the right post (c) 
// Create ability to move the 4 pieces between 3 stacks
// Test if moves between stacks are legal; pieces cannot be moved onto smaller pieces
// Check for win if in stack c length = 4
// If win found, reset board

// Board creation
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Moves the last piece of the array in the startStack moves it to the last position in the endStack
const movePiece = (startStack, endStack) => {
  return stacks[endStack].push(stacks[startStack].pop());
}

//Checks if movepiece is legal or invalid - pieces can only be moved onto a value that is smaller
const isLegal = (startStack, endStack) => {
  if (stackTest(startStack, endStack)) {
    const firstTest = stacks[startStack][stacks[startStack].length - 1];
    const lastTest = stacks[endStack][stacks[endStack].length - 1];
    if ((firstTest < lastTest) || (stacks[endStack].length === 0)) {
      return true;
    } else {
      console.log('Invalid Move. Try again!');
      return false;
    }
  } else {
    console.log('Invalid Move. Try again!');
    return false;
  }
}

//Tests to ensure the user is entering an a, b, or c first and a corresponding different letter next
const stackTest = (startStack, endStack) => {
  if ((startStack === 'a') && (endStack === 'b' || endStack === 'c')) {
    return true;
  } else if ((startStack === 'b') && (endStack === 'a' || endStack === 'c')) {
    return true;
  } else if ((startStack === 'c') && (endStack === 'a' || endStack === 'b')) {
    return true;
  } else {
    return false;
  }
}

// Checks for winning stack in stack c with a length value of 4
const checkForWin = () => {
  if (stacks.c.length === 4) {
    console.log('You did it!!!!')
    return true;
  } else {
    return false;
  }
}

// Once win found, reset game
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  }
  if (checkForWin()) {
    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
  }
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests that functions work correctly

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    it('should not allow a legal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [],
        c: [1]
      };
      assert.equal(isLegal('a', 'c'), false);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();
}
