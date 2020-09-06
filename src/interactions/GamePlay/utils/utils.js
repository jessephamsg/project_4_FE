import isEqual from 'lodash.isequal';


export default {

    getSubmissionStats (resultArr, winningCriteriaArr) {
        console.log(resultArr, winningCriteriaArr)
        const isCorrect = isEqual(resultArr, winningCriteriaArr);
        console.log(isCorrect)
        const submitTime = Date.now();
        const score = isCorrect === true ? 5 : 0.5;
        return {isCorrect, submitTime, score}
    },

    analyseLevelStats (levelStatsState) {
        const startTime = levelStatsState.submittedAt[0];
        const endTime = levelStatsState.submittedAt[levelStatsState.submittedAt.length -1];
        const score = levelStatsState.totalScore;
        const attemptsBeforeSuccess = levelStatsState.isCorrect.findIndex((result) => {return result === true});
        return {startTime, endTime, score, attemptsBeforeSuccess}
    }
}