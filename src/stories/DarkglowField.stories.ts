import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Field',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-field label="Pilot Name" hint="Visible on the live overlay">
      <darkglow-input placeholder="Nova Unit"></darkglow-input>
    </darkglow-field>
  `
};

export const WithError: Story = {
  render: () => `
    <darkglow-field label="Signal Code" error="Invalid frequency. Use 6 digits." invalid>
      <darkglow-input value="12A9" invalid></darkglow-input>
    </darkglow-field>
  `
};
