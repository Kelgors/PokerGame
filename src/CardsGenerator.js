import PIXI from 'pixi.js';
import CardCollection from './CardCollection';
import Card from './Card';

class CardsGenerator {
    /**
     * @param {Object<string, PIXI.Texture>}
     */
    constructor(cardsTexture) {
        /** @type {Object<string, PIXI.Texture>} */
        this.cardsTexture = cardsTexture;
        if (!cardsTexture) throw new Error('CardsGenerator needs CardTexture');
    }

    toAssetName(value, suit) {
        if (suit === CardsGenerator.RED_JOKER) return 'red_joker';
        if (suit === CardsGenerator.BLACK_JOKER) return 'black_joker';
        return `card:${CardsGenerator.VALUE_LABELS[value].toLowerCase()}_of_${CardsGenerator.SUITS[suit].toLowerCase()}`;
    }

    generateCards() {
        const output = [];
        for (let suitIndex = 0; suitIndex < CardsGenerator.SUITS.length; suitIndex++) {
            for (let valueIndex = 0; valueIndex < CardsGenerator.VALUE_LABELS.length; valueIndex++) {
                const assetName = this.toAssetName(valueIndex, suitIndex);
                const texture = this.cardsTexture[assetName];
                if (!texture) throw new Error(`Asset ${assetName} is missing`);
                output.push(new Card({
                    width: CardsGenerator.CARD_WIDTH,
                    height: CardsGenerator.CARD_HEIGHT,
                    suit: suitIndex,
                    value: valueIndex,
                    texture: texture
                }));
            }
        }
        output.push(new Card({
            width: CardsGenerator.CARD_WIDTH,
            height: CardsGenerator.CARD_HEIGHT,
            suit: CardsGenerator.RED_JOKER,
            value: CardsGenerator.JOKER_VALUE,
            texture: this.cardsTexture['card:red_joker']
        }));
        output.push(new Card({
            width: CardsGenerator.CARD_WIDTH,
            height: CardsGenerator.CARD_HEIGHT,
            suit: CardsGenerator.BLACK_JOKER,
            value: CardsGenerator.JOKER_VALUE,
            texture: this.cardsTexture['card:black_joker']
        }));
        return new CardCollection(output);
    }
}

CardsGenerator.CARD_WIDTH = 370 / 4;
CardsGenerator.CARD_HEIGHT = 522 / 4;
CardsGenerator.RED_JOKER = 'RedJoker';
CardsGenerator.BLACK_JOKER = 'BlackJoker';
CardsGenerator.JOKER_VALUE = 13;
CardsGenerator.SUITS = [ 'Spades', 'Hearts', 'Diamonds', 'Clubs' ];
CardsGenerator.VALUE_LABELS = [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace' ];

export default CardsGenerator;
