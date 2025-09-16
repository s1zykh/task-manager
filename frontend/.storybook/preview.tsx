import type { Preview } from '@storybook/nextjs-vite'

import '../src/app/styles/index.css'
import { inter } from '../src/shared/lib/fonts'

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		a11y: {
			test: 'todo'
		}
	},
	decorators: [
		(Story) => (
			<div className={inter.className}>
				<Story />
			</div>
		)
	]
}

export default preview
