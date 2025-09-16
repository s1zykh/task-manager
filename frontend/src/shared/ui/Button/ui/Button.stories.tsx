import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './Button'
import './Button.module.css'

const meta = {
	title: ' shared/Button',
	parameters: {
		layout: 'centered'
	},
	component: Button
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimarySmall: Story = {
	args: { children: 'Кнопка', size: 'sm' }
}

export const PrimaryMedium: Story = {
	args: { children: 'Кнопка', size: 'md' }
}

export const PrimaryLarge: Story = {
	args: { children: 'Кнопка', size: 'lg' }
}

export const PrimaryFullWidth: Story = {
	args: { children: 'Кнопка', size: 'sm', fullWidth: true },
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		)
	]
}

export const SecondarySmall: Story = {
	args: { children: 'Кнопка', size: 'sm', variant: 'secondary' }
}

export const SecondaryMedium: Story = {
	args: { children: 'Кнопка', size: 'md', variant: 'secondary' }
}

export const SecondaryLarge: Story = {
	args: { children: 'Кнопка', size: 'lg', variant: 'secondary' }
}

export const SecondaryFullWidth: Story = {
	args: {
		children: 'Кнопка',
		size: 'sm',
		fullWidth: true,
		variant: 'secondary'
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		)
	]
}
