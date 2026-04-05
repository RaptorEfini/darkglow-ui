import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Alert',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const ConfirmAction: Story = {
  render: () => `
    <darkglow-alert
      open
      title="Delete Preset"
      eyebrow="Operator Confirmation"
      message="This will permanently remove the synth preset from the live rack."
      confirmText="Delete"
      cancelText="Keep"
      show-cancel
      variant="danger"
      icon="!"
    ></darkglow-alert>
  `
};

export const SuccessStyle: Story = {
  render: () => `
    <darkglow-alert
      open
      title="Signal Calibrated"
      eyebrow="Status Update"
      message="RGB routing was applied successfully across all active channels."
      confirmText="Perfect"
      variant="secondary"
      icon="OK"
    ></darkglow-alert>
  `
};
