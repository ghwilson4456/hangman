import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['letter-display'],

  displayLetters: Ember.computed('attrs.word', 'attrs.letters', function() {
    let letters = (this.attrs.letters) ? this.attrs.letters : [];
    return this.attrs.word.map(item => {
      let code = item.toUpperCase().charCodeAt(0);
      let data = {
        char: item.toUpperCase(),
        alpha: (code >= 65 && code <= 90),
        classes: (code >= 65 && code <= 90) ? ['alpha'] : ['non-alpha']
      };

      if (code === 32) {
        data.char = '&nbsp;';
        data.classes.push('space');
      } else {
        data.char = item;
      }

      if (letters.indexOf(item) === -1 && data.alpha === true) {
        data.char = this.attrs.blank || '&nbsp;';
        data.classes.push('blank-alpha');
      }

      data.classes = data.classes.join(' ');

      return data;
    });
  })
});
