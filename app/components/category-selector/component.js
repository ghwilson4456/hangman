import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    console.log('init');
  },

  start: Ember.computed('attrs.categories', function() {
    console.log(Ember.computed('attrs.categories'));
  })
});
