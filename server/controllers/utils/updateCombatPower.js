module.exports = (gameTable, playerIndex) => {
    gameTable.players[playerIndex].combatPower = gameTable.players[playerIndex].level + gameTable.players[playerIndex].equipmentBonus;
};
