import Card from './Card';

export default class CardCollection {

    static from(arrayOfCard) {
        if (arrayOfCard instanceof CardCollection) return arrayOfCard;
        if (Array.isArray(arrayOfCard)) return new CardCollection(arrayOfCard);
        return new CardCollection();
    }

    constructor(arrayOfCard) {
        if (arrayOfCard instanceof CardCollection) {
            this.cards = arrayOfCard.cards.slice(0);
        } else if (Array.isArray(arrayOfCard)) {
            this.cards = arrayOfCard;
        } else {
            this.cards = [];
        }
    }

    destroy() {
        this.cards.forEach((d) => d.destroy());
    }

    /**
     * @param {Card[]} cards
     */
    addAll(cards) {
        this.cards.push(...cards);
    }

    /**
     * @param {Card} card
     */
    add(card) {
        this.cards.push(card);
    }

    /**
     * @param {Card} card
     */
    remove(card) {
        let index;
        if ((index = this.cards.indexOf(card)) > -1) {
            return this.cards.splice(index, 1)[0];
        }
        return null;
    }

    /**
     * @param {Number} suit
     * @param {Number} value
     * @returns {Card} card
     */
    getBySuitAndValue(suit, value) {
        return this.cards.find((c) => c.value === value && c.suit === suit);
    }

    /**
     * @param {Number} value
     * @returns {Card} card
     */
    getByValue(value) {
        return this.cards.find((c) => c.value === value);
    }

    /**
     * @param {Number} suit
     * @returns {Card} card
     */
    getBySuit(suit) {
        return this.cards.find((c) => c.suit === suit);
    }

    /**
     * @param {Number} value
     * @returns {Boolean}
     */
    includesValue(value) {
        return !!this.getByValue(value);
    }

    /**
     * @returns {Card} card
     */
    peek() {
        return this.cards[0];
    }

    shuffle() {
        const output = [];
        const input = this.toArray();
        while (input.length > 0) {
            const index = Math.floor(Math.random() * input.length);
            output.push(input.splice(index, 1)[0]);
        }
        this.cards = output;
        return this;
    }

    /**
     * @returns {Card[]}
     */
    toArray() {
        return this.cards.slice(0);
    }

    /**
     * @returns {String}
     */
    toString() {
        return this.cards.toString();
    }
}
