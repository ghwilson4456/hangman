import Ember from 'ember';

export default Ember.Controller.extend({
  word: ['T', 'E', 'S', 'T', 'I', 'N', 'G'],
  guessed: [],
  guessLimit: 6,

  validLetters: function() {
    return this.get('word').join('').replace(/(.)(?=.*\1)/g, '').split('');
  }.property('word'),

  won: function() {
    var guessed = this.get('guessed');
    var valid = this.get('validLetters');
    return guessed.filter(function(val) {
        return (valid.indexOf(val) === -1) ? false : val;
      }).length === valid.length;
  }.property('guessed', 'validLetters'),

  gameOver: function() {
    return this.get('won') === true || this.get('missedCount') >= this.get('guessLimit');
  }.property('word', 'guessed', 'missedCount'),

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
