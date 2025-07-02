module.exports = (
	layer,
	componentName
) => `import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ${componentName} } from './${componentName}';

const meta = {
  title: '${layer}/${componentName}',
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  
};`
