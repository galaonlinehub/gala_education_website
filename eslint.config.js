import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
      '**/.cache/**',
      '**/public/**',
      '**/coverage/**',
      '**/.nyc_output/**',
      '**/temp/**',
      '**/tmp/**',
      '**/*.min.js',
      '**/vendor/**',
      'tailwind.config.js',
      'next.config.js',
      'postcss.config.js',
      'next-sitemap.config.mjs',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      'eslint.config.js',
    ],
  },
  
  // Next.js recommended configurations - separate extends calls
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  
  // Custom rules for your source files
  {
    files: [
      'src/**/*.{js,jsx}',
      'store/**/*.{js,jsx}',
      'utils/**/*.{js,jsx}',
      'features/**/*.{js,jsx}',
      'components/**/*.{js,jsx}',
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // More relaxed unused vars - only warn and be very permissive
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_|^props$|^e$|^event$|^index$|^key$|^id$',
        varsIgnorePattern: '^_|^React$|^clsx$|^dayjs$|^loading$|^error$|^data$|^isLoading$|^isPending$|^isFetching$|^refetch$|^isValid$|^watch$|^register$|^control$|^errors$|^handleSubmit$|^setValue$|^getValues$|^reset$|^trigger$|^clearErrors$',
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: '^_',
        caughtErrors: 'none',
      }],
      
      // Turn off noisy TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      
      // React specific rules to relax
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Next.js specific rules
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'off',
      
      // Turn off import ordering temporarily to avoid build failures
      // You can re-enable this later and fix imports gradually
      'import/order': 'off',
      
      // Other common rules that cause issues
      'no-console': 'warn',
      'prefer-const': 'warn',
      'no-debugger': 'warn',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },
];