import Ember from "ember";

export default Ember.ObjectController.extend({
  MAX_MISSES: 9,

  words: ['abstract', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'continue', 'const', 'debugger', 'default', 'delete', 'double', 'else', 'enum', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'implements', 'import', 'instanceof', 'int', 'interface', 'long', 'namespace', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'use', 'var', 'void', 'volatile', 'while', 'with'],
  word: '',
  suggestions: [],

  init: function() {
    this.newWord();
  },

  newWord: function() {
    var words = this.get('words');
    this.set('word', words[Math.floor(Math.random() * words.length)].toUpperCase());
  },

  uniqueLetters: function() {
    return this.get('word').split('').filter(function(item, index, enumerable) {
      return enumerable.indexOf(item) === index;
    });
  }.property('word', 'suggestions'),

  complete: function() {
    var self = this;
    return this.get('suggestions').filter(function(item) {
      if (self.get('uniqueLetters').indexOf(item) > -1) {
        return item;
      }
    }).length === this.get('uniqueLetters').length;
  }.property('word', 'suggestions'),

  correctCount: function() {
    var self = this;
    return this.get('suggestions').filter(function(item) {
      if (self.get('word').indexOf(item) > -1) {
        return item;
      }
    }).length;
  }.property('word', 'suggestions'),

  missedCount: function() {
    var self = this;
    return this.get('suggestions').filter(function(item) {
      if (self.get('word').indexOf(item) === -1) {
        return item;
      }
    }).length;
  }.property('word', 'suggestions'),

  missedLetters: function() {
    var self = this;
    var letters = [];
    
    letters = this.get('suggestions').filter(function(item) {
      if (self.get('word').indexOf(item) === -1) {
        return item;
      }
    });

    return letters;
  }.property('word', 'suggestions'),

  displayData: function() {
    return [
        {
          className: 'correct',
          label: 'Correct:',
          value: this.get('correctCount')
        },
        {
          className: 'missed',
          label: 'Missed:',
          value: this.get('missedCount')
        },
      ];
  }.property('correctCount', 'missedCount'),

  gameOver: function() {
    var lose = this.get('missedCount') >= this.get('MAX_MISSES');
    var win = this.get('complete');

    if (win) {
      this.send('openModal', 'win-modal');
    } else if (lose) {
      this.send('openModal', 'lose-modal');
    }

    return lose || win;
  }.property('word', 'suggestions'),

  resetGame: function() {
    this.newWord();
    this.set('suggestions', []);
  }
});
