import GameLocalState from '../models/GameState';


export default  {

    createGameLocal (gameName) {
        let gameLocalState = {}
        if (this.isFirstTimeUsingApp() === false) gameLocalState = {...this.getGameLocal()};
        gameLocalState[`${gameName}`] = GameLocalState.gameLocalState();
        gameLocalState[`${gameName}`].startTime = Date.now();
        window.localStorage.setItem('gameLocalState', JSON.stringify(gameLocalState));
    },

    getGameLocal () {
        return JSON.parse(window.localStorage.getItem('gameLocalState'));
    },

    updateGameLocal (gameName, updatedObj) {
        const gameNewLocalState = {...this.getGameLocal()}
        const gameStartTime = this.getGameLocal()[`${gameName}`].startTime;
        gameNewLocalState[`${gameName}`] = GameLocalState.gameLocalState();
        gameNewLocalState[`${gameName}`].startTime = gameStartTime;
        gameNewLocalState[`${gameName}`].currentLevel = parseInt(updatedObj.currentLevel);
        gameNewLocalState[`${gameName}`].currentOption = parseInt(updatedObj.currentOption);
        window.localStorage.setItem('gameLocalState', JSON.stringify(gameNewLocalState));
    },

    isFirstTimeUsingApp () {
        const result = this.getGameLocal();
        const isFirstTime = result === null ? true: false; 
        return isFirstTime
    }

}