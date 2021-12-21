module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'simple-import-sort',
    'react-hooks',
    'jsx-a11y'
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': 'off',
    'no-undef': 'warn',
    'no-console': ['warn', { allow: ['warn', 'info', 'error'] }],
    'func-style': ['error', 'expression'],
    'no-restricted-imports': [
      'error',
      { paths: [{ name: 'react', importNames: ['default'] }] }
    ],

    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
        checkInlineFunction: true
      }
    ],
    'react/react-in-jsx-scope': 'off',

    'react-hooks/rules-of-hooks': 'error',

    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/no-autofocus': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: { '@typescript-eslint/no-var-requires': ['off'] }
    }
  ]
};
