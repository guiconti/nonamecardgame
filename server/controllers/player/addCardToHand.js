module.exports = (player, cardToAdd) => {
    try {
        player.hand.push(cardToAdd);
        player.candsOnHand++;
    } catch (err) {
        
    }
};