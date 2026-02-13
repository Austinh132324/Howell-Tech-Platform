import type { Meta, StoryObj } from '@storybook/react'
import StarField from './StarField'

const meta: Meta<typeof StarField> = {
  title: 'Components/StarField',
  component: StarField,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    shootingStars: { control: 'boolean' },
    nebulaOrbs: { control: 'boolean' },
    geoShapes: { control: 'boolean' },
    density: { control: { type: 'range', min: 2000, max: 20000, step: 1000 } },
  },
}

export default meta
type Story = StoryObj<typeof StarField>

export const Default: Story = {
  args: {},
}

export const WithShootingStars: Story = {
  args: {
    shootingStars: true,
  },
}

export const WithNebulaOrbs: Story = {
  args: {
    nebulaOrbs: true,
  },
}

export const FullEffects: Story = {
  args: {
    shootingStars: true,
    nebulaOrbs: true,
    geoShapes: true,
  },
}
