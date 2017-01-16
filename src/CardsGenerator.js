import CardCollection from './CardCollection';
import Card from './Card';

const CardsGenerator = {
    CARD_WIDTH: 370 / 3,
    CARD_HEIGHT: 522 / 3,
    SUITS: [ 'Spades', 'Hearts', 'Diamonds', 'Clubs' ],
    VALUE_LABELS: [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace' ],
    generateCards() {
        const output = [];
        for (let suitIndex = 0; suitIndex < CardsGenerator.SUITS.length; suitIndex++) {
            for (let valueIndex = 0; valueIndex < CardsGenerator.VALUE_LABELS.length; valueIndex++) {
                output.push(new Card({
                    width: CardsGenerator.CARD_WIDTH,
                    height: CardsGenerator.CARD_HEIGHT,
                    suit: suitIndex,
                    value: valueIndex
                }));
            }
        }
        return new CardCollection(output);
    }
};

export default CardsGenerator;
