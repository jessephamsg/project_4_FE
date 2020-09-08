export default {

    calAge (input) {
        const splitDate = input.split("-")
        const userDate = new Date(splitDate[0],splitDate[1],splitDate[2])
        const today = new Date()
        const age = Math.round((Math.abs(today.getTime() - userDate.getTime()) / (1000 * 3600 * 24 * 365.25)))
        return age
    },

    getTotalScore (statsArr) {
        let sum = statsArr.reduce((acc, curVal) => {
            return acc + parseInt(curVal.score.$numberDecimal);
        }, 0)
        return sum
    },

    getAverageAttemptsBeforeSuccess (statsArr) {
        const attemptedLevels = statsArr.filter(statsObj => parseInt(statsObj.score.$numberDecimal) > 0);
        let sum = attemptedLevels.reduce((acc, curVal) => {
            return acc + parseInt(curVal.attemptsBeforeSuccess)
        }, 0)
        const avg = sum/ attemptedLevels.length;
        return avg
    },

    getCompletionState (statsData, statsObj) {
        const allGamesStateArr = []
        let indexInStatsObj = 0
        for (let i = 0; i < statsData.length; i++) {
            const gameStats = {}
                for (let y = 0; y < statsData[i].length; y++) {
                    const levelStatsID = statsData[i][y];
                    gameStats[levelStatsID] = {};
                    gameStats[levelStatsID].isPlayed = false;
                    if(statsObj[indexInStatsObj].startTime.length > 1 && statsObj[indexInStatsObj].attemptsBeforeSuccess !== -1) gameStats[levelStatsID].isPlayed = true
                    indexInStatsObj ++
                }
            allGamesStateArr.push(gameStats);
        }
        return allGamesStateArr
    },

    getCompletionRate (statsData, statsObj) {
        const allGamesStateArr = this.getCompletionState(statsData, statsObj);
        const completionRateArr = [];
        for (const [index, gameObject] of allGamesStateArr.entries()) {
            let completionState = 0
            for (const key in gameObject) {
                if(gameObject[key].isPlayed === true) completionState++ 
            }
            const completionRate = completionState/ Object.keys(gameObject).length;
            completionRateArr.push(completionRate.toFixed(2));
        }
        return completionRateArr
    },

    getTrialAndErrState (statsData, statsObj) {
        const allGamesStateArr = []
        let indexInStatsObj = 0
        for (let i = 0; i < statsData.length; i++) {
            const gameStats = {}
                for (let y = 0; y < statsData[i].length; y++) {
                    const levelStatsID = statsData[i][y];
                    gameStats[levelStatsID] = {};
                    gameStats[levelStatsID].trialAndErrFreq = statsObj[indexInStatsObj].startTime.length - 1;
                    indexInStatsObj ++
                }
            allGamesStateArr.push(gameStats);
        }
        return allGamesStateArr
    },

    getTrialAndErrFreq (statsData, statsObj) {
        const allGamesStateArr = this.getTrialAndErrState(statsData, statsObj);
        const trialAndErrFreq = [];
        for (const [index, gameObject] of allGamesStateArr.entries()) {
            let trialAndErrState = 0
            for (const key in gameObject) {
                trialAndErrState = trialAndErrState + gameObject[key].trialAndErrFreq
            }
            trialAndErrFreq.push(trialAndErrState);
        }
        return trialAndErrFreq
    }
}
