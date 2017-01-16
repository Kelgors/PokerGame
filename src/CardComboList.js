import CardCollection from './CardCollection';
import Arrays from './Arrays';
import Numbers from './Numbers';

export var ComboType = {
    HigherCard: 1,
    Pair: 2,
    TwoPair: 3,
    ThreeOfAKind: 4,
    Straight: 5,
    Flush: 6,
    FullHouse: 7,
    FourOfAKind: 8,
    StraightFlush: 9,
    FiveOfAKind: 10
};

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
        return this.combos.sort((a, b) => {
            if (a.type > b.type) return -1;
            if (a.type < b.type) return 1;
            return 0;
        })[0];
    }

    _parse() {
        // 1- HigherCard
        this.add({ type: ComboType.HigherCard, card: this._getHigherCard() });
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
    
    // _getPairs() {
    //     const cards = this.originalCollection.toArray();
    //     const combos = [];
    //     cards.forEach((card, cardIndex, cards) => {
    //         for (let index = 0; index < cards.length; index++) {
    //             if (cardIndex === index) continue;
    //             const otherCard = cards[index];
    //             if (card.value === otherCard.value) {
    //                 combos.push(new CardCombo({
    //                     type: ComboType.Pair,
    //                     cards: [ card, otherCard ]
    //                 }));
    //             }
    //         }
    //     });
            
    //     return Arrays.uniq(combos, (combo) => combo.getId());
    // }

    _getTwoPairs() {
        const pairs = [];
        this.combos.forEach(function (combo) {
            if (combo.type === ComboType.Pair) pairs.push(combo);
        });
        if (pairs.length === 2 && this._isAllCardDifferents(pairs[0], pairs[1])) {

            return new CardCombo({
                type: ComboType.TwoPair,
                cards: [].concat(...pairs.map((d) => d.cards))
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
            5: ComboType.FiveOfAKind
        };
        cards.forEach((card, cardIndex, cards) => {
            const localeCards = [ card ];
            for (let index = 0; index < cards.length; index++) {
                if (card !== cards[index] && (card.value === cards[index].value || cards[index].isJoker())) {
                    localeCards.push(cards[index]);
                }
            }
            console.log(localeCards.toString());
            if (localeCards.length > 1 && localeCards.length < 6) {
                combos.push(new CardCombo({
                    type: comboTypeMapper[localeCards.length],
                    cards: localeCards
                }));
            }
        });
        return Arrays.uniq(combos, (d) => d.getId());
    }

    // _getThreeOfAKind() {
    //     const cards = this.originalCollection.toArray();
    //     const combos = [];
    //     cards.forEach((card, cardIndex, cards) => {
    //         const localeCards = [ card ];
    //         for (let index = 0; index < cards.length - 1; index++) {
    //             if (card !== cards[index] && card.value === cards[index].value) {
    //                 localeCards.push(cards[index]);
    //             }
    //         }
    //         if (localeCards.length === 3) {
    //             combos.push(new CardCombo({
    //                 type: ComboType.ThreeOfAKind,
    //                 cards: localeCards.slice(0, 3)
    //             }));
    //         }
    //     });
            
    //     return Arrays.uniq(combos, (combo) => combo.getId());
    // }

    // _getFourOfAKind() {
    //     const cards = this.originalCollection.toArray();
    //     const combos = [];
    //     cards.forEach((card, cardIndex, cards) => {
    //         const localeCards = [ card ];
    //         for (let index = 0; index < cards.length - 1; index++) {
    //             if (card !== cards[index] && card.value === cards[index].value) {
    //                 localeCards.push(cards[index]);
    //             }
    //         }
    //         if (localeCards.length === 4) {
    //             combos.push(new CardCombo({
    //                 type: ComboType.FourOfAKind,
    //                 cards: localeCards.slice(0, 4)
    //             }));
    //         }
    //     });

    //     cards.forEach((card, cardIndex, cards) => {
    //         for (let index = 0; index < cards.length - 1; index++) {
    //             if (index + 2 > cards.length - 1 || card === cards[index] || card === cards[index + 1] || card === cards[index + 2]) continue;
                
    //             if (card.value === cards[index].value && card.value === cards[index + 1].value && card.value === cards[index + 2].value) {
    //                 combos.push(new CardCombo({
    //                     type: ComboType.FourOfAKind,
    //                     cards: [ card, cards[index], cards[index + 1], cards[index + 2] ]
    //                 }));
    //             }
    //         }
    //     });
            
    //     return Arrays.uniq(combos, (combo) => combo.getId());
    // }

    _getFullHouse() {
        const pair = this.combos.find((d) => d.type === ComboType.Pair);
        const threeOfAKind = this.combos.find((d) => d.type === ComboType.ThreeOfAKind);
        if (pair && threeOfAKind && this._isAllCardDifferents(pair, threeOfAKind)) {
            return new CardCombo({
                type: ComboType.FullHouse,
                cards: [].concat(pair.getCards(), threeOfAKind.getCards())
            });
        }
    }

    _getStraight() {
        const cards = this.originalCollection.toArray();
        const values = cards.map((d) => d.value).sort();
        for (let index = 1, i = values[0]; index < values.length; index++) {
            if (i + 1 !== values[index]) return;
            i++;
        }
        return new CardCombo({
            type: ComboType.Straight,
            cards: cards
        });
    }

    _getFlush() {
        const cards = this.originalCollection.toArray();
        let black = 0, red = 0;
        for (let index = 0; index < cards.length; index++) {
            if (cards[index].isJoker()) {
                black++;
                red++;
            } else if (/Spades|Clubs/.test(cards[index].getSuit())) {
                black++;
            } else red++;
        }
        if (black === cards.length || red === cards.length) {
            return new CardCombo({
                type: ComboType.Flush,
                cards: cards
            });
        } 
    }

    _getStraightFlush() {
        const flush = this.combos.find((d) => d.type === ComboType.Flush);
        const straight = this.combos.find((d) => d.type === ComboType.Straight);
        if (flush && straight) {
            return new CardCombo({
                type: ComboType.StraightFlush,
                cards: flush.getCards()
            });
        }
    }

    _getFiveOfAKind() {
        const fourOfAKind = this.combos.find((d) => d.type === ComboType.FourOfAKind);
        // Joker ?
    }

    /**
     * @param {Combo} c1
     * @param {Combo} c2
     * @returns {boolean}
     */
    _isAllCardDifferents(c1, c2) {
        const c1Cards = c1.getCards();
        const c2Cards = c2.getCards();
        for (let i1 = 0; i1 < c1Cards.length; i1++)
            for (let i2 = 0; i2 < c2Cards.length; i2++)
                if (c1Cards[i1] === c2Cards[i2]) return false;
        return true;
    }

    toString() {
        return this.combos.join('\n');
    }

}

export class CardCombo {

    constructor(object) {
        this.type = object.type;
        this.cards = new CardCollection();
        if (object.cards) this.cards.addAll(object.cards);
        else if (object.card) this.cards.add(object.card);
    }

    getCard() { return this.cards.peek(); }
    getCards() { return this.cards.cards; }

    _sortCards() {
        this.getCards().sort((a, b) => { return Numbers.Compare.asc(a.suit, b.suit); });
    }
    
    getId() {
        this._sortCards();
        return this.getCards().map((d) => `${d.value}&${d.suit}`).join('/');
    }

    getScore() {
        const cards = this.getCards();
        let out = 0;
        for (let index = 0; index < cards.length; index++) out += cards[index].value;
        return out + this.type * 10;
    }

    getTypeName() {
        const keys = Object.keys(ComboType);
        return keys.find((key) => ComboType[key] === this.type);
    }

    toString() {
        return `${this.getTypeName()} { ${this.getCards().join(', ')} }`;
    }

}