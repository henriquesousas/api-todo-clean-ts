const config = require('./jest.config');

config.displayName = 'unit-test';
config.testMatch = ['**/*.spec.ts'];
module.exports = config;
