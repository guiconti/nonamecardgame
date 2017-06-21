/** global io:true */
const EVENT_TYPES = {
    CHAT_MESSAGE: 'chatMessage',
    NEW_PLAYER: 'newPlayer',
    PLAYER_INFO: 'playerInfo'
};

exports.sendChatMessage = (namespace, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, message);
};

exports.sendNewPlayer = (namespace, playerInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.NEW_PLAYER, playerInfo);
};

exports.sendPrivatePlayerInfo = (namespace, room, playerInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.PLAYER_INFO, playerInfo);
};

exports.sendPrivateChatMessage = (namespace, room, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.CHAT_MESSAGE, '[PRIVATE MESSAGE] ' + message);
};
