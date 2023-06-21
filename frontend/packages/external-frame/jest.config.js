/* eslint-disable import/newline-after-import */
const defaultConfig = Object.assign({}, require('../../jest.config'), {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '\\.scss$': '<rootDir>/../../../node_modules/jest-css-modules',
  },
  // https://github.com/facebook/jest/issues/8568#issuecomment-502660960
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false
    }
  },
})
defaultConfig.setupFiles.push('./__setup__/browser.ts')
defaultConfig.moduleNameMapper['@/(.*)$'] = '<rootDir>/src/$1'

module.exports = defaultConfig
