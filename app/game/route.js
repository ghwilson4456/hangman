import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findAll(params.category_id);
  },

  setupController(controller, model) {
    let len    = model.get('length');
    let record = model.objectAt(Math.floor(Math.random() * len));
    let word   =record.get('name').toUpperCase().split('');
    controller.set('word', word);
    controller.set('guessed', []);
  }
});
