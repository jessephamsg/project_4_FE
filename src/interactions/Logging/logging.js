//LOCAL STORAGE
import local from '../../storage/localStorage';

//APIS
import apis from '../../api';


export default {

    async logout () {
        const logout = await apis.logOut();
        console.log(logout.data)
        local.del('currentUser')
        local.del('currentID')
    },

    async login (state) {
        const login = await apis.login(state)
        const { _id, name} = login.data.currentUser
        console.log(login.data)
        local.set("currentId", _id) // set localstorage a token
        local.set("currentUser",name)
        return {_id, name}
    }

}