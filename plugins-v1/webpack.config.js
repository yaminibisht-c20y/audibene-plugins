const { merge } = require('webpack-merge');

const cracoDev = require('./craco.config.dev');
const cracoProd = require('./craco.config');

module.exports = (config, { isProd, isDev, isTest }) => {
  /**
   * Customize the webpack by modifying the config object.
   * Consult https://webpack.js.org/configuration for more information
   */

  console.log('ENVIRONMENT', process.env.FLEX_TWILIO_ENV);

  if (process.env.FLEX_TWILIO_ENV == 'PROD') {
    return merge(config, cracoProd);
  } else {
    return merge(config, cracoDev);
  }
};
