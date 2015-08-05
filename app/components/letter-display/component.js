import Ember from 'ember';

export default Ember.Component.extend({
  displayLetters: Ember.computed('attrs.word', 'attrs.letters', 'attrs.blank', function() {
    let letters = (this.attrs.letters.value) ? this.attrs.letters.value : [];
    return this.attrs.word.value.map(item => {
      let code = item.toUpperCase().charCodeAt(0);
      let data = {
        char: item.toUpperCase(),
        alpha: (code >= 65 && code <= 90),
        classes: (code >= 65 && code <= 90) ? 'letter-display__alpha' : 'letter-display__non-alpha'
      };

      if (code === 32) {
        data.char = '&nbsp;';
        data.classes = 'letter-display__non-alpha--space';
      } else {
        data.char = item;
      }

      if (letters.indexOf(item) === -1 && data.alpha === true) {
        data.char = this.attrs.blank || '&nbsp;';
        data.classes = 'letter-display__alpha--blank';
      }

      return data;
    });
  })
});
