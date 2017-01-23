import AbsCardArea from './AbsCardArea';

export default class CardBetArea extends AbsCardArea {

    constructor(x, y) {
        super(x, y, 2);
        this.childMargin = 120;
        this.updateLayoutPivot();
    }

    addCard(card) {
        super.addCard(card);
        card.setInAnimation();
    }

    update(game) {
        super.update(game);
        this.slots.forEach(function updateInnerIterator(card) {
            if (card) card.update(game);
        });
    }

}

CardBetArea.TRANSITION_IN_DURATION = 200;
