import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Input } from './Input'
import './Input.module.css'

const meta = {
	title: ' shared/Input',
	parameters: {
		layout: 'centered'
	},
	component: Input
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { placeholder: 'Логин' }
}
