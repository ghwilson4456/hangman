import Ember from 'ember';

export default Ember.Controller.extend({
  word: 'TESTING',
  guessed: '',
  guessLimit: 6,

  validLetters: function() {
    return this.get('word').replace(/(.)(?=.*\1)/g, '');
  }.property('word'),

  won: function() {
    var guessed = this.get('guessed').toUpperCase().split('');
    var valid = this.get('validLetters').toUpperCase().split('');
    return guessed.filter(function(val) {
        return (valid.indexOf(val) == -1) ? false : val;
      }).length === valid.length;
  }.property('guessed', 'validLetters'),

  gameOver: function() {
    return this.get('won') === true || this.get('missedCount') >= this.get('guessLimit');
  }.property('word', 'guessed', 'missedCount'),

  missedCount: function() {
    var guessed = this.get('guessed').toUpperCase().split('');
    var word = this.get('word').toUpperCase().split('');
    return guessed.filter(function(val) {
      return word.indexOf(val) == -1;
    }).length;
  }.property('word', 'guessed'),

  actions: {
    letterSelected: function(letter) {
      var guessed = this.get('guessed');
      if (guessed.indexOf(letter) === -1) {
        this.set('guessed', guessed + letter);
      }
    }
  }
});
