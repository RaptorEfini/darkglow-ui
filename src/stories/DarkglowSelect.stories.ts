import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Select',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-select value="operator">
      <option value="pilot">Pilot</option>
      <option value="operator" selected>Operator</option>
      <option value="observer">Observer</option>
    </darkglow-select>
  `
};

export const Accent: Story = {
  render: () => `
    <darkglow-select variant="accent" value="night">
      <option value="day">Day Shift</option>
      <option value="night">Night Shift</option>
      <option value="ghost">Ghost Shift</option>
    </darkglow-select>
  `
};

export const Invalid: Story = {
  render: () => `
    <darkglow-select invalid value="">
      <option value="" selected>Select a route</option>
      <option value="alpha">Alpha Route</option>
      <option value="delta">Delta Route</option>
    </darkglow-select>
  `
};
