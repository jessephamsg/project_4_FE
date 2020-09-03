//LOCAL STORAGE
import local from '../../storage/localStorage';

//APIS
import apis from '../../api';


export default {
    
    async createKid (payload) {
        await apis.createKid(payload)
    },

    async registerParent (payload) {
        const response = await apis.registerParent(payload);
        return response
    }

}