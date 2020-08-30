import isEqual from 'lodash.isequal';


export default {

    getSubmissionStats (resultArr, winningCriteriaArr) {
        const isCorrect = isEqual(resultArr, winningCriteriaArr);
        const submitTime = Date.now();
        const score = isCorrect === true ? 5 : 0.5;
        return {isCorrect, submitTime, score}
    },

    updateDefaultGameStatsObj (gameStatsObj, level, submittedAt, isCorrect, totalScore) {
        const levelStats = gameStatsObj[`${level}`]
        gameStatsObj[`${level}`].submittedAt = levelStats.submittedAt === undefined ? [submittedAt] : [...levelStats.submittedAt, submittedAt];
        gameStatsObj[`${level}`].isCorrect = levelStats.isCorrect === undefined ? [isCorrect] : [...levelStats.isCorrect, isCorrect];
        gameStatsObj[`${level}`].totalScore = levelStats.totalScore + totalScore;
        return gameStatsObj
    },

    analyseLevelStats (levelStatsState) {
        const startTime = levelStatsState.submittedAt[0];
        const endTime = levelStatsState.submittedAt[levelStatsState.submittedAt.length -1];
        const score = levelStatsState.totalScore;
        const attemptsBeforeSuccess = levelStatsState.isCorrect.findIndex((result) => {return result === true});
        return {startTime, endTime, score, attemptsBeforeSuccess}
    }
}