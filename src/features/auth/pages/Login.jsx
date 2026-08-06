import { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../components/AuthLayout.jsx';
import Field from '../components/Field.jsx';
import PageLoader from '../../../components/PageLoader.jsx';
import { getApiErrorMessage, validateLogin } from '../auth.utils.js';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
)

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)

const Login = () => {
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const [formError, setFormError] = useState('')
    const navigate = useNavigate();

    const clearFieldError = (field) => {
        setFormError('')
        setErrors((current) => {
            if (!current[field]) return current
            const next = { ...current }
            delete next[field]
            return next
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateLogin({ email, password })
        setErrors(validation)
        setFormError('')
        if (Object.keys(validation).length > 0) return

        try {
            await handleLogin({ email, password })
            navigate("/")
        } catch (error) {
            setFormError(getApiErrorMessage(error, "We couldn't sign you in. Please check your email and password."))
        }
    }
    // console.log(handleSubmit)
    if (loading) {
        return <PageLoader title="Signing you in" hint="One moment while we verify your account." />
    }
    return (
        <AuthLayout
            eyebrow="Welcome back"
            title="Sign in to your studio"
            subtitle="Pick up where you left off — your plans are waiting."
            footer={<>Don't have an account? <Link to="/register">Create one</Link></>}
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
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
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
                    onChange={(e) => { setPassword(e.target.value); clearFieldError('password') }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    error={errors.password}
                    icon={<LockIcon />}
                />

                <button className='button primary-button block-button'>
                    Sign in
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
            </form>
        </AuthLayout>
    )
}

export default Login
