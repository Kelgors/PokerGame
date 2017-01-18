import AbsCardArea from './AbsCardArea';

export default class CardRiverArea extends AbsCardArea {

    constructor(x, y) {
        super(x, y, 5);
        this.selectedCardsToBeChanged = [];
    }

    setSelectedCardIndex(index, swt) {
        const card = this.getCardAt(index);
        const indexOfCard = this.selectedCardsToBeChanged.indexOf(card);
        const isSelected = indexOfCard > -1;
        if (isSelected && swt || !isSelected && !swt) return; 
        if (swt) this.selectedCardsToBeChanged.push(card);
        else this.selectedCardsToBeChanged.splice(indexOfCard, 1);
        card.y += swt ? -20 : 20;
    }

}