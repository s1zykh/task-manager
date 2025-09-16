import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Card } from './Card'

const meta = {
	title: 'shared/Card',
	component: Card
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { children: '' }
}
