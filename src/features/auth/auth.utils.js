/**
 * Shared validation + error-message helpers for the login and register forms.
 * Pure functions only — no state, no requests.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;

/**
 * Turn an axios/network failure into something a person can act on.
 */
export const getApiErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
    if (!error) return fallback;

    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (serverMessage) return serverMessage;

    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        return "We can't reach the server right now. Check your connection and try again.";
    }
    if (error.code === "ECONNABORTED") {
        return "The request timed out. Please try again.";
    }
    if (status === 401 || status === 403) {
        return "Those credentials didn't work. Please try again.";
    }
    if (status === 429) {
        return "Too many attempts. Please wait a moment before trying again.";
    }
    if (status >= 500) {
        return "Our server ran into a problem. Please try again in a moment.";
    }

    return fallback;
};

export const validateLogin = ({ email, password }) => {
    const errors = {};

    if (!email.trim()) {
        errors.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    if (!password) {
        errors.password = "Password is required.";
    }

    return errors;
};

export const validateRegister = ({ username, email, password, confirmPassword }) => {
    const errors = {};

    if (!username.trim()) {
        errors.username = "Username is required.";
    } else if (username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(username.trim())) {
        errors.username = "Use letters, numbers, dots, dashes or underscores only.";
    }

    if (!email.trim()) {
        errors.email = "Email address is required.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
        errors.email = "Enter a valid email address.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
        errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
};

/**
 * 0–4 score used only to draw the strength meter.
 */
export const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: "" };

    let score = 0;
    if (password.length >= MIN_PASSWORD_LENGTH) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) score += 1;

    const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
    return { score, label: labels[score] };
};
