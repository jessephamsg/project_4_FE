//APIS
import apis from '../../api';

export default {

    async getAllGames () {
        const allGames = await apis.getAllGames()
        console.log(allGames)
        const allGamesData = allGames.data.data
        return allGamesData
    },
}