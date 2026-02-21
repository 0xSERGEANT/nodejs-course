import js from '@eslint/js';
import globals from 'globals';
import pluginN from 'eslint-plugin-n';
import pluginPromise from 'eslint-plugin-promise';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginImportX from 'eslint-plugin-import-x';
import configPrettier from 'eslint-config-prettier';

export default [
	{
		ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**', '*.min.js', 'eslint.config.js'],
	},

	js.configs.recommended,
	pluginN.configs['flat/recommended-module'],
	pluginImportX.flatConfigs.recommended,
	pluginUnicorn.configs['flat/recommended'],
	pluginPromise.configs['flat/recommended'],

	{
		languageOptions: {
			ecmaVersion: 2024,
			sourceType: 'module',
			globals: {
				...globals.node,
			},
		},

		settings: {
			'import-x/resolver': {
				node: {},
			},
		},

		rules: {
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
			'prefer-const': 'error',
			'no-var': 'error',
			'object-shorthand': ['error', 'always'],
			'prefer-destructuring': ['warn', { array: false, object: true }],
			'prefer-template': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			curly: ['error', 'all'],
			'no-throw-literal': 'error',
			'no-return-assign': ['error', 'always'],
			'no-implicit-coercion': ['warn', { string: false }],
			'no-lonely-if': 'error',
			'no-nested-ternary': 'error',
			'no-unneeded-ternary': ['error', { defaultAssignment: false }],
			'no-useless-rename': 'error',
			'no-param-reassign': ['warn', { props: false }],
			'consistent-return': 'error',

			'n/no-process-exit': 'off',
			'n/no-missing-import': 'off',
			'n/no-unpublished-import': 'off',

			'import-x/no-duplicates': 'error',
			'import-x/no-cycle': 'warn',
			'import-x/no-self-import': 'error',
			'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }],
			'import-x/first': 'error',
			'import-x/newline-after-import': ['error', { count: 1 }],
			'import-x/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
					pathGroups: [
						{
							pattern: '#/**',
							group: 'internal',
						},
					],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],

			'unicorn/prevent-abbreviations': 'off',
			'unicorn/filename-case': ['error', { case: 'kebabCase' }],
			'unicorn/no-array-reduce': 'off',
			'unicorn/prefer-module': 'off',
			'unicorn/no-null': 'off',
			'unicorn/no-process-exit': 'off',
			'unicorn/prefer-top-level-await': 'off',
			'unicorn/switch-case-braces': ['error', 'avoid'],

			'promise/always-return': 'error',
			'promise/no-return-wrap': 'error',
			'promise/param-names': 'error',
			'promise/catch-or-return': ['warn', { allowFinally: true }],
			'promise/no-nesting': 'warn',
			'promise/no-promise-in-callback': 'warn',
		},
	},

	configPrettier,
];
