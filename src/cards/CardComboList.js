import CardCollection from './CardCollection';
import Arrays from '../utils/Arrays';
import Numbers from '../utils/Numbers';
import CardsGenerator from './CardsGenerator';

/** @type {Object.<string, number>} */
export const ComboType = {
    Pair: 1,
    TwoPair: 2,
    ThreeOfAKind: 3,
    Straight: 5,
    Flush: 7,
    FullHouse: 8,
    FourOfAKind: 10,
    StraightFlush: 20,
    RoyalFlush: 50,
    FiveOfAKind: 100,
};
/**
 * @property {Function}
 * @name ComboType.forName
 * @param {Number} type
 * @returns {String}
*/
Object.defineProperty(ComboType, 'forName', {
    enumerable: false,
    value: function forName(type) {
        return Object.keys(ComboType).find((key) => ComboType[key] === type);
    },
});

export class CardComboList {

    /**
     * @param {CardCollection} cardsCollection
     */
    constructor(cardsCollection) {
        this.originalCollection = cardsCollection;
        this.combos = [];
        this._parse(cardsCollection);
    }

    addAll(objects) {
        objects.forEach((d) => this.add(d));
    }

    add(object) {
        let cardCombo;
        if (!(object instanceof CardCombo)) {
            cardCombo = new CardCombo(object);
        } else cardCombo = object;
        this.combos.push(cardCombo);
        return this;
    }

    getHigherCombo() {
        return this.combos.sort((a, b) => Numbers.Compare.desc(a.getComparatorValue(), b.getComparatorValue()))[0];
    }

    _parse() {
        // 2 - Pair
        // 4 - ThreeOfAKind
        // 8 - FourOfAKind
        // 10 - FiveOfAKind
        this.addAll(this._getXOfAKind());
        // 3 - TwoPair
        const twoPairsCombo = this._getTwoPairs();
        if (twoPairsCombo) this.add(twoPairsCombo);
        // 5 - Straight
        const straightCombo = this._getStraight();
        if (straightCombo) this.add(straightCombo);
        // 6 - Flush
        const flushCombo = this._getFlush();
        if (flushCombo) this.add(flushCombo);
        // 7 - FullHouse
        const fullHouseCombo = this._getFullHouse();
        if (fullHouseCombo) this.add(fullHouseCombo);
        // 9 - StraightFlush
        const straightFlushCombo = this._getStraightFlush();
        if (straightFlushCombo) this.add(straightFlushCombo);

        // todo: royalFlush
        const royalFlushCombo = this._getRoyalFlush();
        if (royalFlushCombo) this.add(royalFlushCombo);

        this.combos.sort((a, b) => Numbers.Compare.desc(a.getScore(), b.getScore()));
    }

    _getHigherCard() {
        const cards = this.originalCollection.toArray();
        return cards.sort((a, b) => {
            if (a.value > b.value) return -1;
            if (a.value < b.value) return 1;
            return 0;
        })[0];
    }

    _getTwoPairs() {
        const pairs = [];
        this.combos.forEach(function (combo) {
            if (combo.type === ComboType.Pair) pairs.push(combo);
        });
        if (pairs.length === 2 && this._isAllCardDifferents(pairs[0], pairs[1])) {
            return new CardCombo({
                type: ComboType.TwoPair,
                cards: [].concat(...pairs.map((d) => d.cards.toArray())),
            });
        }
    }

    _getXOfAKind() {
        const cards = this.originalCollection.toArray();
        const combos = [];
        const comboTypeMapper = {
            2: ComboType.Pair,
            3: ComboType.ThreeOfAKind,
            4: ComboType.FourOfAKind,
            5: ComboType.FiveOfAKind,
        };
        cards.sort(function (a, b) {
            return Numbers.Compare.asc(a.value, b.value);
        }).forEach((card, cardIndex, cards) => {
            const localeCards = [card];
            for (let index = 0; index < cards.length; index++) {
                if (card !== cards[index] && (card.value === cards[index].value || cards[index].isJoker())) {
                    localeCards.push(cards[index]);
                }
                if (localeCards.length > 1 && localeCards.length < 6) {
                    combos.push(new CardCombo({
                        type: comboTypeMapper[localeCards.length],
                        cards: localeCards.slice(0),
                    }));
                }
            }
        });
        return Arrays.uniq(combos, (d) => d.getId());
    }

