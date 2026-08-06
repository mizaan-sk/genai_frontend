import axios from "axios"

// create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // backend url
    withCredentials: true // send cookies with request
})

// register new user
export async function register({ username, email, password }) {
    try {
        // send register data to backend
        const response = await api.post(
            '/api/auth/register',
            { username, email, password },
        )

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
    }
}

// get logged in user data
export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data

    } catch {
        // not signed in
        return null
    }
}