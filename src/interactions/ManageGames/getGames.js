//APIS
import apis from '../../api';


export default {

    async getAllGames() {
        const allGames = await apis.getAllGames()
        const allGamesData = allGames.data.data
        return allGamesData
    },

    async getGameObject(gameName) {
        const gameData = await apis.getGameID(gameName);
        const gameObject = gameData.data.data[0];
        return gameObject
    },

    async getGameReviewer(gameName) {
        const gameObject = await this.getGameObject(gameName);
        const reviews = gameObject.reviews;
        const reviewerNames = [];
        for (const review of reviews) {
            const parentData = await apis.getParentNameByID(review.parentID);
            reviewerNames.push(parentData.data.data.name)
        }
        return reviewerNames
    }

}