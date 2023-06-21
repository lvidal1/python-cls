// Object spread is just node 8

const defaultConfig = Object.assign({}, require('../jest.config'), {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(js|jsx|ts|tsx)$': '<rootDir>/../../node_modules/babel-jest',
    '\\.scss$': '<rootDir>/../../node_modules/jest-css-modules',
  },
  // https://github.com/facebook/jest/issues/8568#issuecomment-502660960
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false,
    },
    LOCAL_API: true,
    STORYBOOK: false,
  },
})

defaultConfig.coverageReporters = ['json', ["lcov", { "projectRoot": "../../", },], 'text',]
defaultConfig.setupFiles.push('./__mocks__/browser.ts')
defaultConfig.moduleNameMapper[ '@/(.*)$' ] = '<rootDir>/src/$1'

module.exports = defaultConfig
