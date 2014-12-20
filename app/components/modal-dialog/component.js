import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    close: function() {
      console.log('components/modal-dialog/component/actions->close()');
      return this.sendAction();
    }
  }
});
