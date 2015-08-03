import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['keyboard-ui'],
  letter: undefined,

  alphabet: Ember.computed('selected', function() {
    let letters = [];
    for (let i = 'A'.charCodeAt(0), end = 'Z'.charCodeAt(0); i <= end; ++i) {
      letters.push({
        char: String.fromCharCode(i),
        selected: this.attrs.selected.indexOf(String.fromCharCode(i)) !== -1
      });
    }
    return letters;
  }),

  actions: {
    letterClick(letter) {
      if (!this.attrs.disabled) {
        this.sendAction('action', letter);
      }
    }
  }
});
