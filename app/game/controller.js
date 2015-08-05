import Ember from 'ember';

export default Ember.Controller.extend({
  word: [],
  guessed: [],
  guessLimit: 6,

  validLetters: Ember.computed('word', function() {
    return this.get('word')
      .join('')
      .replace(/(.)(?=.*\1)/g, '')
      .replace(/\W|[0-9]/g, '')
      .split('');
  }),

  gameOver: Ember.computed('word', 'guessed', function() {
    let guessed = this.get('guessed');
    let guessLimit = this.get('guessLimit');
    let valid = this.get('validLetters');
    let missedCount = this.get('missedCount');

    let won = guessed.filter(function(val) {
      return (valid.indexOf(val) === -1) ? false : val;
    }).length === valid.length;

    let gameOver = (won === true || missedCount >= guessLimit);

    if (gameOver && won) {
      return {
        title: 'You won!',
        message: `You completed the game with ${guessed.length} guesses and ${missedCount} misses.`
      };
    } else if (gameOver) {
      return {
        title: 'You lost.',
        message: `You lost the game in ${guessed.length} guesses.`
      };
    }

    return false;
  }),

  missedLetters: Ember.computed('word', 'guessed', function() {
    let guessed = this.get('guessed');
    let word = this.get('word');
    return guessed.filter(function(val) {
      return word.indexOf(val) === -1;
    });
  }),

  missedCount: Ember.computed('missedLetters', function() {
    return this.get('missedLetters').length;
  }),

  spriteIndex: Ember.computed('missedCount', function() {
    return this.get('missedCount') - 1;
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
