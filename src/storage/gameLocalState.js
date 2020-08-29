import GameLocalState from '../models/GameState';


export default  {

    createGameLocal (gameName) {
        const gameLocalState = {}
        gameLocalState[`${gameName}`] = GameLocalState.gameLocalState();
        gameLocalState[`${gameName}`].startTime = Date.now();
        window.localStorage.setItem('gameLocalState', JSON.stringify(gameLocalState));
    },

    getGameLocal () {
        return JSON.parse(window.localStorage.getItem('gameLocalState'));
    },

    updateGameLocal (gameName, updatedObj) {
        const gameNewLocalState = {}
        const gameLocalState = this.getGameLocal();
        const gameStartTime = gameLocalState[`${gameName}`].startTime;
        gameNewLocalState[`${gameName}`] = GameLocalState.gameLocalState();
        gameNewLocalState[`${gameName}`].startTime = gameStartTime;
        gameNewLocalState[`${gameName}`].currentLevel = parseInt(updatedObj.currentLevel);
        gameNewLocalState[`${gameName}`].currentOption = parseInt(updatedObj.currentOption);
        window.localStorage.setItem('gameLocalState', JSON.stringify(gameNewLocalState));
    }

}