'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'balance-scale',
        ],
      },
    },
  });

  app.import('node_modules/foundation-sites/dist/css/foundation.css');

  app.import('node_modules/foundation-sites/dist/js/foundation.js');

  return app.toTree();
};
