import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['word-display'],

  displayLetters: function() {
    var letters = this.get('letters');
    var display = this.get('word').split('').map(function(item) {
      var charCode = item.charCodeAt(0);
      
      if (charCode < 65 || charCode > 90) {
        if (charCode === 32) {
          return {
            char: '&nbsp;'
          };
        } else {
          return {
            char: item
          };
        }
      }

      if (letters.indexOf(item) === -1 ) {
        return "&nbsp";
      }

      return item;
    });

    return display;
  }.property('word', 'letters')
});
