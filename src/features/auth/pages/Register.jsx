import React, { useState } from 'react'
import "../auth.form.scss"
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';
import PageLoader from '../../../components/PageLoader.jsx';
import { getApiErrorMessage, getPasswordStrength, validateRegister, MIN_PASSWORD_LENGTH } from '../auth.utils.js';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
)

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5" /></svg>
)

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [formError, setFormError] = useState("")
    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate();

    const strength = getPasswordStrength(password)
    const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword

    const setFieldError = (field, message) => {
        setErrors((current) => {
            const next = { ...current }
            if (message) next[field] = message
            else delete next[field]
            return next
        })
    }

    // live mismatch feedback while typing the confirmation
    const handlePasswordChange = (value) => {
        setFormError("")
        setPassword(value)
        setFieldError('password', null)
        if (confirmPassword) {
            setFieldError('confirmPassword', value === confirmPassword ? null : "Passwords do not match.")
        }
    }

    const handleConfirmPasswordChange = (value) => {
        setFormError("")
        setConfirmPassword(value)
        setFieldError('confirmPassword', !value || value === password ? null : "Passwords do not match.")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateRegister({ username, email, password, confirmPassword })
        setErrors(validation)
        setFormError("")
        if (Object.keys(validation).length > 0) return

        try {
            await handleRegister({ username, email, password })
            navigate("/")
        } catch (error) {
            setFormError(getApiErrorMessage(error, "We couldn't create your account. Please try again."))
        }
    }

    if (loading) {
        return <PageLoader title="Creating your account" hint="Setting up your workspace — this only takes a second." />
    }

    return (
        <AuthLayout
            eyebrow="Get started"
            title="Create your account"
            subtitle="Build your first interview plan in under a minute."
            footer={<>Already have an account? <Link to="/login">Sign in</Link></>}
        >
            <form onSubmit={handleSubmit} noValidate>
                {formError && (
                    <div className="form-alert" role="alert">
                        <span className="form-alert__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        </span>
                        <span>{formError}</span>
                    </div>
                )}

                <Field
                    id="username"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setFormError(""); setFieldError('username', null) }}
                    placeholder="jane.doe"
                    autoComplete="username"
                    error={errors.username}
                    icon={<UserIcon />}
                />

                <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setFormError(""); setFieldError('email', null) }}
                    placeholder="you@company.com"
                    autoComplete="email"
                    error={errors.email}
                    icon={<MailIcon />}
                />

                <Field
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                    autoComplete="new-password"
                    error={errors.password}
                    icon={<LockIcon />}
                    trailing={password && (
                        <div className={`strength strength--${strength.score}`}>
                            <div className='strength__track' aria-hidden="true">
                                {[1, 2, 3, 4].map((step) => (
                                    <span key={step} className={step <= strength.score ? 'is-on' : ''} />
                                ))}
                            </div>
                            <span className='strength__label'>{strength.label}</span>
                        </div>
                    )}
                />

                <Field
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    error={errors.confirmPassword}
                    icon={<LockIcon />}
                    trailing={passwordsMatch && !errors.confirmPassword && (
                        <p className='field__success'><CheckIcon /> Passwords match</p>
                    )}
                />

                <button className='button primary-button block-button'>
                    Create account
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>

                <p className='form-note'>
                    By creating an account you agree to our <a href='#'>Terms</a> and <a href='#'>Privacy Policy</a>.
                </p>
            </form>
        </AuthLayout>
    )
}

export default Register
