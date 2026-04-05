import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Typography',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Title: Story = {
  render: () => '<darkglow-typography type="title">Darkglow Interface</darkglow-typography>'
};

export const Subtitle: Story = {
  render: () => '<darkglow-typography type="subtitle" variant="secondary">Secondary Signal</darkglow-typography>'
};

export const LowGlow: Story = {
  render: () => '<darkglow-typography type="title" glow-spread="0.35">Reduced Glow</darkglow-typography>'
};

export const LightOff: Story = {
  render: () => '<darkglow-typography type="subtitle" light-off>Light Off State</darkglow-typography>'
};
