/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'hangman',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        'ember-htmlbars': true,
        'ember-htmlbars-attribute-syntax': true,
        'ember-htmlbars-inline-if-helper': true,
        'ember-htmlbars-component-generation': true,
        'ember-metal-injected-properties': true,
        'ember-routing-named-substates': true,
        'ember-htmlbars-block-params': true,
        'ember-routing-htmlbars-improved-actions': true,
        'ember-views-component-block-info': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'connect-src': "'self' localhost:1337",
      'style-src': "'self' 'unsafe-inline'"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
