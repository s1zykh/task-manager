import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Line } from './Line';

const meta = {
  title: 'shared/Line',
  component: Line,
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  
};