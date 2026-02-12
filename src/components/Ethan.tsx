import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import './Ethan.css'

/* ── Sassy quips by page ── */
const pageQuips: Record<string, string[]> = {
  '/': [
    "Welcome to Austin's site! I live here now.",
    "8 years of experience? I've been here since the Big Bang.",
    "Click around! I dare you.",
    "I'm Ethan. Yes, I'm always watching.",
    "This homepage is my kingdom.",
  ],
  '/aboutme': [
    "Oh, reading about Austin? He's alright I guess.",
    "Fun fact: I taught Austin everything he knows.",
    "That resume? I wrote it. You're welcome, Austin.",
    "Scroll down. There's more. I'll wait.",
  ],
  '/projects': [
    "Look at all these projects I definitely helped with.",
    "Click one. I promise they don't bite.",
    "Austin built these. I supervised.",
  ],
  '/games': [
    "THE ARCADE! This is my favorite place!",
    "I bet I could beat you at all of these.",
    "Pick a game. Any game. I'll judge your skills.",
    "Checkers? Snake? Choose wisely.",
  ],
  '/games/checkers': [
    "Ooh, Checkers! Try not to embarrass yourself.",
    "King me! Oh wait, wrong side.",
    "I'm watching every move you make...",
  ],
  '/games/snake': [
    "Don't crash into yourself. Basic survival skills.",
    "My high score is infinity. Don't ask.",
    "Left, right, up, down. How hard can it be?",
  ],
  '/games/tetris': [
    "Tetris! The game that haunts your dreams.",
    "I see shapes when I close my eyes now.",
    "Pro tip: the long piece always comes... eventually.",
  ],
  '/games/tictactoe': [
    "Play on Hard. I believe in you. Kind of.",
    "X or O? Choose your destiny.",
    "Spoiler: the AI doesn't go easy on you.",
  ],
  '/tools': [
    "Tools! For when you want to be productive.",
    "Productivity? On THIS site? Bold.",
  ],
  '/terminal': [
    "Ah, the terminal. Type 'help' if you're lost.",
    "Try typing 'ethan'. You won't regret it.",
    "I basically AM the terminal.",
  ],
  '/analytics': [
    "Numbers! Data! I love data!",
    "I've been tracking you. For analytics. Obviously.",
  ],
}

const defaultQuips = [
  "Hey! I'm Ethan. Click me!",
  "I'm bored. Entertain me.",
  "Still here. Still judging.",
  "I wonder what this button does...",
  "Don't mind me, just vibing.",
  "*jumps around menacingly*",
  "Is anyone even reading these?",
  "I should get paid for this.",
]

