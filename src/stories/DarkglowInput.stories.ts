import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Input',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => '<darkglow-input placeholder="Enter transmission"></darkglow-input>'
};

export const Secondary: Story = {
  render: () => '<darkglow-input variant="secondary" value="Neon Circuit"></darkglow-input>'
};

export const Accent: Story = {
  render: () => '<darkglow-input variant="accent" placeholder="Accent channel"></darkglow-input>'
};

export const Invalid: Story = {
  render: () => '<darkglow-input invalid value="ERR-42"></darkglow-input>'
};

export const Disabled: Story = {
  render: () => '<darkglow-input disabled value="Offline"></darkglow-input>'
};
