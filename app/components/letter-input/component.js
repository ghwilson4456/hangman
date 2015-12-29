import Ember from 'ember';

const get = Ember.get;

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'section',
  letter: undefined,

  alphabet: computed('selected', function() {
    let letters = [];
    for (let i = 'A'.charCodeAt(0), end = 'Z'.charCodeAt(0) + 1; i < end; ++i) {
      letters.push({
        char: String.fromCharCode(i),
        selected: get(this, 'selected').indexOf(String.fromCharCode(i)) !== -1
      });
    }
    return letters;
  }),

  actions: {
    handleLetterClick(letter) {
      if (!get(this, 'disableInput')) {
        this.sendAction('action', letter);
      }
    }
  }
});