/* ── Chat responses ── */
function getEthanResponse(input: string): string {
  const lower = input.toLowerCase().trim()

  if (lower === '' ) return "Cat got your tongue?"
  if (/^(hi|hey|hello|sup|yo)/.test(lower)) return "Hey hey! What's up? 👋"
  if (/how are you/.test(lower)) return "I'm a pixel art guy living in a browser. Living the dream!"
  if (/your name/.test(lower)) return "I'm Ethan! The E is silent. Just kidding, it's not."
  if (/who made you/.test(lower)) return "Austin did. But between us, I made myself."
  if (/meaning of life/.test(lower)) return "42. Next question."
  if (/joke/.test(lower)) return "Why do programmers prefer dark mode? Because light attracts bugs! 🐛"
  if (/favorite/.test(lower) && /game/.test(lower)) return "Checkers. I'm undefeated. (I don't have hands to play, but still.)"
  if (/love/.test(lower)) return "I love you too. In a platonic, pixel-to-human way."
  if (/bye|goodbye|see ya/.test(lower)) return "Leaving already?! Fine. I'll just... jump around alone. 😢"
  if (/help/.test(lower)) return "Try clicking around the site! There are games, tools, and cool stuff everywhere."
  if (/ugly|dumb|stupid|hate/.test(lower)) return "Wow. Rude. I'm telling Austin."
  if (/secret/.test(lower)) return "🤫 If I told you, it wouldn't be a secret."
  if (/age|old/.test(lower)) return "I was born when you loaded this page. So... pretty young."
  if (/austin/.test(lower)) return "Austin? Great guy. Owes me rent though."
  if (/ethan/.test(lower)) return "That's me! The one and only. ✨"
  if (/cool/.test(lower)) return "I know I'm cool. Thanks for noticing."
  if (/bored/.test(lower)) return "Go play Snake! Or Tetris! Or just talk to me more. I'm needy."
  if (/thank/.test(lower)) return "You're welcome! I accept payment in cookies. 🍪"
  if (/weather/.test(lower)) return "It's always sunny inside a browser! ☀️"
  if (/sing/.test(lower)) return "🎵 Never gonna give you up, never gonna let you down... 🎵"
  if (/dance/.test(lower)) return "*does a little pixel dance* 💃 You can't see it but trust me it's epic."
  if (/food|hungry|eat/.test(lower)) return "I survive on pure CSS energy. Nom nom."
  if (/sleep|tired/.test(lower)) return "Sleep? I don't sleep. I watch. Always."

  const fallbacks = [
    "Interesting... tell me more.",
    "I have no idea what that means, but I support you.",
    "Hmm, that's a you problem.",
    "Bold statement. I respect it.",
    "I'll pretend I understood that.",
    "Cool cool cool cool cool.",
    "Error 404: clever response not found.",
    "*nods wisely* Yes. Absolutely. Definitely.",
    "I'm going to need a minute to process that one.",
    "Did you try turning it off and on again?",
  ]
  return fallbacks[Math.floor(Math.random() * fallbacks.length)]
}

/* ── Movement targets ── */
function getRandomPosition() {
  const padding = 80
  const x = padding + Math.random() * (window.innerWidth - padding * 2)
  const y = padding + Math.random() * (window.innerHeight - padding * 2)
  return { x, y }
}

