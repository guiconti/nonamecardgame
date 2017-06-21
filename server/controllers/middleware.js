/**
 * Middleware de acesso as funcionalidades
 * @module controllers/middleware
 */

const tokenManager = require('./utils/tokenManager');
const validator = require('./utils/validator');

/**
 * Executa uma ação IoT utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no IoT.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /i).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
exports.validateToken = function (req, res, next){
    try {
        if (!validator.isValidCookie(req.cookies)){
            return res.status(401).redirect('/');
        }
        var token = req.cookies.session;

        tokenManager.decryptToken(token).then((token) => {
           if(!token){
               return res.status(401).redirect('/');
           }
           req.userInfo = token;
           return next();
        }, (err) => {
            //  Change for your use case on invalid token
            return res.status(401).redirect('/');
        });      
    } catch (e) {
        console.log("err: " + e);
    }   
};