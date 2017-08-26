module.exports = (gameTable, playerIndex) => {
    for(let i = 0; i < gameTable.players.length; i++){
        if (i != playerIndex && gameTable.players[i].level > gameTable.players[playerIndex].level){
           return false; 
        }
    }
    return true;
};
