import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Ethan from './Ethan'
import './Ethan.css'

const meta: Meta<typeof Ethan> = {
  title: 'Components/Ethan',
  component: Ethan,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ minHeight: '100vh', background: '#0b0b1a' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Ethan>

export const Default: Story = {}
