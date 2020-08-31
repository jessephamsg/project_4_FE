//LOCAL STORAGE
import LocalGameState from '../../storage/gameLocalState';

//MODELS
import GameStatsModel from '../../models/GameStats';
import LevelStatsModel from '../../models/LevelStats';

//APIS
import apis from '../../api';


const DEFAULT_CURRENT_LEVEL = 0;
const DEFAULT_CURRENT_OPTION = 1


export default {

    buildIntialStates () {
        return GameStatsModel.gameInitialState();
    },

    buildInitialKeyGameStats () {
        return LevelStatsModel.levelInitialStats();
    },

    isFirstTimePlayingGame (gameName) {
        const result = LocalGameState.getGameLocal();
        let isFirstTime = false;
        if (result === null) {
            isFirstTime = true
        } else {
            if(result[`${gameName}`] === undefined) isFirstTime = true
        }
        return isFirstTime
    },

    async getGameID (gameName) {
        const gameObject = await apis.getGameID(gameName)
        const gameID = gameObject.data.data[0]._id;
        return gameID
    },

    getLatestLocalGameState (gameConfig, gameName) {
        const totalLevel = Object.keys(gameConfig.settings());
        let currentLevel = DEFAULT_CURRENT_LEVEL, currentOption = DEFAULT_CURRENT_OPTION;
        if (this.isFirstTimePlayingGame(gameName) === false) ({currentLevel, currentOption} = LocalGameState.getGameLocal()[gameName])
        return {totalLevel, currentLevel, currentOption}
    },

    async createKidsStats (gameID, gameName, kidID, totalLevels) {
        const kidStatsPayloadArr = [];
        for (const level of totalLevels) {
            const levelPayload = GameStatsModel.gameStatsPayload(gameID, level, '', '', 0, 0, null);
            kidStatsPayloadArr.push(levelPayload)
        }
        LocalGameState.createGameLocal(gameName);
        await apis.createKidStats(kidID, gameID, kidStatsPayloadArr);
    }

}