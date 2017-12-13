const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: [
    'vue',
    'js',{{#if_eq compiler "typescript"}}
    'ts',{{/if_eq}}
    'json'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'{{#if_eq projectType "lib"}},
    '^#/(.*)$': '<rootDir>/app/$1'{{/if_eq}}
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',{{#if_eq compiler "typescript"}}
    '^.+(?:!\\.d|)\\.ts$': '<rootDir>/node_modules/ts-jest',{{/if_eq}}
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },{{#if_eq compiler "typescript"}}
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',{{/if_eq}}{{#e2e}}
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],{{/e2e}}
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,{{#if_eq compiler "typescript"}}ts,{{/if_eq}}vue}',{{#if_eq compiler "typescript"}}
    '!src/**/*.d.ts',{{/if_eq}}
    '!src/main.{{#if_eq compiler "typescript"}}{js,ts}{{else}}js{{/if_eq}}',
    {{#router}}
    '!src/router/index.{{#if_eq compiler "typescript"}}{js,ts}{{else}}js{{/if_eq}}',
    {{/router}}
    '!**/node_modules/**'
  ]
}
