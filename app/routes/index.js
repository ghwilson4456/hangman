import Ember from "ember";

export default Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('/data/words.json');
  },

  actions: {
    refresh: function() {
      this.get('controller').refresh();
    },

    keyboardUIClick: function(letter) {
      var controller = this.get('controller');
      var suggestions = (controller.get('suggestions').length) ? controller.get('suggestions').join(',').split(',') : [];

      if (!letter.disabled && suggestions.indexOf(letter.char) === -1) {
        suggestions.push(letter.char);
        controller.set('suggestions', suggestions);
      }
    },

    addModal: function(modalName) {
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal',
        word: this.get('controller.word')
      });
    },
    
    removeModal: function() {
      console.log('routes/index/actions->closeModal()');
      this.get('controller').resetGame();

      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
