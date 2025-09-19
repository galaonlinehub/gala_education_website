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
  // Global ignores - these files/folders are NEVER linted
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
    ],
  },
  
  // Next.js configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  
  // Your custom rules - only for your source files
  {
    files: [
      'src/**/*.{js,jsx,ts,tsx}',
      'store/**/*.{js,jsx,ts,tsx}',
      'utils/**/*.{js,jsx,ts,tsx}',
    ],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Relaxed unused vars - warnings only
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_|^props$',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true 
      }],
      
      // Turn off noisy TypeScript rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      
      // Import ordering
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
];