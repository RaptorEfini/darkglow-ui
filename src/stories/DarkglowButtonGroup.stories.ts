import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/ButtonGroup',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Horizontal: Story = {
  render: () => `
    <darkglow-button-group>
      <darkglow-button>Play</darkglow-button>
      <darkglow-button variant="secondary">Stop</darkglow-button>
      <darkglow-button variant="danger">Record</darkglow-button>
    </darkglow-button-group>
  `
};

export const Vertical: Story = {
  render: () => `
    <darkglow-button-group orientation="vertical" align="start">
      <darkglow-button>One</darkglow-button>
      <darkglow-button variant="secondary">Two</darkglow-button>
      <darkglow-button variant="danger">Three</darkglow-button>
    </darkglow-button-group>
  `
};
