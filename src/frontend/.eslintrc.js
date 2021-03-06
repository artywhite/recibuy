const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    commonjs: true,
    node: true,
    es6: true,
    browser: true,
  },
  globals: {},
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
  plugins: ['react'],
  rules: {
    quotes: [2, 'single'],
    'no-var': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': [0, 'always'],
  },
};
