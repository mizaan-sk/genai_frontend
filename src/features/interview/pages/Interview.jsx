import React, { useState } from 'react'
import "../style/interview.scss"
import { useParams } from "react-router";
// ─── Sample Data (replace with API response) ───────────────────
const data = {
  matchScore: 0.9,
  technicalQuestions: [
    {
      question: "You've worked with Redux. Can you describe a scenario where you'd choose Redux over React's Context API or useState, and vice-versa? What are the trade-offs?",
      intention: "To assess understanding of different state management patterns, their pros/cons, and ability to make architectural decisions based on project needs.",
      answer: "I would choose Redux for complex, global state management in large applications where state needs to be predictable, centralized, and have a clear, traceable flow. Its benefits include powerful developer tools for debugging, middleware for side effects, and a robust ecosystem. The trade-off is increased boilerplate and a steeper learning curve. I'd use React's Context API for simpler, application-wide concerns like theme settings or user preferences to avoid prop drilling without the overhead of Redux. useState is ideal for component-local state that doesn't need to be shared widely."
    },
    {
      question: "Describe your process for integrating a third-party API (e.g., a CRM API like HubSpot or Salesforce) into a Next.js application. How do you handle common issues like network errors, rate limiting, or data validation?",
      intention: "To evaluate practical experience with API integration, security considerations, error handling, and robust data management in a Next.js environment.",
      answer: "For integrating third-party APIs in Next.js, I typically use Next.js API Routes to proxy requests, especially for sensitive data or server-side interactions. This hides API keys from the client and ensures CORS compliance. For error handling, I wrap API calls in try-catch blocks, providing user-friendly error messages. For network errors, I might implement retry mechanisms with exponential backoff. Rate limiting is managed by respecting Retry-After headers. Data validation is done server-side using libraries like Yup or Zod."
    },
    {
      question: "Your resume mentions SEO and performance optimization. How do you ensure your Next.js applications are both responsive across devices and performant?",
      intention: "To probe understanding of practical optimization techniques for both responsiveness and performance within Next.js.",
      answer: "For responsiveness, I adopt a mobile-first approach using CSS Flexbox or Grid, media queries, and utility-first frameworks like Tailwind CSS. For performance, Next.js provides image optimization with next/image, automatic code splitting, and pre-rendering (SSR/SSG/ISR). I also implement lazy loading, memoization with useMemo and useCallback, and regularly use Lighthouse and Web Vitals to audit performance bottlenecks."
    },
    {
      question: "Describe how async/await has improved asynchronous programming compared to Promises or callbacks.",
      intention: "To confirm proficiency with modern JavaScript asynchronous patterns and ability to articulate their benefits.",
      answer: "Async/await makes async code look and behave more like synchronous code, greatly enhancing readability compared to callback hell or chaining .then() calls. It simplifies error handling with standard try-catch blocks and makes the control flow much easier to reason about."
    },
    {
      question: "Describe a typical Git workflow you follow when collaborating on a team project. How do you handle merge conflicts?",
      intention: "To assess practical experience with version control and team collaboration best practices.",
      answer: "I follow a feature branching workflow. For each new feature or bug fix, I create a new branch. After completing the feature, I push my branch to GitHub and create a Pull Request for code review. When merge conflicts arise, I pull the latest changes from the target branch, resolve differences manually by choosing which changes to keep, remove Git conflict markers, then commit to finalize the merge."
    },
    {
      question: "What are the key advantages of using Next.js over a purely client-side React application for building corporate websites and e-commerce platforms?",
      intention: "To evaluate in-depth knowledge of Next.js and its specific benefits for real-world applications.",
      answer: "Next.js offers significant advantages: its pre-rendering capabilities (SSR, SSG, ISR) allow search engines to easily index fully-rendered content. Performance is enhanced through automatic code splitting, server-side rendering for faster initial page loads, and image optimization. Additionally, Next.js provides built-in API routes, file-system routing, and streamlines the entire development process."
    },
    {
      question: "Describe how you would set up a basic RESTful API with Node.js and Express.js, including routes, middleware, and database connection.",
      intention: "To check foundational backend skills.",
      answer: "Initialize with npm init, install express and mongoose. Set up server.js with Express, add express.json() and cors middleware. Connect to MongoDB with mongoose.connect(). Create separate route files, define endpoints using router.get/post/put/delete, each interacting with MongoDB models. Start the server with app.listen()."
    }
  ],
  behavioralQuestions: [
    {
      question: "Can you describe a challenging situation where you had to work with design or marketing to achieve a solution?",
      intention: "To assess collaboration skills, ability to manage expectations, resolve conflicts, and work effectively with non-technical stakeholders.",
      answer: "At Realatte Ventures, the marketing team requested a complex lead capture form with multiple CRM integrations. I bridged the gap between design, marketing, and technical feasibility by scheduling meetings with both teams, presenting technical challenges and proposing alternative solutions. The outcome was a highly effective lead generation form that met all goals while being performant, reducing manual content dependency by 40%."
    },
    {
      question: "Tell me about a time you faced a complex technical problem in a project. How did you approach it, and what was the solution?",
      intention: "To evaluate problem-solving methodology, resilience, and ability to learn from challenges.",
      answer: "In my Food Delivery Web Application, I faced issues with real-time order status updates. Initially using polling led to excessive network requests. I researched WebSockets and implemented Socket.IO with an event-driven architecture for order status updates. This significantly improved user experience and scalability."
    },
    {
      question: "Can you give an example of a time you had to quickly learn a new technology or tool for a project?",
      intention: "To assess adaptability, proactiveness in learning, and ability to apply new knowledge effectively.",
      answer: "At Realatte, I took the initiative to learn n8n to automate lead data enrichment before pushing to HubSpot. I built workflows that fetched additional public lead information, validated email formats, and updated the CRM. The impact reduced manual data entry by several hours per week and improved CRM data quality."
    },
    {
      question: "How do you see this Frontend Developer role contributing to your goal of becoming a full-stack developer?",
      intention: "To understand career aspirations, assess alignment with the role, and gauge self-driven learning.",
      answer: "This role is crucial for building a strong frontend foundation, understanding how UI impacts backend design, and how APIs should be consumed efficiently. I'm actively expanding my backend knowledge through personal MERN stack projects, exploring PostgreSQL, and deepening my understanding of Node.js and Express.js."
    }
  ],
  skillGaps: [
    { skill: "Frontend Testing Frameworks (Jest, React Testing Library, Cypress)", severity: "medium" },
    { skill: "Advanced React Hooks and Performance Patterns", severity: "low" }
  ],
  preparationPlan: [
    { day: 1, focus: "React Fundamentals & Best Practices", tasks: ["Review core React concepts: components, props, state, lifecycle.", "Deep dive into essential hooks: useState, useEffect, useContext.", "Practice using useCallback and useMemo for performance optimization.", "Understand component re-rendering triggers and prevention techniques."] },
    { day: 2, focus: "Advanced JavaScript & Asynchronous Patterns", tasks: ["Review advanced ES6+ features: destructuring, spread, modules, closures.", "Master Promises, async/await, and error handling in asynchronous code.", "Understand the JavaScript Event Loop and its implications for performance."] },
    { day: 3, focus: "API Integration, Data Flow & Next.js Specifics", tasks: ["Review RESTful API principles, HTTP methods, and status codes.", "Practice secure API calls and data fetching strategies in Next.js.", "Deepen understanding of SSR, SSG, ISR, API Routes, next/image, next/link."] },
    { day: 4, focus: "Responsive Design, Accessibility & Performance", tasks: ["Review modern CSS layout techniques: Flexbox, Grid, and media queries.", "Learn about Web Vitals (LCP, FID, CLS) and how to optimize for them.", "Practice image optimization, lazy loading, and code splitting strategies.", "Familiarize with basic accessibility (ARIA attributes, semantic HTML)."] },
    { day: 5, focus: "Behavioral Questions & Project Deep Dive", tasks: ["Prepare answers for common behavioral questions using the STAR method.", "Review resume projects: articulate technical decisions and impact.", "Practice explaining your role in collaborative projects.", "Articulate your career aspirations and how they align with the role."] },
    { day: 6, focus: "Backend Basics & Testing Introduction", tasks: ["Quick refresh on Node.js and Express.js: server setup, routes, middleware.", "Review basic MongoDB operations with Mongoose (CRUD).", "Read introductory articles on Jest and React Testing Library.", "Understand the benefits of writing tests for frontend applications."] },
    { day: 7, focus: "Mock Interview & Feedback", tasks: ["Conduct a full mock interview (both technical and behavioral sections).", "Seek specific feedback on clarity of answers and communication style.", "Identify areas for final review before the actual interview."] }
  ]
}

