import Ember from 'ember';
import layout from '../modal-message/template';

export default Ember.Component.extend({
  layout: layout,
  actions: {
    handleCloseModal() {
      this.sendAction();
    }
  }
});