import PIXI from 'pixi.js';
import AbsCardArea from './AbsCardArea';
import CardsGenerator from '../CardsGenerator';
import TransformAnimation from '../lib/TransformAnimation';

export default class CardRiverArea extends AbsCardArea {

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        super(x, y, 5);
        this.childMargin = 40;
        this.updateLayoutPivot();
        this.keepTexts = [];
        this.selectedCardsToBeChanged = [];
        this._generateKeepTexts();
    }

    update(game) {
        super.update(game);
        this.slots.forEach(function (card) {
            if (card) card.update(game);
        });
    }

    /**
     * @private
     */
    _generateKeepTexts() {
        for (let index = 0, text; index < this.cardSlots; index++) {
            text = new PIXI.Text('GARDER', { fill: 0x000000, fontSize: 16 });
            this.keepTexts.push(text);
            this.addChild(text);
        }
        this.hideKeepTexts();
    }

    /** @inheritdoc */
    addCard(card, showText = false) {
        super.addCard(card);
        const index = this.slots.indexOf(card);
        card.setAnimation(new TransformAnimation({
            posFrom: new PIXI.Point(card.x, card.y - 300),
            posTo: new PIXI.Point(card.x, card.y),
            alphaFrom: 0,
            alphaTo: 1,
            duration: CardRiverArea.TRANSITION_IN_DURATION,
            callback: (s) => {
                s.setAnimation(null);
                if (showText) this.displayKeepTexts(index);
            }
        }));
    }

    clearCards() {
        super.clearCards();
    }

    displayKeepTexts(index) {
        const card = this.getCardAt(index);
        const keepText = this.keepTexts[index];
        keepText.visible = true;
        keepText.position.set(
            card.x + CardsGenerator.CARD_WIDTH/2 - keepText.width/2,
            card.y - keepText.height - 10
        );
    }

    hideKeepTexts() {
        this.keepTexts.forEach((text) => text.visible = false);
    }

    /**
     * @param {number} index
     * @param {boolean} swt
     */
    setSelectedCardIndex(index, swt) {
        const card = this.getCardAt(index);
        const indexOfCard = this.selectedCardsToBeChanged.indexOf(card);
        const isSelected = indexOfCard > -1;
        if (isSelected && swt || !isSelected && !swt) return;
        if (swt) {
            this.selectedCardsToBeChanged.push(card);
            this.keepTexts[index].visible = false;
        } else {
            this.selectedCardsToBeChanged.splice(indexOfCard, 1);
            this.keepTexts[index].visible = true;
        }
        card.y += swt ? -20 : 20;
    }

}

CardRiverArea.TRANSITION_IN_DURATION = 200;