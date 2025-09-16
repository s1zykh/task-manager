// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { FlatCompat } from '@eslint/eslintrc'
import storybook from 'eslint-plugin-storybook'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'next/typescript',
			'prettier',
			'plugin:@tanstack/eslint-plugin-query/recommended',
			'plugin:jsx-a11y/recommended'
		],
		plugins: [
			'@tanstack/query',
			'jsx-a11y',
			'required-fields-first',
			'react'
		],
		rules: {
			'required-fields-first/required-fields': 'warn'
			// 'react/destructuring-assignment': [
			// 	'error',
			// 	'always',
			// 	{
			// 		ignoreClassFields: true,
			// 		destructureInSignature: 'always'
			// 	}
			// ]
		}
	}),
	...storybook.configs['flat/recommended']
]

export default eslintConfig
