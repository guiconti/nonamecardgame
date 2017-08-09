module.exports = (gameTable, playerIndex, itemIndex) => {
  gameTable.players[playerIndex].sex = gameTable.players[playerIndex].hand[itemIndex].sexType;
};
