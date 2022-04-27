module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 100,
				trailingComma: 'es5',
				tabWidth: 4,
				useTabs: true,
				semi: true,
				singleQuote: true,
				endOfLine: 'auto',
			},
		],
		'no-console': 'warn',
		'no-eval': 'warn',
		'no-unused-var': 'off',
		'unused-imports/no-unused-imports': 'off',
		'unused-imports/no-unused-vars': 'off',
	},
};
