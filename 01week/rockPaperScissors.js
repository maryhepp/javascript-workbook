'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Whiteboarding of rock, paper, scissors:
// Player1 input of rock, paper, or scissors.
// Player2 input of rock, paper, or scissors.
// Compare Player1 input to Player2 input.
// Scenarios:
// If Player1 input === 'rock' & Player2 input === 'scissor', Player1 wins.
// If Player1 input === 'rock' & Player2 input === 'paper', Player2 wins.
// If Player1 input === 'rock' & Player2 input === 'rock', it's a tie.
// If Player1 input === 'paper' & Player2 input === 'rock', Player1 wins.
// If Player1 input === 'paper' & Player2 input === 'scissors', Player2 wins.
// If Player1 input === 'paper' & Player2 input === 'paper', it's a tie.
// If Player1 input === 'scissors' & Player2 input === 'paper', Player1 wins.
// If Player1 input === 'scissors' & Player2 input === 'rock', Player2 wins.
// If Player1 input === 'scissors' & Player2 input === 'scissors', it's a tie.

function rockPaperScissors(hand1, hand2) {
  if (hand1 === hand2) {
    return "It's a Tie!";
  } else if (hand1 === 'rock' && hand2 === 'scissors') {
    return "Hand one wins!";
  } else if (hand1 === 'rock' && hand2 === 'paper') {
    return "Hand two wins!";
  } else if (hand1 === 'paper' && hand2 === 'rock') {
    return "Hand one wins!";
  } else if (hand1 === 'paper' && hand2 === 'scissors') {
    return "Hand two wins!";
  } else if (hand1 === 'scissors' && hand2 === 'rock') {
    return "Hand two wins!";
  } else if (hand1 === 'scissors' && hand2 === 'paper') {
    return "Hand one wins!";
  } else {
    return "Try Again";
  }
}

function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  getPrompt();

}