    _getFullHouse() {
        const pairs = this.combos.filter((d) => d.type === ComboType.Pair);
        const threeOfAKind = this.combos.find((d) => d.type === ComboType.ThreeOfAKind);
        for (let index = 0; index < pairs.length; index++) {
            const pair = pairs[index];
            if (pair && threeOfAKind && this._isAllCardDifferents(pair, threeOfAKind)) {
                return new CardCombo({
                    type: ComboType.FullHouse,
                    cards: [].concat(pair.getCards(), threeOfAKind.getCards()),
                });
            }
        }
        return null;
    }

    _getStraight() {
        const cards = this.originalCollection.toArray();
        const JOKER_VALUE = CardsGenerator.JOKER_VALUE;
        const values = cards.filter((d) => !d.isJoker()).map((d) => d.value).sort(Numbers.Compare.asc);
        let jokers = cards.filter((d) => d.isJoker()).length;

        for (let index = 1, value = values[0]; index < values.length; index++) {
            const match = value + 1 === values[index];
            if (!match && jokers === 0) return;
            if (!match) {
                jokers--;
                index--;
            }
            value++;
        }
        return new CardCombo({
            type: ComboType.Straight,
            cards,
        });
    }

    _getFlush() {
        const cards = this.originalCollection.toArray();
        const firstSuit = cards.find((d) => !d.isJoker()).suit;
        for (let index = 1; index < cards.length; index++) {
            if (cards[index].suit !== firstSuit && !cards[index].isJoker()) return null;
        }
        return new CardCombo({
            type: ComboType.Flush,
            cards,
        });
    }

    _getStraightFlush() {
        const flush = this.combos.find((d) => d.type === ComboType.Flush);
        const straight = this.combos.find((d) => d.type === ComboType.Straight);
        if (flush && straight) {
            return new CardCombo({
                type: ComboType.StraightFlush,
                cards: flush.getCards(),
            });
        }
    }

    _getRoyalFlush() {
        const straightFlush = this.combos.find((d) => d.type === ComboType.StraightFlush);
        if (!straightFlush) return null;
        const cards = straightFlush.cards;
        const jokerCount = cards.toArray().filter((d) => d.isJoker()).length;
        let cardCount = 0;
        for (let cardValue = 8; cardValue < 13; cardValue++) {
            if (cards.includesValue(cardValue)) cardCount++;
        }
        if (jokerCount + cardCount !== 5) return null;
        return new CardCombo({
            type: ComboType.RoyalFlush,
            cards: cards.toArray(),
        });
    }

    /**
     * @param {Combo} c1
     * @param {Combo} c2
     * @returns {boolean}
     */
    _isAllCardDifferents(c1, c2) {
        const c1Cards = c1.getCards();
        const c2Cards = c2.getCards();
        for (let i1 = 0; i1 < c1Cards.length; i1++) {
            for (let i2 = 0; i2 < c2Cards.length; i2++) { if (c1Cards[i1] === c2Cards[i2]) return false; }
        }
        return true;
    }

    toString() {
        return this.combos.join('\n');
    }

}
// TODO: TEST K 4 4 K J
// TODO: TEST Q 5 5 Q J
export class CardCombo {

    constructor(object) {
        /** @type {number} */
        this.type = object.type;
        /** @type {CardCollection} */
        this.cards = new CardCollection();
        if (object.cards) this.cards.addAll(object.cards);
        else if (object.card) this.cards.add(object.card);
        this.getCards().sort((a, b) => Numbers.Compare.asc(a.value, b.value));
    }

    /**
     * @returns {Card}
     */
    getCard() { return this.cards.peek(); }
    /**
     * @returns {CardCollection}
     */
    getCards() { return this.cards.cards; }

    /**
     * @private
     * @returns {CardCollection}
     */
    _sortCards() {
        this.getCards().sort((a, b) => Numbers.Compare.asc(a.suit, b.suit));
    }

    /**
     * @returns {String}
     */
    getId() {
        this._sortCards();
        return this.getCards().map((d) => `${d.value}&${d.suit}`).join('/');
    }

    getComparatorValue() {
        return this.type + this.getCards().map((d) => d.value).reduce((prev, cur) => prev + cur, 0);
    }

    /**
     * @returns {number}
     */
    getScore() {
        return this.type;
    }

    /**
     * @returns {String}
     */
    getTypeName() {
        return ComboType.forName(this.type);
    }

    /**
     * @returns {String}
     */
    toString() {
        return `${this.getTypeName()} { ${this.getCards().join(', ')} }`;
    }

}
