import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import betterTailwind from 'eslint-plugin-better-tailwindcss'
import prettier from 'eslint-config-prettier'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const config = [
  {
    files: ['**/*.js', '**/*.jsx'],
  },
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      'better-tailwindcss': betterTailwind,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: `${import.meta.dirname}/src/app/globals.css`,
      },
    },
    rules: {
      'better-tailwindcss/enforce-consistent-class-order': 'warn',
      'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
      'better-tailwindcss/no-conflicting-classes': 'error',
      'better-tailwindcss/no-duplicate-classes': 'warn',
      'better-tailwindcss/no-restricted-classes': 'error',
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',
      'better-tailwindcss/no-unregistered-classes': [
        'error',
        {
          ignore: ['transition-custom'],
        },
      ],
    },
  },
  prettier,
]

export default config
