import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Fader',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => '<darkglow-fader value="64">Channel 1</darkglow-fader>'
};

export const Horizontal: Story = {
  render: () => '<darkglow-fader orientation="horizontal" variant="secondary" value="32">Pan</darkglow-fader>'
};

export const Disabled: Story = {
  render: () => '<darkglow-fader value="90" disabled variant="danger">Master</darkglow-fader>'
};
