import Ember from 'ember';
import config from './config/environment';

let Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('game', { path: '/game/:category_id' });
  this.route('rules');
});

export default Router;
