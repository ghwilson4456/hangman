import Ember from 'ember';
import layout from '../modal-message/template';

export default Ember.Component.extend({
  layout: layout,
  active: false,

  actions: {
    handleCloseModal() {
      if (!this.get('active')) {
        setTimeout(() => {
          this.set('active', true);
        }, parseInt(this.get('actionDelay')));
      }

      if (this.get('active')) {
        this.sendAction();
      }
    }
  }
});
