// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: ['eslint.config.mjs']
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		plugins: {
			react,
			'react-hooks': reactHooks
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			},
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.jest,
				...globals.browser
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'@typescript-eslint/require-await': 'off'
		}
	}
)
