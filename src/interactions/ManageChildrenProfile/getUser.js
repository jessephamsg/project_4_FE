//LOCAL STORAGE
import local from '../../storage/localStorage';

//APIS
import apis from '../../api';

//UTILS
import utils from './utils'


export default {

    async getAuthUser () {
        const currentUser = await apis.getAuthUser()
        console.log(currentUser)
        // const parentID = currentUser.data.data._id 
        // return parentID
        const currentUserData = currentUser.data.data
        return currentUserData
    },

    async buildChildPayload (name, bDay, maxScreenTime, icon) {
        const result = await this.getAuthUser();
        const parentID = result._id
        const payload = {
            parentID,
            name,
            bDay,
            age: utils.calAge(bDay),
            maxScreenTime,
            icon
        }
        return payload
    }, 

    async getAllChildByParentID (currentLocalID) {
        const result = await apis.getAllChildByParentID(currentLocalID);
        return result
    },

    getCurrentLocalID () {
        const currentId = local.get('currentId');
        return currentId
    }

}