//APIS
import apis from '../../api';

//UTILS
import utils from './utils'


export default {

    async updateKid(editedKid) {
        const {
            _id,
            name,
            bDay,
            maxScreenTime,
            icon,
            isPlaying
        } = editedKid;
        const kidId = _id
        const payload = {
            name,
            bDay,
            age: utils.calAge(bDay),
            maxScreenTime,
            icon,
            isPlaying
        }
        await apis.updateKid(payload, kidId)
    }

}