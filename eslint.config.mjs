import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

const eslintConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-trailing-spaces': ['error', {
        'ignoreComments': true
      }],
      'padding-line-between-statements': [
        'error',
        {
          'blankLine': 'always',
          'prev': '*',
          'next': 'return'
        },
        {
          'blankLine': 'always',
          'prev': '*',
          'next': 'function'
        },
        {
          'blankLine': 'always',
          'prev': '*',
          'next': 'if'
        },
        {
          'blankLine': 'always',
          'prev': '*',
          'next': 'block'
        },
      ],
    }
  }
]

export default eslintConfig
