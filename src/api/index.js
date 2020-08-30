import Axios from 'axios';

// const REACT_APP_BACKEND_URL = 'something backend hosted website'

const api = Axios.create({
    withCredentials: true,
    // headers: {
    //     'Accept' : "application/json",
    //     "Content-Type": "x-www-form-urlencoded"
    // },
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
})

const getAllParents = payload => api.get('/parent', payload)
const registerParent = payload => api.post('/parents',payload)


const createKid = payload => api.post('/kids',payload)
const updateKid = (payload, id) => api.put(`/kids/${id}` , payload)
const deleteKid = id => api.delete(`/kids/${id}`)
const getAllChildByParentID = id => api.get(`/kids/all/${id}`)
const getOneKid = id => api.get(`/kids/${id}`)

const login = payload => api.post('/login', payload)
const isAuthenticated = payload => api.post('/isAuthenticated', payload)
const getAuthUser = () => api.get('/user');
const logOut = () => api.get('/logout')



const apis = {
    getAllParents,
    registerParent,
    login,
    isAuthenticated,
    getAuthUser,
    logOut,
    createKid,
    updateKid,
    deleteKid,
    getAllChildByParentID,
    getOneKid
    // getParentById
}

export default apis