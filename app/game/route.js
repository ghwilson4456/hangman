import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findAll(params.category_id);
  },

  actions: {
    goToHome() {
      this.transitionTo('application');
    }
  },

  setupController(controller, model) {
    let len    = model.get('length');
    let record = model.objectAt(Math.floor(Math.random() * len));
    let word   = record.get('name').toUpperCase().split('');
    controller.set('guessed', []);
    controller.set('word', word);
  }
});
