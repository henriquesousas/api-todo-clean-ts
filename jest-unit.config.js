/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const config = require('./jest.config');

config.displayName = 'unit-test';
config.testMatch = ['**/*.spec.ts'];
module.exports = config;
