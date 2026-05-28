import axios from "axios"

// create axios instance
const api = axios.create({
    baseURL: "http://localhost:3000", // backend url
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
        // show error in console
        console.log(error)
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
        console.log(error)
    }
}

// logout current user
export async function logout() {
    try {
        // call logout api
        const response = await api.get('/api/auth/logout')

        return response.data

    } catch (error) {
        console.log(error)
    }
}

// get logged in user data
export async function getMe() {
    try {
        const response = await api.get('/api/auth/get-me')

        return response.data

    } catch (error) {
        console.log(error)
        return null
    }
}