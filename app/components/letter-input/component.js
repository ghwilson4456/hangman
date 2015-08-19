import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  letter: undefined,

  alphabet: Ember.computed('selected', function() {
    let letters = [];
    for (let i = 'A'.charCodeAt(0), end = 'Z'.charCodeAt(0) + 1; i < end; ++i) {
      letters.push({
        char: String.fromCharCode(i),
        selected: this.get('selected').indexOf(String.fromCharCode(i)) !== -1
      });
    }
    return letters;
  }),

  actions: {
    letterClick(letter) {
      if (!this.get('disableInput')) {
        this.sendAction('action', letter);
      }
    }
  }
});
