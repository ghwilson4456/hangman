import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'section',
  classNames: ['c-hangman-game'],
  collection: null,
  word: [],
  category: null,
  guessed: [],
  guessLimit: 6,

  validLetters: computed('word', function() {
    return get(this, 'word')
      .join('')
      .replace(/(.)(?=.*\1)/g, '')
      .replace(/\W|[0-9]/g, '')
      .split('');
  }),

  missedLetters: computed('word', 'guessed', function() {
    return get(this, 'guessed').filter(val => get(this, 'word').indexOf(val) === -1);
  }),

  missedCount: computed('missedLetters', function() {
    return get(this, 'missedLetters').length;
  }),

  spriteIndex: computed('missedCount', function() {
    return get(this, 'missedCount') - 1;
  }),

  didWin: computed('guessed', 'validLetters', function() {
    return get(this, 'guessed').filter(val => {
      return (get(this, 'validLetters').indexOf(val) === -1) ? false : val;
    }).length === get(this, 'validLetters.length');
  }),

  didLose: computed('missedCount', function() {
    return (get(this, 'missedCount') >= get(this, 'guessLimit'));
  }),

  gameOver: computed('didWin', 'didLose', function() {
    if (get(this, 'didWin')) {
      return {
        title: 'You won!',
        message: `You completed the game with ${get(this, 'guessed.length')} guesses and ${get(this, 'missedCount')} misses.`
      };
    } else if (get(this, 'didLose')) {
      return {
        title: 'You lost.',
        message: `The ${get(this, 'category')} was ${get(this, 'word').join('')}. You lost the game after ${get(this, 'guessed.length')} guesses.`
      };
    }
    return false;
  }),

  resetActive() {
    get(this, 'collections').map((model) => {
      set(model, 'active', false);
      return model;
    });
  },

  actions: {
    handleLetterSelected(letter) {
      let guessed = get(this, 'guessed').join('');
      if (guessed.indexOf(letter) === -1) {
        guessed += letter;
        set(this, 'guessed', guessed.split(''));
      }
    },

    handleSelectCollection(model) {
      let len  = get(model, 'words.length');
      let word = get(model, 'words').objectAt(Math.floor(Math.random() * len)).toUpperCase().split('');
      this.resetActive();
      set(model, 'active', true);
      set(this, 'collection', model);
      set(this, 'guessed', []);
      set(this, 'category', model.get('category'));
      set(this, 'word', word);
    },

    handleRestart() {
      set(this, 'collection', null);
      this.resetActive();
    }
  }
});
