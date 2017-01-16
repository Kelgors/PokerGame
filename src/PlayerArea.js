import CardsGenerator from './CardsGenerator';
import CardCollection from './CardCollection';

export default class PlayerArea extends PIXI.Container {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    addChild(...card) {
        const out = super.addChild(...card);
        this.updateCardPositions();
        return out;
    }

    updateCardPositions() {
        const cardLen = this.children.length;
        if (cardLen === 0) return;
        const cardWidth = CardsGenerator.CARD_WIDTH;
        const paddingHorizontal = 10;
        for (let index = 0; index < cardLen; index++) {
            const card = this.getChildAt(index);
            card.x = index * cardWidth + index * paddingHorizontal;
            card.y = 0;
        }
        this.pivot.set(this.width/2, this.height/2);
    }

    getCards() {
        return new CardCollection(this.children.slice(0));
    }
    
}