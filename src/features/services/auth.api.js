import api, { setToken, clearToken } from "./api.client"

// register new user
export async function register({ username, email, password }) {
    try {
        // send register data to backend
        const response = await api.post(
            '/api/auth/register',
            { username, email, password },
        )

        // keep the token so later requests authenticate without the cookie
        setToken(response.data?.token)

        // return backend response
        return response.data

    } catch (error) {
        // hand it to the caller so the UI can show it
        throw error
    }
}

// login user
export async function login({ email, password }) {
    try {
        // send login data
        const response = await api.post(
            '/api/auth/login',
            { email, password }
        )

        // keep the token so later requests authenticate without the cookie
        setToken(response.data?.token)

        // return response data
        return response.data

    } catch (error) {
        throw error
    }
}

// logout current user
export async function logout() {
    try {
        // call logout api
        const response = await api.get('/api/auth/logout')

        return response.data

    } catch {
        // logging out locally is what matters — ignore a failed server call
    } finally {
        // drop the token either way, so the session really ends
        clearToken()
    }
}

// get logged in user data
export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data

    } catch (error) {
        // an expired or rejected token is worth dropping; a network blip is not
        const status = error.response?.status
        if (status === 401 || status === 403) {
            clearToken()
        }
        // not signed in
        return null
    }
}