/**
 * Selectively display letters from a word (or words).
 * @param {number} class
 * @param {number} word
 * @param {string} letters
 * @param {string} blank
 */

import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: 'section',

  displayLetters: computed('word', 'letters', 'blank', function() {
    const letters = (get(this, 'letters')) ? get(this, 'letters') : [];
    const className = get(this, 'class');

    return get(this, 'word').map(item => {
      const code = item.toUpperCase().charCodeAt(0);
      let data = {
        char: item.toUpperCase(),
        alpha: (code >= 65 && code <= 90),
        classes: (code >= 65 && code <= 90) ? `${className}__char ${className}__char--alpha` : `${className}__char ${className}__char--non-alpha`
      };

      if (code === 32) {
        data.char = '&nbsp;';
        data.classes = `${className}__char ${className}__char--space`;
      } else {
        data.char = item;
      }

      if (letters.indexOf(item) === -1 && data.alpha === true) {
        data.char = get(this, 'blank') || '&nbsp;';
        data.classes = `${className}__char ${className}__char--blank`;
      }

      return data;
    });
  })
});
