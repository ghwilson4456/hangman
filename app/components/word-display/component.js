import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['word-display'],

  displayLetters: Ember.computed('attrs.word', 'attrs.guessed', function() {
    let guessed = (this.attrs.guessed) ? this.attrs.guessed : '';
    let self = this;
    return this.attrs.word.map(function(item) {
      let charCode = item.charCodeAt(0);
      
      if (charCode < 65 || charCode > 90) {
        if (charCode === 32) {
          return { char: '&nbsp;' };
        } else {
          return { char: item };
        }
      }

      if (guessed.indexOf(item) === -1 ) {
        return {
            nonChar: true,
            char: self.attrs.blank || '&nbsp;'
          };
      }

      return { char: item };
    });
  })
});
