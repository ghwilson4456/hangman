import Ember from 'ember';

const get = Ember.get;

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'section',

  displayLetters: computed('word', 'letters', 'blank', function() {
    let letters = (get(this, 'letters')) ? get(this, 'letters') : [];

    return get(this, 'word').map(item => {
      let code = item.toUpperCase().charCodeAt(0);
      let data = {
        char: item.toUpperCase(),
        alpha: (code >= 65 && code <= 90),
        classes: (code >= 65 && code <= 90) ? 'c-letter-display__char c-letter-display__char--alpha' : 'c-letter-display__char c-letter-display__char--non-alpha'
      };

      if (code === 32) {
        data.char = '&nbsp;';
        data.classes = 'c-letter-display__char c-letter-display__char--space';
      } else {
        data.char = item;
      }

      if (letters.indexOf(item) === -1 && data.alpha === true) {
        data.char = get(this, 'blank') || '&nbsp;';
        data.classes = 'c-letter-display__char c-letter-display__char--blank';
      }

      return data;
    });
  })
});
