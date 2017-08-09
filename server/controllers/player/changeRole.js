module.exports = (gameTable, playerIndex, itemIndex) => {
  gameTable.players[playerIndex].role = gameTable.players[playerIndex].hand[itemIndex].roleType;
};