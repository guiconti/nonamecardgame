module.exports = (gameTable, playerIndex, itemIndex) => {
  gameTable.players[playerIndex].race = gameTable.players[playerIndex].hand[itemIndex].raceType;
};