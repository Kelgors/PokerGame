import CardsGenerator from './CardsGenerator';
import CardCollection from './CardCollection';
import LinearLayout from './gui/LinearLayout';

export default class PlayerArea extends LinearLayout {
    constructor(x, y) {
        super({ 
            x, y, 
            orientation: LinearLayout.ORIENTATION_HORIZONTAL,
            childMargin: 17
        });

        this.selectedCardsToBeChanged = [];
    }

    addChild(...card) {
        const out = super.addChild(...card);
        this.updateChildrenPosition();
        this.pivot.set(this.width/2, this.height/2);
        return out;
    }

    update(game) {}

    getCards() {
        return new CardCollection(this.children.slice(0));
    }

    setSelectedCardIndex(index, swt) {
        const card = this.getChildAt(index);
        const indexOfCard = this.selectedCardsToBeChanged.indexOf(card)
        const isSelected = indexOfCard > -1;
        if (isSelected && swt || !isSelected && !swt) return; 
        if (swt) this.selectedCardsToBeChanged.push(card);
        else this.selectedCardsToBeChanged.splice(indexOfCard, 1);
        card.y += swt ? -20 : 20;
    }
    
}