export default  {
    gameInitialState () {
        return {
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
    }
}