import BrandMark from "../../../components/BrandMark.jsx";
import ThemeToggle from "../../theme/ThemeToggle.jsx";

const HIGHLIGHTS = [
    {
        title: "Questions from the actual role",
        copy: "Technical and behavioural rounds derived from the job description you paste in.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /><circle cx="12" cy="12" r="10" /></svg>
        ),
    },
    {
        title: "Model answers, not filler",
        copy: "Every question ships with the intent behind it and an answer worth rehearsing.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        ),
    },
    {
        title: "A road map to the interview",
        copy: "A day-by-day plan that closes the gaps between your profile and the role.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
        ),
    },
];

const AuthLayout = ({ eyebrow, title, subtitle, children, footer }) => (
    <div className="auth-page">
        <div className="page-wash" aria-hidden="true" />

        {/* ── Left: brand story ── */}
        <aside className="auth-aside">
            <BrandMark to="/" tagline="Interview prep" />

            <div className="auth-aside__body">
                <h2 className="auth-aside__headline">
                    Walk in <em>prepared</em>, not hopeful.
                </h2>
                <ul className="auth-aside__list">
                    {HIGHLIGHTS.map((item) => (
                        <li key={item.title}>
                            <span className="auth-aside__icon">{item.icon}</span>
                            <span>
                                <strong>{item.title}</strong>
                                <span>{item.copy}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="auth-aside__foot">
                Your resume and notes stay tied to your account &mdash; nothing is shared.
            </p>
        </aside>

        {/* ── Right: form ── */}
        <main className="auth-main">
            <div className="auth-main__bar">
                <span className="auth-main__mobile-brand">
                    <BrandMark to="/" />
                </span>
                <ThemeToggle />
            </div>

            <div className="auth-card">
                <header className="auth-card__header">
                    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                    <h1>{title}</h1>
                    {subtitle && <p>{subtitle}</p>}
                </header>

                {children}
            </div>

            {footer && <p className="auth-main__footer">{footer}</p>}
        </main>
    </div>
);

export default AuthLayout;
