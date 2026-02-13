import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import { ThemeProvider } from '../lib/utils/theme'
import '../styles/Navbar.css'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: {},
}

export const WithLinks: Story = {
  args: {
    links: [
      { label: 'Docs', href: '#docs' },
      { label: 'GitHub', href: '#github' },
      { label: 'Blog', href: '#blog' },
    ],
  },
}
