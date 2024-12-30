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
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'no-trailing-spaces': ['error', {
        'ignoreComments': true
      }]
    }
  }
]

export default eslintConfig
