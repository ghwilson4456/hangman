import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['keyboard-ui'],
  letter: undefined,

  alphabet: function() {
    var letters = [];
    for (var i = 'A'.charCodeAt(0), end = 'Z'.charCodeAt(0); i <= end; ++i) {
      letters.push({
        char: String.fromCharCode(i),
        selected: this.attrs.selected.indexOf(String.fromCharCode(i)) !== -1
      });
    }
    return letters;
  }.property('selected'),

  actions: {
    letterClick: function(letter) {
      if (!this.attrs.disabled) {
        this.sendAction('action', letter);
      }
    }
  }
});
