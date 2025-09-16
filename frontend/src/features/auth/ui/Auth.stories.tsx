import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Auth } from './Auth';

const meta = {
  title: 'features/Auth',
  component: Auth,
} satisfies Meta<typeof Auth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  
};