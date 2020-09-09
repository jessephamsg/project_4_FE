//LOCAL STORAGE
import LocalGameState from '../../storage/gameLocalState';

//MODELS
import GameStatsModel from '../../models/GameStats';

//UTILS
import gameUtils from './utils/utils';

//APIS
import apis from '../../api';


export default {

    async updateKidsStats(gameID, level, levelStatsState, parentID, kidName) {
        const {
            startTime,
            endTime,
            score,
            attemptsBeforeSuccess
        } = gameUtils.analyseLevelStats(levelStatsState[`${level}`]);
        const kidStatsPayload = GameStatsModel.gameStatsPayload(gameID, level, startTime, endTime, score, attemptsBeforeSuccess, null);
        await apis.updateKidStats(parentID, kidName, gameID, level, kidStatsPayload);
    },

    updateLocalViewState(kidName, gameName, level, option) {
        LocalGameState.updateGameLocal(kidName, gameName, {
            currentLevel: level,
            currentOption: option
        })
    },

    updateDefaultGameStatsObj(gameStatsObj, level, submittedAt, isCorrect, totalScore) {
        const levelStats = gameStatsObj[`${level}`]
        gameStatsObj[`${level}`].submittedAt = levelStats.submittedAt === undefined ? [submittedAt] : [...levelStats.submittedAt, submittedAt];
        gameStatsObj[`${level}`].isCorrect = levelStats.isCorrect === undefined ? [isCorrect] : [...levelStats.isCorrect, isCorrect];
        gameStatsObj[`${level}`].totalScore = levelStats.totalScore + totalScore;
        return gameStatsObj
    },

}