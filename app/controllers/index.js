import Ember from "ember";

export default Ember.ObjectController.extend({
  MAX_MISSES: 6,

  words: [],
  word: '',
  suggestions: [],
  selectedCategory: null,

  lettersOnlyWord: function() {
    var word = this.get('word');
    var computed = '';
    for (var i = 0; i < word.length; i++) {
      computed += (word.charCodeAt(i) > 64 && word.charCodeAt(i) < 91) ? word.charAt(i) : '' ;
    }

    return computed;
  }.property('word'),

  refresh: function() {
    this.newWord();
  },

  categoryChanged: function() {
    if (this.get('model.words.length') > 0) {
      var self = this;
      var words = [];

      this.get('model.words').map(function(item) {
        if (item.id === self.get('selectedCategory')) {
          words = item.list.join(',').split(',');
        }
      });

      this.set('words', words);
      this.resetGame();
    }
  }.observes('selectedCategory'),

  newWord: function() {
    var words = this.get('words');
    if (this.get('words.length') > 0) {
      this.set('word', words[Math.floor(Math.random() * words.length)].toUpperCase());
    }
  },

  uniqueLetters: function() {
    return this.get('lettersOnlyWord').split('').filter(function(item, index, enumerable) {
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
      if (self.get('lettersOnlyWord').indexOf(item) > -1) {
        return item;
      }
    }).length;
  }.property('word', 'suggestions'),

  missedCount: function() {
    var self = this;
    return this.get('suggestions').filter(function(item) {
      if (self.get('lettersOnlyWord').indexOf(item) === -1) {
        return item;
      }
    }).length;
  }.property('word', 'suggestions'),

  missedLetters: function() {
    var self = this;
    var letters = [];
    
    letters = this.get('suggestions').filter(function(item) {
      if (self.get('lettersOnlyWord').indexOf(item) === -1) {
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

    if (this.get('word') !== '' && win === true) {
      this.send('openModal', 'win-modal');
    } else if (lose) {
      this.send('openModal', 'lose-modal');
    }

    return lose || win;
  }.property('word', 'suggestions'),

  resetGame: function() {
    this.set('suggestions', []);
    this.newWord();
  }
});
