import Ember from 'ember';

export default Ember.Controller.extend({
  word: [],
  guessed: [],
  guessLimit: 6,

  validLetters: Ember.computed('word', function() {
    // Fix below to use a regular expressions for both duplicates and non-letters
    return this.get('word').join('').replace(/(.)(?=.*\1)/g, '').replace(/\W|[0-9]/g, '').split('');
  }),

  gameOver: Ember.computed('word', 'guessed', function() {
    let guessed = this.get('guessed');
    let guessLimit = this.get('guessLimit');
    let valid = this.get('validLetters');
    let missedCount = this.get('missedCount');
    console.log(valid);

    let won = guessed.filter(function(val) {
      return (valid.indexOf(val) === -1) ? false : val;
    }).length === valid.length;

    let gameOver = (won === true || missedCount >= guessLimit);

    if (gameOver && won) {
      console.log('won');
      return {
        title: 'You won!',
        message: `You completed the game with ${guessed.length} guesses and ${missedCount} misses.`
      };
    } else if (gameOver) {
      console.log('lost');
      return {
        title: 'You lost.',
        message: `You lost the game in ${guessed.length} guesses.`
      };
    }

    return false;
  }),

  missedCount: Ember.computed('word', 'guessed', function() {
    let guessed = this.get('guessed');
    let word = this.get('word');
    return guessed.filter(function(val) {
      return word.indexOf(val) === -1;
    }).length;
  }),

  actions: {
    letterSelected(letter) {
      let guessed = this.get('guessed').join('');
      if (guessed.indexOf(letter) === -1) {
        guessed += letter;
        this.set('guessed', guessed.split(''));
      }
    }
  }
});
