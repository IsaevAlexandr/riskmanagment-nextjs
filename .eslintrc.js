module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'import', 'prettier', '@typescript-eslint'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],

  rules: {
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/explicit-function-return-type': 'off',

    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    semi: 'error',

    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',

    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'off',

    'prettier/prettier': 'error',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
