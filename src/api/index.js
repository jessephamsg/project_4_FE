import Axios from 'axios';


const api = Axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
})

//PARENTS
const getAllParents = payload => api.get('/parent', payload);
const registerParent = payload => api.post('/parents', payload);

const createKid = payload => api.post('/kids',payload)
const updateKid = (payload, id) => api.put(`/kids/${id}` , payload)
const deleteKid = id => api.delete(`/kids/${id}`)
const getAllChildByParentID = id => api.get(`/kids/all/${id}`)
const getOneKid = id => api.get(`/kids/${id}`)

//AUTHENTICATION
const login = payload => api.post('/login', payload);
const isAuthenticated = payload => api.post('/isAuthenticated', payload);
const getAuthUser = () => api.get('/user');
const logOut = () => api.get('/logout');

//GAME STATS
const getGameID = gameName => api.get(`/games/${gameName}`);
const createKidStats = (kidID, gameID, payload) => api.post(`/kids/${kidID}/game/${gameID}`, payload);
const updateKidStats = (kidID, gameID, level, payload) => api.put(`/kids/${kidID}/game/${gameID}?level=${level}`, payload);


const apis = {
    getAllParents,
    registerParent,
    login,
    isAuthenticated,
    getAuthUser,
    logOut,
    createKid,
    getAllChildByParentID,
    getGameID,
    createKidStats,
    updateKidStats,
    updateKid,
    deleteKid,
    getAllChildByParentID,
    getOneKid
    // getParentById
}


export default apis