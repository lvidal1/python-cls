
const defaultConfig = Object.assign({}, require('../../jest.config'), {
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '\\.(js|jsx|ts|tsx)$': '<rootDir>/../../../node_modules/babel-jest',
    },
    // https://github.com/facebook/jest/issues/8568#issuecomment-502660960
    globals: {
      'ts-jest': {
        tsConfig: '<rootDir>/tsconfig.json',
        diagnostics: false
      }
    },
  })
  
  module.exports = defaultConfig