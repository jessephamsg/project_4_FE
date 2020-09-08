import Axios from 'axios';


const api = Axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
})

//PARENTS
const getAllParents = payload => api.get('/parent', payload);
const registerParent = payload => api.post('/parents', payload);
const removeKidFromParent = (parentId, kidId) => api.put(`/parents/${parentId}/del/${kidId}`);
const getParentNameByID = (parentID) => api.get(`/parents/${parentID}`);

//KIDS
const createKid = payload => api.post('/kids',payload)
const updateKid = (payload, id) => api.put(`/kids/${id}`, payload)
const deleteKid = id => api.delete(`/kids/${id}`)
const getAllChildByParentID = id => api.get(`/kids/all/${id}`)
const getOneChildByParentID = (kidName, parentID) => api.get(`kids/${kidName}?parent=${parentID}`);
const getOneKid = id => api.get(`/kids/${id}`)
const getAllChildStats = (parentID, kidName) => api.get(`/kids/${kidName}/report?parent=${parentID}`);

//AUTHENTICATION
const login = payload => api.post('/login', payload);
const isAuthenticated = payload => api.post('/isAuthenticated', payload);
const getAuthUser = () => api.get('/user');
const logOut = () => api.get('/logout');
const checkPassword = (password,parentId) => api.post(`/checkPassword/${parentId}`, password)

//GAMES
const getGameID = gameName => api.get(`/games/${gameName}`);
const getAllGames = () => api.get(`/games`);
const getGameByID = id => api.get(`/game/${id}`);

//GAME STATS
const createKidStats = (parentID, kidName, gameID, payload) => api.post(`/kids/${kidName}/game/${gameID}?parent=${parentID}`, payload);
const updateKidStats = (parentID, kidName, gameID, level, payload) => api.put(`/kids/${kidName}/game/${gameID}?level=${level}&parent=${parentID}`, payload);
const getStatsByStatsID = (statsID) => api.get(`stats/${statsID}`)

const apis = {
    getAllParents,
    registerParent,
    login,
    isAuthenticated,
    getAuthUser,
    logOut,
    createKid,
    getAllChildByParentID,
    getOneChildByParentID,
    getGameID,
    createKidStats,
    updateKidStats,
    updateKid,
    deleteKid,
    getOneKid,
    removeKidFromParent,
    checkPassword,
    getAllGames,
    getParentNameByID,
    getAllChildStats,
    getStatsByStatsID,
    getGameByID
}


export default apis