import type { Meta, StoryObj } from '@storybook/react'
import Leaderboard from './Leaderboard'
import '../styles/Leaderboard.css'

const meta: Meta<typeof Leaderboard> = {
  title: 'Components/Leaderboard',
  component: Leaderboard,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      // Seed some fake leaderboard data into localStorage for the story
      const key = 'leaderboard-demo-game'
      const entries = [
        { name: 'Alice', score: 9500, date: '2/13/2026' },
        { name: 'Bob', score: 8200, date: '2/12/2026' },
        { name: 'Charlie', score: 7100, date: '2/11/2026' },
        { name: 'Dana', score: 6000, date: '2/10/2026' },
        { name: 'Eve', score: 4500, date: '2/9/2026' },
      ]
      localStorage.setItem(key, JSON.stringify(entries))
      return <Story />
    },
  ],
}

export default meta
type Story = StoryObj<typeof Leaderboard>

export const WithScores: Story = {
  args: {
    game: 'demo-game',
  },
}

export const Empty: Story = {
  args: {
    game: 'nonexistent-game',
  },
}
