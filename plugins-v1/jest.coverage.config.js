const { defaults } = require('jest-config');
module.exports = (config) => {
  /**
   * Customize the Jest by modifying the config object.
   * Consult https://jestjs.io/docs/en/configuration for more information.
   */

  return {
    ...(config || {}),
    rootDir: './',
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
        branches: 70,
        lines: 70,
        functions: 70,
        statements: 70,
      },
    },
    coverageReporters: ['text', 'text-summary', 'lcov'],
    coveragePathIgnorePatterns: ['<rootDir>/src/constants/', '<rootDir>/src/types/', '<rootDir>/src/flex-hooks/'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '<rootDir>/src/**/*.tsx',
      '<rootDir>/src/**/*.js',
      '<rootDir>/src/**/*.jsx',
      '!<rootDir>/src/coverage/**/*.js',
      '!<rootDir>/src/FlexTSTemplatePlugin.tsx',
      '!<rootDir>/src/index.ts',
      '!<rootDir>/src/feature-library/**/states/**/*.ts',
      '!<rootDir>/src/feature-library/**/strings/**/*.ts',
      '!<rootDir>/src/feature-library/**/custom-components/**/index.ts',
      '!<rootDir>/src/feature-library/**/custom-components/**/*.Container.ts',
      '!<rootDir>/src/feature-library/**/custom-components/**/*.Styles.ts',
      '!<rootDir>/src/feature-library/**/types/*.ts',
      '!<rootDir>/src/feature-library/**/enums/*.ts',
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  };
};