/* ── Ethan component ── */
export default function Ethan() {
  const location = useLocation()
  const [pos, setPos] = useState({ x: window.innerWidth - 120, y: window.innerHeight - 160 })
  const [targetPos, setTargetPos] = useState<{ x: number; y: number } | null>(null)
  const [facing, setFacing] = useState<'left' | 'right'>('left')
  const [animation, setAnimation] = useState<'idle' | 'walk' | 'jump' | 'wave'>('idle')
  const [bubble, setBubble] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ from: 'ethan' | 'user'; text: string }[]>([])
  const [chatInput, setChatInput] = useState('')
  const [minimized, setMinimized] = useState(false)

  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animFrameRef = useRef<number>(0)
  const posRef = useRef(pos)
  const targetRef = useRef(targetPos)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { posRef.current = pos }, [pos])
  useEffect(() => { targetRef.current = targetPos }, [targetPos])

  /* ── Show a quip in bubble ── */
  const showBubble = useCallback((text: string, duration = 4000) => {
    if (chatOpen) return
    setBubble(text)
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => setBubble(null), duration)
  }, [chatOpen])

  /* ── Random quips on a timer ── */
  useEffect(() => {
    const interval = setInterval(() => {
      if (chatOpen || minimized) return
      const path = location.pathname
      const quips = pageQuips[path] || defaultQuips
      const allQuips = [...quips, ...defaultQuips]
      showBubble(allQuips[Math.floor(Math.random() * allQuips.length)])
    }, 8000 + Math.random() * 7000)
    return () => clearInterval(interval)
  }, [location.pathname, chatOpen, minimized, showBubble])

  /* ── Page change quip ── */
  useEffect(() => {
    const path = location.pathname
    const quips = pageQuips[path] || defaultQuips
    setTimeout(() => showBubble(quips[Math.floor(Math.random() * quips.length)]), 1000)
  }, [location.pathname, showBubble])

  /* ── Random movement ── */
  useEffect(() => {
    function scheduleMove() {
      const delay = 4000 + Math.random() * 8000
      moveTimer.current = setTimeout(() => {
        if (chatOpen) { scheduleMove(); return }
        const target = getRandomPosition()
        setTargetPos(target)
        const dx = target.x - posRef.current.x
        setFacing(dx < 0 ? 'left' : 'right')

        // Randomly decide: walk or jump
        const willJump = Math.random() > 0.5
        setAnimation(willJump ? 'jump' : 'walk')

        scheduleMove()
      }, delay)
    }
    scheduleMove()
    return () => { if (moveTimer.current) clearTimeout(moveTimer.current) }
  }, [chatOpen])

  /* ── Animate toward target ── */
  useEffect(() => {
    function animate() {
      const target = targetRef.current
      if (target) {
        const current = posRef.current
        const dx = target.x - current.x
        const dy = target.y - current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 3) {
          setTargetPos(null)
          setAnimation('idle')
        } else {
          const speed = Math.min(2.5, dist * 0.04)
          const nx = current.x + (dx / dist) * speed
          const ny = current.y + (dy / dist) * speed
          setPos({ x: nx, y: ny })
        }
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }
    animFrameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [])

  /* ── Auto-scroll chat ── */
  useEffect(() => {
    if (chatEndRef.current && typeof chatEndRef.current.scrollIntoView === 'function') {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  /* ── Click handler ── */
  function handleClick() {
    if (minimized) {
      setMinimized(false)
      showBubble("I'm back baby! Miss me?")
      return
    }
    setBubble(null)
    setChatOpen(prev => {
      if (!prev) {
        setChatMessages(msgs =>
          msgs.length === 0
            ? [{ from: 'ethan', text: "Hey! You clicked me! What's on your mind? 💬" }]
            : msgs
        )
      }
      return !prev
    })
  }

  function handleSend() {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setChatInput('')
    setChatMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setTimeout(() => {
      setChatMessages(prev => [...prev, { from: 'ethan', text: getEthanResponse(userMsg) }])
    }, 300 + Math.random() * 500)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSend()
  }

  function handleMinimize(e: React.MouseEvent) {
    e.stopPropagation()
    setChatOpen(false)
    setMinimized(true)
    setBubble(null)
  }

  if (minimized) {
    return (
      <button className="ethan-minimized" onClick={handleClick} aria-label="Bring back Ethan">
        <span className="ethan-minimized-icon">🤖</span>
        <span className="ethan-minimized-label">Ethan</span>
      </button>
    )
  }

  return (
    <div
      className={`ethan-container ethan-${animation} ethan-facing-${facing}`}
      style={{ left: pos.x, top: pos.y }}
    >
      {/* Speech bubble */}
      {bubble && !chatOpen && (
        <div className="ethan-bubble">
          <span>{bubble}</span>
          <div className="ethan-bubble-tail" />
        </div>
      )}

      {/* Chat window */}
      {chatOpen && (
        <div className="ethan-chat">
          <div className="ethan-chat-header">
            <span>Chat with Ethan</span>
            <button className="ethan-chat-minimize" onClick={handleMinimize}>−</button>
            <button className="ethan-chat-close" onClick={() => setChatOpen(false)}>×</button>
          </div>
          <div className="ethan-chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`ethan-chat-msg ethan-chat-${msg.from}`}>
                {msg.from === 'ethan' && <span className="ethan-chat-avatar">🤖</span>}
                <span className="ethan-chat-text">{msg.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="ethan-chat-input-row">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Say something..."
              className="ethan-chat-input"
              autoFocus
            />
            <button className="ethan-chat-send" onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      {/* The pixel art character */}
      <div className="ethan-sprite" onClick={handleClick} title="Click me!">
        <div className="ethan-body">
          {/* Hat */}
          <div className="ep ep-hat-1" />
          <div className="ep ep-hat-2" />
          <div className="ep ep-hat-brim" />
          {/* Head */}
          <div className="ep ep-head" />
          {/* Eyes */}
          <div className="ep ep-eye-l" />
          <div className="ep ep-eye-r" />
          {/* Mouth */}
          <div className="ep ep-mouth" />
          {/* Body */}
          <div className="ep ep-torso" />
          {/* Arms */}
          <div className="ep ep-arm-l" />
          <div className="ep ep-arm-r" />
          {/* Legs */}
          <div className="ep ep-leg-l" />
          <div className="ep ep-leg-r" />
        </div>
        <div className="ethan-shadow" />
      </div>
    </div>
  )
}
