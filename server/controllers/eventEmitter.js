/** global io:true */
const EVENT_TYPES = {
    CHAT_MESSAGE: 'chatMessage'
};

exports.sendChatMessage = (namespace, message) => {
    let ioNamespace = io.of('/' + namespace);
    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, message);
};
