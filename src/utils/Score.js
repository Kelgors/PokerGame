export const Score = {
    LOST: 0,
    DRAW: 1,
    WON: 2,
};

export const Resolver = {

    /**
     * @param {Card} card1 The first card
     * @param {Card} card2 The second card
     * @return {Number} The result of the comparison
     */
    compareCards(card1, card2) {
        if (card1 && !card2) return Score.WON;
        if (!card1 && card2) return Score.LOST;
        if (card1.value > card2.value) return Score.WON;
        if (card1.value < card2.value) return Score.LOST;
        return Score.DRAW;
    },

    /**
     * @param {CardCombo} combo1 The first card
     * @param {CardCombo} combo2 The second card
     * @return {Number} The result of the comparison
     */
    compareCombos(combo1, combo2) {
        if (combo1 && !combo2) return Score.WON;
        if (!combo1 && combo2) return Score.LOST;
        if (combo1.getScore() > combo2.getScore()) return Score.WON;
        if (combo1.getScore() < combo2.getScore()) return Score.LOST;
        return Score.DRAW;
    },
};
