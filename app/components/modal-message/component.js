/**
 * Simple modal that displays title and message.
 * @param {string} class
 * @param {boolean} enabled
 * @param {string} title
 * @param {string} message
 * @param {string} action
 */

import Ember from 'ember';
import layout from '../modal-message/template';

const {
  Component,
  get,
  set
} = Ember;

export default Component.extend({
  layout: layout,
  enabledTime: null,

  activeChanged: Ember.observer('enabled', function() {
    var time = new Date().getTime();
    set(this, 'enabledTime', time);
  }),

  actions: {
    handleCloseModal() {
      var enabledTime = get(this, 'enabledTime');
      var currentTime = new Date().getTime();
      var clickDelay = get(this, 'clickDelay') * 1000;

      if (currentTime - enabledTime > clickDelay) {
        this.sendAction();
      }
    }
  }
});
