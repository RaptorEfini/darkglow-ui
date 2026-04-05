import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Knob',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => '<darkglow-knob value="72">Volume</darkglow-knob>'
};

export const Secondary: Story = {
  render: () => '<darkglow-knob variant="secondary" value="38">Filter</darkglow-knob>'
};

export const Disabled: Story = {
  render: () => '<darkglow-knob variant="danger" value="18" disabled>Drive</darkglow-knob>'
};
