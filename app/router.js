import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('game', { path: '/game/:category_id' }, function() {
    this.route('win'); // Remove in favor of using class binding to display modal, or whatever
    this.route('lose'); // ditto...
  });
});

export default Router;
