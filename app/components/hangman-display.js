import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['hangman-display'],

  images: ['head', 'body', 'right-arm', 'left-arm', 'right-leg', 'left-leg'],

  bodyParts: function() {
    return this.get('images').slice(0, this.get('missedCount'));
  }.property('images', 'missedCount')
});