const SECTIONS = [
  { id: 'technical', label: 'Technical Questions', icon: '⚙️' },
  { id: 'behavioral', label: 'Behavioral Questions', icon: '🧠' },
  { id: 'roadmap', label: 'Road Map', icon: '🗺️' },
]

const severityColor = { medium: 'gap-tag--medium', low: 'gap-tag--low', high: 'gap-tag--high' }

// ─── Question Card ─────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const { interviewId } = useParams();

console.log(interviewId);
  const [open, setOpen] = useState(false)
  return (
    <div className={`q-card ${open ? 'q-card--open' : ''}`}>
      <button className="q-card__header" onClick={() => setOpen(!open)}>
        <span className="q-card__num">Q{index + 1}</span>
        <p className="q-card__question">{item.question}</p>
        <span className="q-card__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="q-card__body">
          <div className="q-card__intention">
            <span className="q-card__intention-label">🎯 Interviewer's Intent</span>
            <p>{item.intention}</p>
          </div>
          <div className="q-card__answer">
            <span className="q-card__answer-label">💡 Suggested Answer</span>
            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Roadmap Day Card ──────────────────────────────────────────
const DayCard = ({ item }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`day-card ${open ? 'day-card--open' : ''}`}>
      <button className="day-card__header" onClick={() => setOpen(!open)}>
        <div className="day-card__badge">Day {item.day}</div>
        <p className="day-card__focus">{item.focus}</p>
        <span className="day-card__chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="day-card__tasks">
          {item.tasks.map((task, i) => (
            <li key={i}><span className="task-dot" />  {task}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────
const Interview = () => {
  const [activeSection, setActiveSection] = useState('technical')

  const renderContent = () => {
    if (activeSection === 'technical') return (
      <div className="content-section">
        <div className="content-section__title">
          <h2>⚙️ Technical Questions</h2>
          <span className="count-badge">{data.technicalQuestions.length} Questions</span>
        </div>
        <p className="content-section__subtitle">Click any question to reveal the interviewer's intent and a suggested answer.</p>
        <div className="q-list">
          {data.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
        </div>
      </div>
    )

    if (activeSection === 'behavioral') return (
      <div className="content-section">
        <div className="content-section__title">
          <h2>🧠 Behavioral Questions</h2>
          <span className="count-badge">{data.behavioralQuestions.length} Questions</span>
        </div>
        <p className="content-section__subtitle">Prepare your STAR-method answers for these situational questions.</p>
        <div className="q-list">
          {data.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
        </div>
      </div>
    )

    if (activeSection === 'roadmap') return (
      <div className="content-section">
        <div className="content-section__title">
          <h2>🗺️ 7-Day Preparation Road Map</h2>
          <span className="count-badge">7 Days</span>
        </div>
        <p className="content-section__subtitle">A structured daily plan to maximize your interview readiness.</p>
        <div className="day-list">
          {data.preparationPlan.map((d, i) => <DayCard key={i} item={d} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="interview">

      {/* ── Left Sidebar ── */}
      <aside className="sidebar sidebar--left">
        <div className="sidebar__score">
          <p className="sidebar__score-label">Match Score</p>
          <div className="score-ring">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" className="ring-bg" />
              <circle cx="40" cy="40" r="32" className="ring-fill"
                strokeDasharray={`${2 * Math.PI * 32 * data.matchScore} ${2 * Math.PI * 32}`}
                strokeDashoffset="0"
              />
            </svg>
            <span className="score-ring__text">{Math.round(data.matchScore * 100)}%</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`nav-item ${activeSection === s.id ? 'nav-item--active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="nav-item__icon">{s.icon}</span>
              <span className="nav-item__label">{s.label}</span>
              {activeSection === s.id && <span className="nav-item__dot" />}
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {renderContent()}
      </main>

      {/* ── Right Sidebar ── */}
      <aside className="sidebar sidebar--right">
        <div className="sidebar__section">
          <h3 className="sidebar__heading">Skill Gaps</h3>
          <div className="gap-tags">
            {data.skillGaps.map((g, i) => (
              <span key={i} className={`gap-tag ${severityColor[g.severity]}`}>
                {g.skill.split('(')[0].trim()}
              </span>
            ))}
          </div>
          <div className="gap-legend">
            <span className="legend-dot legend-dot--high" /> High &nbsp;
            <span className="legend-dot legend-dot--medium" /> Medium &nbsp;
            <span className="legend-dot legend-dot--low" /> Low
          </div>
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__heading">Quick Stats</h3>
          <ul className="stats-list">
            <li><span className="stats-list__label">Technical Qs</span><span className="stats-list__value">{data.technicalQuestions.length}</span></li>
            <li><span className="stats-list__label">Behavioral Qs</span><span className="stats-list__value">{data.behavioralQuestions.length}</span></li>
            <li><span className="stats-list__label">Prep Days</span><span className="stats-list__value">{data.preparationPlan.length}</span></li>
            <li><span className="stats-list__label">Skill Gaps</span><span className="stats-list__value">{data.skillGaps.length}</span></li>
          </ul>
        </div>

        <div className="sidebar__section">
          <h3 className="sidebar__heading">Today's Focus</h3>
          {(() => {
            const today = data.preparationPlan[0]
            return (
              <div className="today-card">
                <div className="today-card__day">Day {today.day}</div>
                <p className="today-card__focus">{today.focus}</p>
                <ul className="today-card__tasks">
                  {today.tasks.slice(0, 2).map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )
          })()}
        </div>
      </aside>

    </div>
  )
}

export default Interview