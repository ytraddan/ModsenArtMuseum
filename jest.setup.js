import '@testing-library/jest-dom/';

global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

global.Request = class Request {
  constructor(url) {
    this.url = url;
  }
};
