import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  classNames: ['category-select'],

  actions: {
    'refresh': function() {
      this.sendAction('action');
    }
  }
});
