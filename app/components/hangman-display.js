import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['hangman-display'],

  head: function() {
    return this.get('missedCount') > 0;
  }.property('missedCount'),

  body: function() {
    return this.get('missedCount') > 1;
  }.property('missedCount'),

  rightArm: function() {
    return this.get('missedCount') > 2;
  }.property('missedCount'),

  leftArm: function() {
    return this.get('missedCount') > 3;
  }.property('missedCount'),

  rightLeg: function() {
    return this.get('missedCount') > 4;
  }.property('missedCount'),

  leftLeg: function() {
    return this.get('missedCount') > 5;
  }.property('missedCount')
});
