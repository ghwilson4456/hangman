import Ember from 'ember';
import layout from '../modal-message/template';

const get = Ember.get;
const set = Ember.set;

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  layout: layout,
  active: false,

  actions: {
    handleCloseModal() {
      if (!get(this, 'active')) {
        setTimeout(() => {
          set(this, 'active', true);
        }, parseInt(get(this, 'actionDelay')));
      }

      if (get(this, 'active')) {
        this.sendAction();
      }
    }
  }
});
