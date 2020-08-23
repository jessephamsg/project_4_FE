import Axios from 'axios';

// const REACT_APP_BACKEND_URL = 'something backend hosted website'

const api = Axios.create({
    withCredentials: true,
    // headers: {
    //     Accept : "application/json",
    //     "Content-Type": "x-www-form-urlencoded"
    // },
    // baseURL: 'http://localhost:4000',
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
})

const getAllParents = payload => api.get('/parent', payload)
const registerParent = payload => api.post('/parents',payload)
const login = payload => api.post('/login', payload)
const isAuthenticated = id => api.get(`/isAuthenticated/${id}`)


const apis = {
    getAllParents,
    registerParent,
    login,
    isAuthenticated
}

export default apis