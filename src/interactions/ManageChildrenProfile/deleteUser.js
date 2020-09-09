//APIS
import apis from '../../api';


export default {

    async deleteKid(kidId) {
        await apis.deleteKid(kidId)
    },

    async removeKidFromParents(parentId, kidId) {
        await apis.removeKidFromParent(parentId, kidId)
    },

}