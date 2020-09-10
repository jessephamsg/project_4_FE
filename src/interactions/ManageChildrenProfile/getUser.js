//LOCAL STORAGE
import local from '../../storage/localStorage';
import LocalGameState from '../../storage/gameLocalState';

//APIS
import apis from '../../api';

//UTILS
import utils from './utils'


export default {

    async getAuthUser() {
        const currentUser = await apis.getAuthUser()
        const currentUserData = currentUser.data.data
        return currentUserData
    },

    async buildChildPayload(name, bDay, maxScreenTime, icon) {
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

    async getAllChildByParentID(currentLocalID) {
        const result = await apis.getAllChildByParentID(currentLocalID);
        return result
    },

    getCurrentLocalID() {
        const currentId = local.get('currentId');
        return currentId
    },

    async getAllChildStats(parentID, kidName) {
        const result = await apis.getAllChildStats(parentID, kidName);
        const statsData = result.data.data
        const numberOfGamesPlayed = statsData.length;
        let statsObjects = [];
        for (let i = 0; i < numberOfGamesPlayed; i++) {
            for (let y = 0; y < statsData[i].length; y++) {
                statsObjects.push(await this.getStatsByID(statsData[i][y]))
            }
        }
        return {
            numberOfGamesPlayed,
            statsData,
            statsObjects
        }
    },

    async getStatsByID(statsID) {
        const result = await apis.getStatsByStatsID(statsID);
        const gameStatsObject = result.data.data
        return gameStatsObject
    },

    async getRecentStats(kidName) {
        const gamesPlayedArr = this.getGameNames(kidName)
        const recentGameObjects = []
        for (const gameName of gamesPlayedArr) {
            const result = await apis.getGameID(gameName)
            recentGameObjects.push(result.data.data[0])
        }
        return recentGameObjects;
    },

    async getGameMostPlayed(playFreq, statsObjects) {
        let i = playFreq.indexOf(Math.max(...playFreq));
        const gameMostPlayed = await apis.getGameByID(statsObjects[i].gameID);
        const gameObj = gameMostPlayed.data.data;
        return gameObj;
    },

    getGameNames(kidName) {
        const localGameState = LocalGameState.getGameLocal();
        const kidGameState = localGameState[kidName];
        const gameNames = Object.keys(kidGameState);
        return gameNames;
    },

    async getAnalysedChildStats(parentID, kidName) {
        const {
            numberOfGamesPlayed,
            statsData,
            statsObjects
        } = await this.getAllChildStats(parentID, kidName);
        const totalScore = utils.getTotalScore(statsObjects);
        const avgAttemptsBeforeSuccess = numberOfGamesPlayed === 0 ? 'No game records' : utils.getAverageAttemptsBeforeSuccess(statsObjects);
        const completionRate = numberOfGamesPlayed === 0 ? 'No game records' : utils.getCompletionRate(statsData, statsObjects);
        const trialAndErrFreq = numberOfGamesPlayed === 0 ? 'No game records' : utils.getTrialAndErrFreq(statsData, statsObjects);
        const allGamesAttempted = numberOfGamesPlayed === 0 ? 'No game records' : this.getGameNames(kidName);
        const gamesMostPlayed = numberOfGamesPlayed === 0 ? 'No game records' : await this.getGameMostPlayed(trialAndErrFreq, statsObjects);
        const recentGameObjects = numberOfGamesPlayed === 0 ? 'No game records' : await this.getRecentStats(kidName);
        return {
            numberOfGamesPlayed,
            totalScore,
            avgAttemptsBeforeSuccess,
            completionRate,
            trialAndErrFreq,
            recentGameObjects,
            gamesMostPlayed,
            allGamesAttempted
        }
    }

}