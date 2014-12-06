import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['keyboard-ui'],

  alphabet: function() {
    var letters = [];
    for (var i = 'A'.charCodeAt(0), end = 'Z'.charCodeAt(0); i <= end; ++i) {
      letters.push({
        char: String.fromCharCode(i),
        selected: this.get('selected').indexOf(String.fromCharCode(i)) !== -1,
        disabled: this.get('disabled').indexOf(String.fromCharCode(i)) !== -1
      });
    }
    return letters;
  }.property('selected'),

  actions: {
    'keyboard-ui-click': function(letter) {
      if (!this.get('active')) {
        this.sendAction('action', letter);
      }
    }
  }
});
