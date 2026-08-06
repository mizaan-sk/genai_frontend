import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const THEME_STORAGE_KEY = "interview-studio-theme";

const isValid = (value) => value === "day" || value === "night";

const getInitialTheme = () => {
    if (typeof window === "undefined") return "night";
    try {
        const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (isValid(saved)) return saved;
    } catch {
        /* storage blocked — fall back to the system preference */
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "day" : "night";
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", theme === "day" ? "#f6f4f1" : "#0a0a0e");
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch {
            /* ignore */
        }
    }, [theme]);

    const toggleTheme = () => setTheme((current) => (current === "night" ? "day" : "night"));

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
