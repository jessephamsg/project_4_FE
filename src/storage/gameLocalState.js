//MODELS
import GameLocalState from '../models/GameState';


export default {

    createGameLocal(kidName, gameName) {
        let gameLocalState = {}
        gameLocalState = {
            ...this.getGameLocal()
        }
        if (this.isFirstTimeUsingApp(kidName) === true) gameLocalState[kidName] = {}
        gameLocalState[kidName][`${gameName}`] = GameLocalState.gameLocalState();
        gameLocalState[kidName][`${gameName}`].startTime = Date.now();
        window.localStorage.setItem('gameLocalState', JSON.stringify(gameLocalState));
    },

    getGameLocal() {
        return JSON.parse(window.localStorage.getItem('gameLocalState'));
    },

    updateGameLocal(kidName, gameName, updatedObj) {
        const gameNewLocalState = {
            ...this.getGameLocal()
        }
        const gameStartTime = this.getGameLocal()[kidName][`${gameName}`].startTime;
        gameNewLocalState[kidName][`${gameName}`] = GameLocalState.gameLocalState();
        gameNewLocalState[kidName][`${gameName}`].startTime = gameStartTime;
        gameNewLocalState[kidName][`${gameName}`].currentLevel = parseInt(updatedObj.currentLevel);
        gameNewLocalState[kidName][`${gameName}`].currentOption = parseInt(updatedObj.currentOption);
        window.localStorage.setItem('gameLocalState', JSON.stringify(gameNewLocalState));
    },

    isFirstTimeUsingApp(kidName) {
        const result = this.getGameLocal();
        let isFirstTime = false
        if (result === null) {
            isFirstTime = true
        } else if (result[kidName] === undefined) isFirstTime = true
        return isFirstTime
    }

}