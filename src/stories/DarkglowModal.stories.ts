import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  title: 'Darkglow/Modal',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <darkglow-modal open title="Transmission Locked" eyebrow="Control Room">
      <darkglow-typography>
        The uplink is stable. You can continue routing signals through the primary channel.
      </darkglow-typography>
      <div slot="footer">
        <darkglow-button variant="ghost">Dismiss</darkglow-button>
        <darkglow-button>Continue</darkglow-button>
      </div>
    </darkglow-modal>
  `
};

export const Danger: Story = {
  render: () => `
    <darkglow-modal open variant="danger" title="Critical Voltage" eyebrow="Emergency Layer">
      <darkglow-typography>
        Reactor output exceeded the safe threshold. Manual shutdown is recommended.
      </darkglow-typography>
      <div slot="footer">
        <darkglow-button variant="ghost">Ignore</darkglow-button>
        <darkglow-button variant="danger">Shutdown</darkglow-button>
      </div>
    </darkglow-modal>
  `
};
