import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Pad',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => '<darkglow-pad number="1">Kick</darkglow-pad>'
};

export const Active: Story = {
  render: () => '<darkglow-pad number="8" active variant="accent">Loop</darkglow-pad>'
};

export const Disabled: Story = {
  render: () => '<darkglow-pad number="16" disabled variant="danger">Mute</darkglow-pad>'
};
