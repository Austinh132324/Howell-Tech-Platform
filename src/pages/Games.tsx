import { Link } from 'react-router-dom'
import '../styles/Games.css'

const games = [
  {
    to: '/games/checkers',
    icon: '\u26AB',
    title: 'Checkers',
    desc: 'Classic checkers against an AI opponent',
  },
]

export default function Games() {
  return (
    <div className="games-page">
      <Link to="/" className="games-back-link">
        &larr; Back
      </Link>

      <h1>Games</h1>
      <p className="games-subtitle">Pick a game and play right in your browser.</p>

      <div className="games-grid">
        {games.map((g) => (
          <Link key={g.to} to={g.to} className="games-card">
            <span className="games-icon">{g.icon}</span>
            <div className="games-info">
              <div className="games-title">{g.title}</div>
              <div className="games-desc">{g.desc}</div>
            </div>
            <span className="games-arrow">&rsaquo;</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
