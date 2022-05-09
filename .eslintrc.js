module.exports = {
	env: {
		// browser: true,
		// commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: ['prettier', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		allowImportEverwhere: false,
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				printWidth: 100,
				useTabs: true,
				tabWidth: 4,
				trailingComma: 'es5',
				arrowParens: 'always',
				semi: true,
				singleQuote: true,
				bracketSpacing: false,
				endOfLine: 'auto',
			},
		],
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
		'no-console': 'warn',
		'no-eval': 'warn',
		'no-unused-var': 'off',
		'unused-imports/no-unused-imports': 'off',
		'unused-imports/no-unused-vars': 'off',
	},
	// requireConfigFile: "false",
};
