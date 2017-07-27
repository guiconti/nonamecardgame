/** global io:true */
const EVENT_TYPES = {
    CHAT_MESSAGE: 'chatMessage',
    NEW_PLAYER: 'newPlayer',
    GAME_INFO: 'gameInfo',
    PLAYER_INFO: 'playerInfo',
    ASK_INFO: 'askInfo',
    NEW_INFO: 'newInfo'
};

exports.sendChatMessage = (namespace, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, message);
};

exports.sendNewPlayer = (namespace, playerInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.NEW_PLAYER, playerInfo);
};

exports.sendGameInfo = (namespace, gameInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.GAME_INFO, gameInfo);
};

exports.sendPlayersInfo = (namespace, playersInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.PLAYER_INFO, playersInfo);
};

exports.sendPrivatePlayerInfo = (namespace, room, playerInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.PLAYER_INFO, playerInfo);
};

exports.askPlayer = (namespace, room, askInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.ASK_INFO, askInfo);
};

exports.sendInfoToPlayer = (namespace, room, newInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.NEW_INFO, newInfo);
};

exports.sendPrivateChatMessage = (namespace, room, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.CHAT_MESSAGE, '[PRIVATE MESSAGE] ' + message);
};
