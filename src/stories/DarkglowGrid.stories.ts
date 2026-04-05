import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Grid',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-grid columns="4" gap="12px">
      <darkglow-pad number="1"></darkglow-pad>
      <darkglow-pad number="2" variant="secondary"></darkglow-pad>
      <darkglow-pad number="3" variant="danger"></darkglow-pad>
      <darkglow-pad number="4" variant="accent"></darkglow-pad>
    </darkglow-grid>
  `
};

export const Outlined: Story = {
  render: () => `
    <darkglow-grid columns="3" gap="16px" variant="outlined" max-width="520px">
      <darkglow-card><darkglow-typography>One</darkglow-typography></darkglow-card>
      <darkglow-card><darkglow-typography>Two</darkglow-typography></darkglow-card>
      <darkglow-card><darkglow-typography>Three</darkglow-typography></darkglow-card>
    </darkglow-grid>
  `
};
