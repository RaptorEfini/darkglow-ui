import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/ColorInput',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  render: () => '<darkglow-color-input value="#ff00ff"></darkglow-color-input>'
};

export const Secondary: Story = {
  render: () => '<darkglow-color-input variant="secondary" value="#00e5ff"></darkglow-color-input>'
};

export const InField: Story = {
  render: () => `
    <darkglow-field label="Accent Color" hint="Used for pads and indicators">
      <darkglow-color-input variant="accent" value="#f9c80e"></darkglow-color-input>
    </darkglow-field>
  `
};
