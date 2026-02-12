import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import StarField from '../components/StarField'
import Footer from '../components/Footer'
import '../styles/Home.css'

const phrases = [
  'Building production apps with React & Angular',
  'Full stack engineer at JB Hunt',
  'University of Arkansas  |  Class of 2022  |  4.0 GPA',
  'Passionate about clean architecture & CI/CD',
  'Exploring AI agents & MCP servers',
  'Module Federation & micro-frontend enthusiast',
]

const techItems = [
  'TypeScript', 'JavaScript', 'Python', 'Angular', 'React', 'Redux',
  'Vite', 'Cypress', 'Azure DevOps', 'Kafka', 'Elasticsearch', 'Git',
  'CI/CD', 'Module Federation', 'Power BI', 'HTML/CSS', 'Agile', 'REST APIs',
]

const kb: Record<string, string> = {
  greeting: "Hey! I'm Austin Howell, a Software Engineer currently working at JB Hunt. I graduated from the University of Arkansas in 2022 with a 4.0 GPA in Computer Science. What would you like to know about me?",
  experience: "I've been a Software Engineer at JB Hunt since January 2023. I work on full-stack applications using Angular, React, and Azure DevOps. Before that, I was a Software Development Intern at CTTP in Fayetteville from 2018-2020 where I helped build their website. Most recently, I've also been doing consulting work since March 2025, leading a team of 2 to build a Vite React app with an embedded Power BI reporting portal.",
  jbhunt: "At JB Hunt, I've done a ton of impactful work! I mentored 3 interns, converted our CI/CD pipelines to YAML for anytime deployments instead of weekly ones, modernized our monorepo to use Module Federation, led an Angular-to-React conversion that improved dev time by 25% and load times by 15%, and owned an entire feature end-to-end using Kafka messaging with Elasticsearch. I also helped implement AI developer and code review agents connected to Azure DevOps and MCP servers.",
  skills: "My main tech stack includes TypeScript, JavaScript, Python, Angular, React, Redux, Vite, Cypress for testing, and Azure DevOps for CI/CD. I also work with Kafka, Elasticsearch, Module Federation for micro-frontends, Power BI, and Git. I'm big on clean architecture, agile methodologies, and REST APIs.",
  education: "I graduated with a Computer Science degree from the University of Arkansas in 2022 with a 4.0 GPA. My coursework included Data Structures, Algorithms, Software Engineering, Database Management, and Computer Networks.",
  projects: "I've got several projects I'm proud of! This personal platform site (austinshowell.dev), the Power BI Reporting Portal I built as a consultant, the AI Dev Agents I helped implement at JB Hunt, the Kafka Feature Pipeline I owned end-to-end, and the Module Federation Monorepo modernization. You can check them all out on my Projects page!",
  ai_agents: "One of the coolest things I've worked on is researching and implementing AI-powered developer, tester, and code review agents. They integrate with Azure DevOps and internal design system MCP servers to ensure design-compliant development. It's like having AI teammates that help write, test, and review code!",
  kafka: "I took full ownership of a feature that used Kafka messaging to orchestrate Elasticsearch queries. I built the Angular UI, set up CI/CD pipelines across DEV, TEST, and PROD environments, and iterated on it with user feedback over 4 months. It replaced constant endpoint polling with event-driven architecture.",
  module_federation: "I modernized our legacy monorepo UI to use Webpack Module Federation, which enabled independent deployments of micro-frontends. I also led the Angular-to-React conversion that resulted in 25% faster development time and 15% faster load times. Plus, I added component Cypress testing to gate production builds.",
  consulting: "Since March 2025, I've been working as a Software Engineer Consultant. I designed and led a team of 2 developers to create a Vite React application with an embedded Power BI reporting portal. I also handled the Python backend connectors and managed pods in DEV and PROD containers. We used Redux for state management across the app.",
  activities: "I'm a member of ACM (Association for Computing Machinery), participated in HackAR 2024, and I volunteer as a Code.org Hour of Code mentor to help teach kids programming. I love giving back to the community!",
  contact: "You can reach me at AH132324@hotmail.com or connect with me on LinkedIn! I'm always happy to chat about software engineering, potential opportunities, or tech in general.",
  hiring: "I'm always open to hearing about exciting opportunities! I'm passionate about building production-quality software, especially with React, Angular, and modern web technologies. If you have something interesting, feel free to reach out at AH132324@hotmail.com or connect on LinkedIn.",
  intern: "My first tech role was a Software Development Intern at CTTP in Fayetteville, AR from June 2018 to October 2020. I helped create the company website and an online classes application using the Symphony framework, working with HTML, CSS, and JavaScript.",
  cypress: "I'm a big advocate for testing. At JB Hunt, I implemented end-to-end testing using Cypress, including setting up artifact builds on the Azure pipeline for production deployments. I led the effort to add component Cypress testing on all existing and new development, which significantly reduced bugs making it to production.",
  hobbies: "Outside of coding, I'm a big gamer! I also enjoy building side projects and tinkering with new tech. Check out my Games page - I've got some browser games you can play right now!",
  fallback: "That's a great question! I might not have a specific answer for that, but I'd love to chat more. Feel free to ask about my work experience, tech stack, projects, education, or anything else about my background. Or reach out to the real me at AH132324@hotmail.com!",
}

