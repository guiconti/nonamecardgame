/** global io:true */
const EVENT_TYPES = {
    CHAT_MESSAGE: 'chatMessage',
    NEW_PLAYER: 'newPlayer'
};

exports.sendChatMessage = (namespace, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, message);
};

exports.sendNewPlayer = (namespace, playerInfo) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.NEW_PLAYER, playerInfo);
};

exports.sendPrivateChatMessage = (namespace, room, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.to(room).emit(EVENT_TYPES.CHAT_MESSAGE, '[PRIVATE MESSAGE] ' + message);
};
