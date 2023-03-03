const { defaults } = require('jest-config');
module.exports = (config) => {
  /**
   * Customize the Jest by modifying the config object.
   * Consult https://jestjs.io/docs/en/configuration for more information.
   */

  return {
    ...(config || {}),
    rootDir: './',
    setupFilesAfterEnv: ['./tests/setup/setupTests.js'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'jsx'],
    reporters: [
      'default',
      [
        'jest-junit',
        {
          outputDirectory: '<rootDir>/junit',
          outputName: 'junit.xml',
        },
      ],
    ],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageThreshold: {
      global: {
        branches: 80,
        lines: 80,
        functions: 80,
        statements: 80,
      },
    },
    coverageReporters: ['text', 'text-summary', 'lcov'],
    coveragePathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/test/',
      '<rootDir>/build/',
    ],
    collectCoverageFrom: ['assets/**/*.js', 'functions/**/*.js'],
    testResultsProcessor: 'jest-sonar-reporter',
  };
};
