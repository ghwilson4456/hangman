import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['hangman-game'],
  collection: null,
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
    return this.get('guessed').filter(val => this.get('word').indexOf(val) === -1);
  }),

  missedCount: Ember.computed('missedLetters', function() {
    return this.get('missedLetters').length;
  }),

  spriteIndex: Ember.computed('missedCount', function() {
    return this.get('missedCount') - 1;
  }),

  didWin: Ember.computed('guessed', 'validLetters', function() {
    return this.get('guessed').filter(val => {
      return (this.get('validLetters').indexOf(val) === -1) ? false : val;
    }).length === this.get('validLetters.length');
  }),

  didLose: Ember.computed('missedCount', function() {
    return (this.get('missedCount') >= this.get('guessLimit'));
  }),

  gameOver: Ember.computed('didWin', 'didLose', function() {
    if (this.get('didWin')) {
      return {
        title: 'You won!',
        message: `You completed the game with ${this.get('guessed.length')} guesses and ${this.get('missedCount')} misses.`
      };
    } else if (this.get('didLose')) {
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
    },

    selectCollection: function(model) {
      let len  = model.get('words.length');
      let word = model.get('words').objectAt(Math.floor(Math.random() * len)).toUpperCase().split('');
      model.set('active', true);
      this.set('collection', model);
      this.set('guessed', []);
      this.set('word', word);
    },

    restart: function() {
      this.set('collection', null);
    }
  }
});
