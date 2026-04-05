import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Textarea',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => '<darkglow-textarea placeholder="Write the mission brief"></darkglow-textarea>'
};

export const Secondary: Story = {
  render: () => '<darkglow-textarea variant="secondary" value="Backup generators aligned.\nAwaiting ignition."></darkglow-textarea>'
};

export const Invalid: Story = {
  render: () => '<darkglow-textarea invalid value="Message truncated..."></darkglow-textarea>'
};
