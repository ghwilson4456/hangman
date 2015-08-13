import Ember from 'ember';

export default Ember.Component.extend({
  displayLetters: Ember.computed('word', 'letters', 'blank', function() {
    let letters = (this.get('letters')) ? this.get('letters') : [];
    return this.get('word').map(item => {
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
        data.char = this.get('blank') || '&nbsp;';
        data.classes = 'letter-display__alpha--blank';
      }

      return data;
    });
  })
});
