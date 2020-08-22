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

const apis = {
    getAllParents,
    registerParent
}

export default apis