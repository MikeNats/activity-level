
const config = require('./wdio.conf.js').config;

config.capabilities = [{
	browserName: 'chrome',
}];

config.services = ['chrome'];

exports.config = config;