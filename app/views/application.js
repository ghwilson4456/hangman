import Ember from "ember";

export default Ember.View.extend({
  tagName: 'main',
  classNames: ['hangman'],

  keyDown: function(e) {
    console.log(e);
    //this.get('controller').sendAction('action', e.keyCode);
  }
});
