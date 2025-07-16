import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Button',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => '<darkglow-button>Primary</darkglow-button>'
};

export const Secondary: Story = {
  render: () => '<darkglow-button variant="secondary">Secondary</darkglow-button>'
};

export const Danger: Story = {
  render: () => '<darkglow-button variant="danger">Danger</darkglow-button>'
};
