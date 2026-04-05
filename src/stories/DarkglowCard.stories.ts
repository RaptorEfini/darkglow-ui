import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Card',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-card>
      <darkglow-typography type="subtitle">Default Card</darkglow-typography>
      <darkglow-typography>Useful information inside a card.</darkglow-typography>
    </darkglow-card>
  `
};

export const PrimaryElevated: Story = {
  render: () => `
    <darkglow-card variant="primary" elevated>
      <darkglow-typography type="subtitle" variant="primary">Primary Elevated</darkglow-typography>
      <darkglow-typography>Accent card with stronger glow and shadow.</darkglow-typography>
    </darkglow-card>
  `
};

export const Outlined: Story = {
  render: () => `
    <darkglow-card variant="outlined">
      <darkglow-typography type="subtitle">Outlined Card</darkglow-typography>
      <darkglow-typography>Low-emphasis container for secondary content.</darkglow-typography>
    </darkglow-card>
  `
};
