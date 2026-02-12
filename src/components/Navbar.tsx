import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

interface NavbarProps {
  links?: { label: string; href: string }[]
}

export default function Navbar({ links }: NavbarProps) {
  return (
    <div className="top-bar">
      <Link to="/">&larr; Home</Link>
      {links && (
        <div className="nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
      )}
    </div>
  )
}
