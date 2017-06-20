/** global io:true */
const EVENT_TYPES = {
    DISCONNECT: 'disconnect',
    CHAT_MESSAGE: 'chatMessage'
};

let createdGameChats = [];

exports.createGameChat = (namespace) => {
    let ioNamespace = io.of('/' + namespace);

    if (createdGameChats.indexOf(namespace) == -1){
        createdGameChats.push(namespace);
        ioNamespace.on('connection', function(socket){
            socket.on(EVENT_TYPES.CHAT_MESSAGE, function(msg){
                ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, msg);
            });
            socket.on(EVENT_TYPES.DISCONNECT, function(){
                ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, 'User disconnected');
            })
        });
    }
}