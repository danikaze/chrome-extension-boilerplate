module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  plugins: ['unicorn'],
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      },
      typescript: {},
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',

    /*
     * Custom CSS rules :)
     */

    // https://reactjs.org/docs/hooks-rules.html
    // allows placing the hooks logic in a different file for better code management
    'react-hooks/rules-of-hooks': 'off',

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
    'react/require-default-props': 'off',

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
    'react/no-unused-prop-types': 'off',

    // https://eslint.org/docs/latest/rules/no-restricted-syntax
    // remove the for-of usage restriction from airbnb-base rules
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // https://typescript-eslint.io/rules/no-use-before-define/
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
      },
    ],

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': 'off',

    // https://eslint.org/docs/latest/rules/no-plusplus
    'no-plusplus': 'off',

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    '@typescript-eslint/no-non-null-assertion': 'off',

    // https://typescript-eslint.io/rules/ban-types/
    '@typescript-eslint/ban-types': 'off',

    // https://eslint.org/docs/latest/rules/no-nested-ternary
    'no-nested-ternary': 'off',

    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      // destructured variables come from other places so no format is enforced
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      // Constants can also be camelCase apart from UPPER_CASE
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['UPPER_CASE', 'camelCase'],
      },
      // functions defined as constants should have the same format as functions
      {
        selector: 'variable',
        types: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
      // functions can be:
      // - regular functions (camelCase)
      // - functional components (PascalCase)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // type definitions (class, interface, typeAlias, enum, typeParameter)
      // should be PascalCase
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // each member of an enum (const-like) should be UPPER_CASE
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        // Ignore properties that require quotes
        selector: [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        format: null,
        modifiers: ['requiresQuotes'],
      },
    ],
  },
};
