import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findAll(params.category_id);
  },

  setupController: function(controller, model) {
    var len    = model.get('length');
    var record = model.objectAt(Math.floor(Math.random() * len));
    var word   =record.get('name').toUpperCase().split('');
    controller.set('word', word);
    controller.set('guessed', []);
  }
});
