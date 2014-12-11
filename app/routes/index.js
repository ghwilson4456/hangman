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

    openModal: function(modalName) {
      var controller = this.get('controller');
      var model = {
        word: controller.get('word')
      };

      return this.render(modalName, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    
    closeModal: function() {
      this.get('controller').resetGame();

      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
});
