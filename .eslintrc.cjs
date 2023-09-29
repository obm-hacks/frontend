module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  plugins: ['react-refresh', 'react'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-indent': ['error', 2, {indentLogicalExpressions: true}],
    'object-curly-spacing': ['error', 'always'],
    'react/jsx-max-props-per-line': [1],
    'react/jsx-newline': ['error'],
    'react/jsx-one-expression-per-line': ['error'],
    'react/jsx-tag-spacing': ['error']
  },
};
