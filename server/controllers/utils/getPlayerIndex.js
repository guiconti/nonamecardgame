module.exports = (gameTable, player) => {
    let counter = -1;
    return gameTable.players.some((actualPlayer) => {
        counter++;
        return actualPlayer.id == player.id;
    })?counter:-1;
};