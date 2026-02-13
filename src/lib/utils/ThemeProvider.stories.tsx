import type { Meta, StoryObj } from '@storybook/react'
import { ThemeProvider, useTheme } from './theme'

function ThemeDemo() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div style={{ padding: 32, background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <h2>Current theme: {theme}</h2>
      <button onClick={toggleTheme} style={{ padding: '8px 16px', marginTop: 16, cursor: 'pointer' }}>
        Toggle Theme
      </button>
      <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 8 }}>
        <p style={{ color: 'var(--text-primary)' }}>Primary text</p>
        <p style={{ color: 'var(--text-secondary)' }}>Secondary text</p>
        <p style={{ color: 'var(--text-muted)' }}>Muted text</p>
        <p style={{ color: 'var(--accent-red)' }}>Accent red</p>
        <p style={{ color: 'var(--accent-purple-light)' }}>Accent purple</p>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Utilities/ThemeProvider',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  ),
}
