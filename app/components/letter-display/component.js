import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['word-display'],

  displayLetters: Ember.computed('attrs.word', 'attrs.letters', function() {
    let letters = (this.attrs.letters) ? this.attrs.letters : [];
    return this.attrs.word.map(item => {
      let code = item.toUpperCase().charCodeAt(0);
      let data = {
        char: item.toUpperCase(),
        alpha: (code >= 65 && code <= 90)
      };
      
      if (code === 32) {
        data.char = '&nbsp;';
      } else {
        data.char = item;
      }

      if (letters.indexOf(item) === -1 && data.alpha === true) {
        data.char = this.attrs.blank || '&nbsp;';
      }

      return data;
    });
  })
});
