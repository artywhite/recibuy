const isEmpty = require('lodash/isEmpty.js');
const dateFormat = require('date-fns/format');

function getModifiedMessage(msg, params = {}) {
  const date = dateFormat(new Date(), 'DD.MM.YYYY HH:mm:ss');
  let message = `[${date}] ${msg}`;

  if (!isEmpty(params)) {
    message += ` ${JSON.stringify(params)}`;
  }

  return message;
}

function infoLogger(msg, params) {
  console.log(getModifiedMessage(msg, params));
}

function warningLogger(msg, params) {
  console.warn(getModifiedMessage(msg, params));
}

function debugLogger(msg, params) {
  // TODO: add debug flag
  if (true) {
    console.warn(getModifiedMessage(msg, params));
  }
}

function errorLogger(msg, params) {
  console.error(getModifiedMessage(msg, params));
}

module.exports = {
  debugLogger,
  errorLogger,
  infoLogger,
  warningLogger,
};
