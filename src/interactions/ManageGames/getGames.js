//APIS
import apis from '../../api';

export default {

    async getAllGames () {
        const allGames = await apis.getAllGames()
        const allGamesData = allGames.data.data
        return allGamesData
    },
}