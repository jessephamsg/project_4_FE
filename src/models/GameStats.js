export default  {

    gameInitialState () {
        return {
            id: null,
            totalLevel: null,
            totalScore: null,
            levelStatsIDs: {},
            startTime: [],
            currentLevel: null,
            currentOption: null,
            currentLevelSettings: {},
            currentOrder: {order: {current: {}}},
            gameStats: {},
            viewGame: false,
            viewBoard: false,
        }
    },

    gameStatsPayload (gameID, level, startTime, endTime, score, attemptsBeforeSuccess, numberOfPauses) {
        return {
            gameID,
            level,
            startTime,
            endTime,
            score, 
            attemptsBeforeSuccess,
            numberOfPauses
        }
    },

    kidOverallStatsPayload (gameID) {
        return {
            gameID, 
            startTime: Date.now(),
            totalScore: 0,
            gameStatsIDs: []
        } 
    }
}