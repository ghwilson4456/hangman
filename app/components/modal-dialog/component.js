import Ember from 'ember';
import layout from '../modal-dialog/template';

export default Ember.Component.extend({
  layout: layout,
  actions: {
    closeModal() {
      this.sendAction();
    }
  }
});
