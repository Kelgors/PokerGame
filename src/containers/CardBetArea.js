import PIXI from 'pixi.js';
import AbsCardArea from './AbsCardArea';
import TransformAnimation from '../lib/TransformAnimation';

export default class CardBetArea extends AbsCardArea {

    constructor(x, y) {
        super(x, y, 2);
        this.childMargin = 120;
        this.updateLayoutPivot();
    }

    addCard(card) {
        super.addCard(card);
        const index = this.slots.indexOf(card);
        card.setInAnimation();
    }

    update(game) {
        super.update(game);
        this.slots.forEach(function (card) {
            if (card) card.update(game);
        });
    }

}

CardBetArea.TRANSITION_IN_DURATION = 200;