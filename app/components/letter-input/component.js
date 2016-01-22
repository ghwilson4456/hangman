/**
 * Clickable alphabetically-ordered letter input.
 * @param {string} class
 * @param {array} selected
 * @param {string} action
 * @param {boolean} disableInput
 */

import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  tagName: 'section',
  letter: null,

  alphabet: computed('selected', function() {
    let letters = [];
    const className = get(this, 'class');

    for (let i = 'A'.charCodeAt(0), end = 'Z'.charCodeAt(0) + 1; i < end; ++i) {
      let isSelected = get(this, 'selected').indexOf(String.fromCharCode(i)) !== -1;

      letters.push({
        char: String.fromCharCode(i),
        selected: isSelected,
        classes: (isSelected) ? `${className}__letter ${className}__letter--selected` : `${className}__letter`
      });
    }

    return letters;
  }),

  actions: {
    handleLetterClick(letter) {
      if (!get(this, 'disableInput')) {
        this.sendAction('action', letter);
      }
    }
  }
});
