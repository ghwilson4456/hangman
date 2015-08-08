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

  didWin: Ember.computed('guessed', 'validLetters', function() {
    let guessed = this.get('guessed');
    let valid = this.get('validLetters');
    return guessed.filter(function(val) {
      return (valid.indexOf(val) === -1) ? false : val;
    }).length === valid.length;
  }),

  didLose: Ember.computed('missedCount', function() {
    return (this.get('missedCount') >= this.get('guessLimit'));
  }),

  gameOver: Ember.computed('didWin', 'didLose', function() {
    let won = this.get('didWin');
    let lost = this.get('didLose');

    if (won) {
      return {
        title: 'You won!',
        message: `You completed the game with ${this.get('guessed.length')} guesses and ${this.get('missedCount')} misses.`
      };
    } else if (lost) {
      return {
        title: 'You lost.',
        message: `You lost the game in ${this.get('guessed.length')} guesses.`
      };
    }

    return false;
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
