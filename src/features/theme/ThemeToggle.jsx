import "./theme-toggle.scss";
import { useTheme } from "./useTheme.js";

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
);

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isNight = theme === "night";

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            role="switch"
            aria-checked={isNight}
            aria-label={isNight ? "Switch to day view" : "Switch to night view"}
            title={isNight ? "Switch to day view" : "Switch to night view"}
        >
            <span className="theme-toggle__thumb" aria-hidden="true" />
            <span className="theme-toggle__icon theme-toggle__icon--day" aria-hidden="true">
                <SunIcon />
            </span>
            <span className="theme-toggle__icon theme-toggle__icon--night" aria-hidden="true">
                <MoonIcon />
            </span>
        </button>
    );
};

export default ThemeToggle;
