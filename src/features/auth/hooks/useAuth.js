import { useContext, useEffect } from "react";
import { AuthContext } from "../../services/auth.context";
import { login, register, logout, getMe } from "../../services/auth.api";
export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user)
            return data
        } catch (error) {
            // bubble up so the form can render the failure reason
            throw error
        } finally {
            setLoading(false);
        }
    }


    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password });
            setUser(data.user)
            return data
        } catch (error) {
            // bubble up so the form can render the failure reason
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout()
            setUser(null)
        } catch {
            // clear the session locally regardless
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        const getAndSetUser = async () => {
            setLoading(true);
            try {

                const data = await getMe()
                setUser(data.user)
            } catch (err) { } finally {
                setLoading(false)
            }
        }

        getAndSetUser()

    }, [])
    return { user, loading, handleLogin, handleRegister, handleLogout }
}