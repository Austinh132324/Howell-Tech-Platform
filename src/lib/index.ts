// Components
export { default as StarField } from '../components/StarField'
export { default as Leaderboard } from '../components/Leaderboard'
export { default as Footer } from '../components/Footer'
export { default as Navbar } from '../components/Navbar'
export { default as Ethan } from '../components/Ethan'

// Utilities
export { hello } from './utils/hello'
export { matchResponse, kb } from './utils/matchResponse'
export {
  getLeaderboard,
  addScore,
  isHighScore,
} from './utils/leaderboard'
export type { LeaderboardEntry } from './utils/leaderboard'
export { ThemeProvider, useTheme } from './utils/theme'

// Styles - consumers get base styles when importing this package
import '../styles/global.css'
import '../styles/Navbar.css'
import '../styles/Footer.css'
import '../styles/Leaderboard.css'
import '../components/Ethan.css'
