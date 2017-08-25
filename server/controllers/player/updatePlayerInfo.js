const eventEmitter = require('../communication/eventEmitter');
const messagesType = require('../communication/messagesType');
const changeRace = require('./changeRace');
const changeRole = require('./changeRole');
const changeSex = require('./changeSex');
const racesList = require('./racesList');
const rolesList = require('./rolesList');
const sexList = require('./sexList');

module.exports = (gameTable, playerIndex, itemIndex, isEquipping) => {
    if (isEquipping){
        gameTable.players[playerIndex].combatPower += gameTable.players[playerIndex].hand[itemIndex].bonus;
        if (gameTable.players[playerIndex].hand[itemIndex].raceType != -1){
            changeRace(gameTable, playerIndex, gameTable.players[playerIndex].hand[itemIndex].raceType);
            if (gameTable.players[playerIndex].hand[itemIndex].sexType != -1){
                changeSex(gameTable, playerIndex, gameTable.players[playerIndex].hand[itemIndex].sexType);
            }
        } else if (gameTable.players[playerIndex].hand[itemIndex].roleType != -1){
            changeRole(gameTable, playerIndex, gameTable.players[playerIndex].hand[itemIndex].roleType);
        } else {
            let message = {
                type: messagesType.INFO,
                text: gameTable.players[playerIndex].name + ' equipped ' + gameTable.players[playerIndex].hand[itemIndex].name +
                    ' and added ' + gameTable.players[playerIndex].hand[itemIndex].bonus + ' to his/her combat power.'
            };
            eventEmitter.sendChatMessage(gameTable.id, message);
            gameTable.chatHistory.unshift(message);
        }
    } else {
        //  Unequipping
        gameTable.players[playerIndex].combatPower -= gameTable.players[playerIndex].equipment[itemIndex].bonus;
        if (gameTable.players[playerIndex].id == gameTable.turnInfo.playerId || gameTable.players[playerIndex].id == gameTable.fight.helper.helperId){
            gameTable.fight.player.combatPower -= gameTable.players[playerIndex].equipment[itemIndex].bonus;
        }
        if (gameTable.players[playerIndex].equipment[itemIndex].raceType != -1){
            changeRace(gameTable, playerIndex, racesList.HUMAN);
            if (gameTable.players[playerIndex].equipment[itemIndex].sexType != -1){
                changeSex(gameTable, playerIndex, sexList.NONE);
            }
        } else if (gameTable.players[playerIndex].equipment[itemIndex].roleType != -1){
            changeRole(gameTable, playerIndex, rolesList.NONE);
        }
    }
    return;
}