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
        this.addAll(this._getPairs());
        // 3 - TwoPair
        // 4 - ThreeOfAKind
        this.addAll(this._getThreeOfAKind());
        // 5 - Straight
        // 6 - Flush
        // 7 - FullHouse
        const fullHouseCombo = this._getFullHouse();
        if (fullHouseCombo) this.add(fullHouseCombo);
        // 8 - FourOfAKind
        this.addAll(this._getFourOfAKind());
        // 9 - StraightFlush
        // 10 - FiveOfAKind
    }

    _getHigherCard() {
        const cards = this.originalCollection.toArray();
        return cards.sort((a, b) => {
            if (a.value > b.value) return -1;
            if (a.value < b.value) return 1;
            return 0;
        })[0];
    }
    
    _getPairs() {
        const cards = this.originalCollection.toArray();
        const combos = [];
        cards.forEach((card, cardIndex, cards) => {
            for (let index = 0; index < cards.length - 1; index++) {
                if (cardIndex === index) continue;
                const otherCard = cards[index];
                if (card.value === otherCard.value) {
                    combos.push(new CardCombo({
                        type: ComboType.Pair,
                        cards: [ card, otherCard ]
                    }));
                }
            }
        });
            
        return Arrays.uniq(combos, (combo) => combo.getId());
    }

    _getThreeOfAKind() {
        const cards = this.originalCollection.toArray();
        const combos = [];
        cards.forEach((card, cardIndex, cards) => {
            for (let index = 0; index < cards.length - 1; index++) {
                if (index + 1 > cards.length - 1 || card === cards[index] || card === cards[index + 1]) continue;
                
                if (card.value === cards[index].value && card.value === cards[index + 1].value) {
                    combos.push(new CardCombo({
                        type: ComboType.ThreeOfAKind,
                        cards: [ card, cards[index], cards[index + 1] ]
                    }));
                }
            }
        });
            
        return Arrays.uniq(combos, (combo) => combo.getId());
    }

    _getFourOfAKind() {
        const cards = this.originalCollection.toArray();
        const combos = [];
        cards.forEach((card, cardIndex, cards) => {
            for (let index = 0; index < cards.length - 1; index++) {
                if (index + 2 > cards.length - 1 || card === cards[index] || card === cards[index + 1] || card === cards[index + 2]) continue;
                
                if (card.value === cards[index].value && card.value === cards[index + 1].value && card.value === cards[index + 2].value) {
                    combos.push(new CardCombo({
                        type: ComboType.FourOfAKind,
                        cards: [ card, cards[index], cards[index + 1], cards[index + 2] ]
                    }));
                }
            }
        });
            
        return Arrays.uniq(combos, (combo) => combo.getId());
    }

    _getFullHouse() {
        const pair = this.combos.find((d) => d.type === ComboType.Pair);
        const threeOfAKind = this.combos.find((d) => d.type === ComboType.ThreeOfAKind);
        if (pair && threeOfAKind) {
            return new CardCombo({
                type: ComboType.FullHouse,
                cards: [].concat(pair.getCards(), threeOfAKind.getCards())
            });
        }
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

    getTypeName() {
        const keys = Object.keys(ComboType);
        return keys.find((key) => ComboType[key] === this.type);
    }

    toString() {
        return `${this.getTypeName()}(${this.getId()}) { ${this.getCards().join(', ')} }`;
    }

}