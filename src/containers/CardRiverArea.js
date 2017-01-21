import PIXI from 'pixi.js';
import AbsCardArea from './AbsCardArea';
import CardsGenerator from '../CardsGenerator';

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

    /**
     * @private
     */
    _generateKeepTexts() {
        for (let index = 0, text; index < this.cardSlots; index++) {
            text = new PIXI.Text('GARDER', { fill: 0x000000, fontSize: 16 });
            this.keepTexts.push(text);
            this.addChild(text);
        }
    }

    clearCards() {
        this.displayKeepTexts();
        super.clearCards();
    }

    displayKeepTexts() {
        this.keepTexts.forEach((text) => text.visible = true);
    }

    hideKeepTexts() {
        this.keepTexts.forEach((text) => text.visible = false);
    }

    updateChildrenPosition() {
        let pos = 0;
        for (let index = 0; index < this.cardSlots; index++) {
            const card = this.getCardAt(index);
            if (card) {
                card.x = pos;
                let keepText = this.keepTexts[index];
                if (keepText) {
                    keepText.position.set(pos + CardsGenerator.CARD_WIDTH/2 - keepText.width/2, card.y - keepText.height - 10);
                }
            }

            pos += CardsGenerator.CARD_WIDTH + this.childMargin;
        }
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