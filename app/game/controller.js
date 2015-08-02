import Ember from 'ember';

export default Ember.Controller.extend({
  word: [],
  guessed: [],
  guessLimit: 6,

  validLetters: function() {
    // Fix below to use a regular expressions for both duplicates and non-letters
    return this.get('word').join('').replace(/(.)(?=.*\1)/g, '').replace(/\W/g, '').split('');
  }.property('word'),

  gameOver: function() {
    var guessed = this.get('guessed');
    var valid = this.get('validLetters');
    var won = guessed.filter(function(val) {
      return (valid.indexOf(val) === -1) ? false : val;
    }).length === valid.length;

    console.log('guessed =', guessed);
    console.log('valid =', valid);
    console.log('won =', won);
    console.log('----------');

    var gameOver = (won === true || this.get('missedCount') >= this.get('guessLimit'));
    if (gameOver && won) {
      this.transitionToRoute('game.win');
    } else if (gameOver) {
      this.transitionToRoute('game.lose');
    }
  }.property('word', 'guessed'),

  missedCount: function() {
    var guessed = this.get('guessed');
    var word = this.get('word');
    return guessed.filter(function(val) {
      return word.indexOf(val) === -1;
    }).length;
  }.property('word', 'guessed'),

  actions: {
    letterSelected: function(letter) {
      var guessed = this.get('guessed').join('');
      if (guessed.indexOf(letter) === -1) {
        guessed += letter;
        this.set('guessed', guessed.split(''));
      }
    }
  }
});
