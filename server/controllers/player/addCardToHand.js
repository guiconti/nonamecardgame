module.exports = (player, cardToAdd) => {
    try {
        player.hand.push(cardToAdd);
        player.cardsOnHand++;
    } catch (err) {
        
    }
};