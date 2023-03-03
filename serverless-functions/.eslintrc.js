module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports', 'import', 'prettier', 'prefer-arrow'],
  rules: {
    // Don't try to align with the 100 characters specified in prettier/.editorconfig, the prettier
    // line length limit is not strict, cf. https://prettier.io/docs/en/options.html#print-width
    'max-len': [
      'warn',
      {
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        code: 120,
      },
    ],
    'max-lines-per-function': ['error', 200],
    'object-shorthand': [
      'error',
      'always',
      { avoidExplicitReturnArrows: true },
    ],
    'prettier/prettier': 'error',
    'import/namespace': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-classes-per-file': 'off',
    'no-return-await': 'error',
    'no-unsafe-finally': 'error',
    'no-unneeded-ternary': 'error',
    'no-underscore-dangle': 'off',
    'no-async-promise-executor': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    Twilio: true,
    Runtime: true,
    describe: true,
    it: true,
    expect: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.test.js'],
      rules: {
        'max-lines-per-function': 'off',
        'no-empty': 'off',
      },
    },
  ],
};
