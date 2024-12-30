const config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-html',
    'stylelint-config-recess-order'
  ],
  ignoreFiles: [
    'node_modules/**/*',
    'dist/**/*',
  ],
  rules: {
    'selector-attribute-quotes': 'always',
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'function-url-quotes': 'always',
    'font-family-name-quotes': 'always-where-recommended',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-no-vendor-prefix': true,
    'no-duplicate-selectors': null,
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/dollar-variable-empty-line-before': null,
  }
}

export default config
