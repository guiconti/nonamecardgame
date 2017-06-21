/** global io:true */
const EVENT_TYPES = {
    DISCONNECT: 'disconnect',
    CHAT_MESSAGE: 'chatMessage',
    GAME_INFO: 'gameInfo'
};

const cookie = require('cookie');

let createdGameChats = [];

exports.createGameChat = (namespace) => {
    let ioNamespace = io.of('/' + namespace);

    if (createdGameChats.indexOf(namespace) == -1){
        createdGameChats.push(namespace);
        ioNamespace.on('connection', function(socket){

            let userCookies = cookie.parse(socket.request.headers.cookie);
            socket.join(userCookies.session);
            
            socket.on(EVENT_TYPES.CHAT_MESSAGE, function(msg){
                ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, msg);
            });
            socket.on(EVENT_TYPES.GAME_INFO, function(msg){
                ioNamespace.emit(EVENT_TYPES.GAME_INFO, msg);
            })
            socket.on(EVENT_TYPES.DISCONNECT, function(){
                ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, 'User disconnected');
            })
        });
    }
}