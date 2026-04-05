import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Layout',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-layout title="Darkglow Layout Story">
      <div slot="header">
        <darkglow-typography type="subtitle">Header Area</darkglow-typography>
      </div>
      <darkglow-container>
        <darkglow-typography>Main content area with scrollable body.</darkglow-typography>
      </darkglow-container>
      <div slot="footer">
        <darkglow-typography>Footer Status</darkglow-typography>
      </div>
    </darkglow-layout>
  `
};
