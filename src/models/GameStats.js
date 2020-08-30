export default  {

    gameInitialState () {
        return {
            id: null,
            name: null,
            totalLevel: null,
            totalScore: null,
            startTime: [],
            pauseTime: [],
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
    }
}