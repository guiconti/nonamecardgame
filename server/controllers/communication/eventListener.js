/** global io:true */
const EVENT_TYPES = {
    DISCONNECT: 'disconnect',
    CHAT_MESSAGE: 'chatMessage',
    GAME_INFO: 'gameInfo',
    PLAYER_INFO: 'playerInfo',
    NEW_PLAYER: 'newPlayer'
};

const tokenManager = require('../utils/tokenManager');
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
                tokenManager.decryptToken(userCookies.session).then((userInfo) => {
                    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, userInfo.name + ": " + msg);
                }, (err) => {
                    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, "Unknown: " + msg);
                });
            });
            socket.on(EVENT_TYPES.GAME_INFO, function(gameInfo){
                ioNamespace.emit(EVENT_TYPES.GAME_INFO, gameInfo);
            });
            socket.on(EVENT_TYPES.PLAYER_INFO, function(playerInfo){
                ioNamespace.emit(EVENT_TYPES.PLAYER_INFO, playerInfo);
            });
            socket.on(EVENT_TYPES.NEW_PLAYER, function(msg){
                ioNamespace.emit(EVENT_TYPES.NEW_PLAYER, msg);
            })
            socket.on(EVENT_TYPES.DISCONNECT, function(){
                tokenManager.decryptToken(userCookies.session).then((userInfo) => {
                    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, userInfo.name + " disconnected");
                }, (err) => {
                    ioNamespace.emit(EVENT_TYPES.CHAT_MESSAGE, "Unknown disconnected");
                });
            })
        });
    }
}