function matchResponse(input: string): string {
  const q = input.toLowerCase()

  if (/^(hi|hey|hello|sup|yo|what'?s? up)/.test(q)) return kb.greeting
  if (/(jb\s*hunt|j\.?b\.?\s*hunt)/.test(q)) return kb.jbhunt
  if (/(experience|work|job|career|where do you work|what do you do|professional)/.test(q)) return kb.experience
  if (/(consult|power\s*bi|reporting|vite react)/.test(q)) return kb.consulting
  if (/(skill|tech|stack|language|framework|tools|what.*use|what.*know|technologies)/.test(q)) return kb.skills
  if (/(school|university|college|education|degree|gpa|graduat|arkansas|uark)/.test(q)) return kb.education
  if (/(project|build|portfolio|proud|ship)/.test(q)) return kb.projects
  if (/(ai|agent|mcp|artificial intelligence|machine learn)/.test(q)) return kb.ai_agents
  if (/(kafka|elastic|pipeline|event.?driven|messaging)/.test(q)) return kb.kafka
  if (/(module.?federation|monorepo|micro.?frontend|webpack)/.test(q)) return kb.module_federation
  if (/(cypress|test|qa|quality)/.test(q)) return kb.cypress
  if (/(intern|cttp|first.*job|start)/.test(q)) return kb.intern
  if (/(acm|hack|volunteer|code\.org|activit|leadership|extracurricular)/.test(q)) return kb.activities
  if (/(contact|email|reach|linkedin|connect)/.test(q)) return kb.contact
  if (/(hir|opportunit|available|open to|looking for|recruit|resume)/.test(q)) return kb.hiring
  if (/(hobby|hobbies|fun|free time|game|gaming|outside|interest)/.test(q)) return kb.hobbies

  return kb.fallback
}

interface ChatMessage {
  text: string
  type: 'bot' | 'user'
}

const suggestions = [
  { label: 'Tech stack?', query: 'What tech stack do you work with?' },
  { label: 'JB Hunt experience?', query: 'Tell me about your experience at JB Hunt' },
  { label: 'Best projects?', query: 'What projects are you most proud of?' },
  { label: 'Education?', query: 'Where did you go to school?' },
  { label: 'Hiring?', query: 'Are you open to new opportunities?' },
]

export default function Home() {
  const [typedText, setTypedText] = useState('')
  const [gpaCount, setGpaCount] = useState(0)
  const [projectsCount, setProjectsCount] = useState(0)
  const [yearsCount, setYearsCount] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hey! I'm an AI version of Austin. Ask me about my experience, skills, projects, or anything else. What would you like to know?", type: 'bot' },
  ])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const chatMessagesRef = useRef<HTMLDivElement>(null)

  // Typing effect
  useEffect(() => {
    let phraseIdx = 0
    let charIdx = 0
    let deleting = false
    let pauseTime = 0
    let timerId: ReturnType<typeof setTimeout>

    function typeLoop() {
      const phrase = phrases[phraseIdx]
      if (!deleting) {
        charIdx++
        if (charIdx > phrase.length) {
          pauseTime++
          if (pauseTime > 60) {
            deleting = true
            pauseTime = 0
          }
          timerId = setTimeout(typeLoop, 16)
          return
        }
      } else {
        charIdx--
        if (charIdx < 0) {
          charIdx = 0
          deleting = false
          phraseIdx = (phraseIdx + 1) % phrases.length
          pauseTime = 0
        }
      }
      setTypedText(phrase.substring(0, charIdx))
      timerId = setTimeout(typeLoop, deleting ? 25 : 50)
    }

    timerId = setTimeout(typeLoop, 1500)
    return () => clearTimeout(timerId)
  }, [])

  // Stat counter animation
  useEffect(() => {
    const duration = 1200 // ms total
    const steps = 40
    const interval = duration / steps

    let step = 0
    const timerId = setTimeout(() => {
      const countInterval = setInterval(() => {
        step++
        if (step >= steps) {
          setGpaCount(4.0)
          setProjectsCount(5)
          setYearsCount(3)
          clearInterval(countInterval)
          return
        }
        const progress = step / steps
        setGpaCount(parseFloat((4.0 * progress).toFixed(1)))
        setProjectsCount(Math.round(5 * progress))
        setYearsCount(Math.round(3 * progress))
      }, interval)
    }, 1200)

    return () => clearTimeout(timerId)
  }, [])

  // Scroll chat to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { text, type: 'user' }])
    setChatInput('')
    setShowSuggestions(false)
    setIsTyping(true)

    const delay = 600 + Math.random() * 800
    setTimeout(() => {
      setIsTyping(false)
      const response = matchResponse(text)
      setMessages(prev => [...prev, { text: response, type: 'bot' }])
    }, delay)
  }, [])

  const handleChatKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(chatInput)
  }

  const marqueeItems = [...techItems, ...techItems]

  return (
    <>
      <StarField shootingStars nebulaOrbs geoShapes />

      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-content">
          <div className="status-badge">
            <div className="status-dot" />
            <span>Available for opportunities</span>
          </div>

          <div className="avatar-wrap">
            <div className="avatar-ring-pulse" />
            <div className="avatar-ring-outer" />
            <div className="avatar-ring" />
            <div className="avatar">AH</div>
          </div>

          <h1 className="home-title">Austin Howell</h1>
          <p className="home-subtitle">Software Engineer &bull; Creator &bull; Gamer</p>
          <div className="typed-line">
            {typedText}
            <span className="cursor" />
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">{gpaCount.toFixed(1)}</div>
              <div className="stat-label">GPA</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{projectsCount}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{yearsCount}</div>
              <div className="stat-label">Years Exp</div>
            </div>
            <div className="stat-item">
              <div className="stat-num" style={{ fontSize: '1.4rem' }}>Full-Stack</div>
              <div className="stat-label">Developer</div>
            </div>
          </div>

          <div className="home-cards">
            <Link to="/aboutme" className="home-card">
              <div className="card-icon">&#128100;</div>
              <div className="card-title">About Me</div>
              <div className="card-desc">Resume &amp; background</div>
            </Link>
            <Link to="/projects" className="home-card">
              <div className="card-icon">&#128640;</div>
              <div className="card-title">Projects</div>
              <div className="card-desc">What I'm building</div>
            </Link>
            <Link to="/games" className="home-card">
              <div className="card-icon">&#127918;</div>
              <div className="card-title">Games</div>
              <div className="card-desc">Play in the browser</div>
            </Link>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Explore</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ===== TECH MARQUEE ===== */}
      <div className="marquee-section">
        <div className="marquee-track">
          {marqueeItems.map((tech, i) => (
            <span className="marquee-item" key={i}>{tech}</span>
          ))}
        </div>
      </div>

      {/* ===== AI CHAT ===== */}
      <section className="chat-section">
        <div className="chat-header">
          <h2>Ask Me Anything</h2>
          <p>Chat with an AI version of me &mdash; powered by my resume</p>
        </div>
        <div className="chat-box">
          <div className="chat-title-bar">
            <div className="chat-avatar-sm">AH</div>
            <div className="chat-title-info">
              <div className="chat-title-name">Austin Howell</div>
              <div className="chat-title-status">
                <div className="dot" />
                Online
              </div>
            </div>
          </div>

          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, i) => (
              <div className={`msg ${msg.type}`} key={i}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="msg bot">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {showSuggestions && (
            <div className="suggestions">
              {suggestions.map((s, i) => (
                <button
                  className="suggestion-btn"
                  key={i}
                  onClick={() => sendMessage(s.query)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <div className="chat-input-wrap">
            <input
              type="text"
              className="chat-input"
              placeholder="Ask me anything..."
              autoComplete="off"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={handleChatKeyDown}
            />
            <button className="chat-send" onClick={() => sendMessage(chatInput)}>
              Send
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
