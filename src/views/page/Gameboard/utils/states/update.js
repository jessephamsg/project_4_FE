//LOCAL STORAGE
import LocalGameState from '../../../../../storage/gameLocalState';

//MODELS
import GameStatsModel from '../../../../../models/GameStats';

//UTILS
import gameUtils from '../stats/utils';

//APIS
import apis from '../../../../../api';


export default {

    async updateKidsStats (gameID, level, levelStatsState, kidID) {
        const {startTime, endTime, score, attemptsBeforeSuccess} = gameUtils.analyseLevelStats(levelStatsState[`${level}`]);
        const kidStatsPayload = GameStatsModel.gameStatsPayload(gameID, level, startTime, endTime, score, attemptsBeforeSuccess, null);
        await apis.updateKidStats(kidID, gameID, level, kidStatsPayload);
    },

    updateLocalViewState (gameName, level, option) {
        LocalGameState.updateGameLocal(gameName, {
            currentLevel: level, 
            currentOption: option
        })
    }

}