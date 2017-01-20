export var Score = {
    LOST: 0,
    DRAW: 1,
    WON: 2
};

export var Resolver = {

    /**
     * @param {Card} card1
     * @param {Card} card2
     */
    compareCards(card1, card2) {
        if (card1 && !card2) return Score.WON;
        if (!card1 && card2) return Score.LOST;
        if (card1.value > card2.value) return Score.WON;
        if (card1.value < card2.value) return Score.LOST;
        return Score.DRAW;
    },

    /**
     * @param {CardCombo} combo1
     * @param {CardCombo} combo2
     */
    compareCombos(combo1, combo2) {
        if (combo1 && !combo2) return Score.WON;
        if (!combo1 && combo2) return Score.LOST;
        if (combo1.getScore() > combo2.getScore()) return Score.WON;
        if (combo1.getScore() < combo2.getScore()) return Score.LOST;
        return Score.DRAW;
    }
};