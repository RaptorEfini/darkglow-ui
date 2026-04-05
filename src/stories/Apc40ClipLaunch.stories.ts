import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Apc40ClipLaunch',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => '<apc40-clip-launch></apc40-clip-launch>'
};

export const ActivePads: Story = {
  render: () => '<apc40-clip-launch active-pads="1,5,9,13,17,21,25,29"></apc40-clip-launch>'
};

export const AccentVariant: Story = {
  render: () => '<apc40-clip-launch pad-variant="accent" gap="8px"></apc40-clip-launch>'
};
