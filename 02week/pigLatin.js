'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Whiteboarding Pig Latin Steps:
// Step 1: Change the word parameter to remove whitespace using trim() method and accept lower & upper case using toLowerCase() method
// Step 2: Turn string into an array using split() method
// Step 3: Use a function to check for a vowel in array using a for loop and findindex() method 
// findindex() method returns the index of the first element in an array that pass a test (provided as a function)
// Step 4: Once vowel found, use push() method to push letters before vowel onto the end of an array 
// Step 5: Use push() method to push "ay" onto the end of an array 
// Step 6: Change array back to a string using translate() method 
// Test manually

const pigLatin = (word) => {
  const vowels = ['a','e','i','o','u'];
  word = word.trim().toLowerCase();
  let splitWord = word.split('');
  let pigLatinWord = splitWord.filter(letter => vowels.indexOf(letter) > -1);
    const indexFindVowel = word.indexOf(pigLatinWord[0]);
      if(indexFindVowel === 0) {
        return word + 'ay';
      }
      else{
        return splitWord.slice(indexFindVowel).join('') + splitWord.slice(0, indexFindVowel).join('') +'ay';
      }
}

// manuel testing
// pigLatin('Mary');
// pigLatin('mary');
// pigLatin('MARY');


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log( pigLatin(answer) );
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
