import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Container',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-container>
      <darkglow-typography type="title" glow-spread="0.6">Session Controls</darkglow-typography>
      <darkglow-typography>Container for grouped controls and sections.</darkglow-typography>
      <div class="button-row">
        <darkglow-button>Play</darkglow-button>
        <darkglow-button variant="secondary">Cue</darkglow-button>
        <darkglow-button variant="danger">Stop</darkglow-button>
      </div>
    </darkglow-container>
  `
};
