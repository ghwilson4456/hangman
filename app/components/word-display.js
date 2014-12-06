import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['word-display'],

  displayLetters: function() {
    var letters = this.get('letters');
    var display = this.get('word').split('').map(function(item) {
      if (letters.indexOf(item) === -1 ) {
        return "&nbsp";
      }

      return item;
    });

    return display;
  }.property('word', 'letters')
});
