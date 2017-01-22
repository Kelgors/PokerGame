import PIXI from 'pixi.js';
import LinearLayout from './LinearLayout';
import CardsGenerator from '../cards/CardsGenerator';
import CardCollection from '../cards/CardCollection';
import Card from '../cards/Card';

export default class AbsCardArea extends LinearLayout {

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} cardSlots
     */
    constructor(x, y, cardSlots) {
        super({ 
            orientation: LinearLayout.ORIENTATION_HORIZONTAL,
            childMargin: CardsGenerator.CARD_WIDTH / 10
        });
        this.x = x;
        this.y = y;
        /** @type {number} */
        this.cardSlots = cardSlots;
        /** @type {Card[]} */
        this.slots = new Array(this.cardSlots);
        this.updateLayoutPivot();
    }

    /** @inheritdoc */
    destroyChildren() {
        this.slots = new Array(this.cardSlots);
        return super.destroyChildren();
    }
    /** @inheritdoc */
    destroyCards() {
        this.slots.forEach((card) => {
            this.removeCard(card);
            card.destroy();
        });
        this.slots = new Array(this.cardSlots);
    }

    clearCards() {
        this.slots.forEach((card) => {
            this.removeCard(card);
        });
        this.slots = new Array(this.cardSlots);
    }

    /**
     * @param {number} index
     * @returns {Card}
     */
    removeCardAt(index) {
        if (index < 0 || index >= this.cardSlots) 
            throw new Error(`OutOfBoundException: AbsCardArea(slots: ${this.cardSlots}), index was ${index}`);
        const card = this.slots[index];
        if (card) {
            this.removeChild(card);
            this.slots[index] = null;
        }
        return card;
    }

    /**
     * @param {Card} card
     * @returns {Card}
     */
    removeCard(card) {
        return this.removeCardAt(this.slots.indexOf(card));
    }

    /**
     * @returns {CardCollection}
     */
    getCards() {
        return new CardCollection(this.slots.slice(0))
    }

    /**
     * @param {number} index
     * @returns {Card}
     */
    getCardAt(index) {
        return this.slots[index];
    }

    /**
     * @param {number} index
     * @returns {PIXI.Point}
     */
    getCardPositionAt(index) {
        return this.getChildPosition(this.getCardAt(index));
    }

    /**
     * Find the first empty card slot index
     * @returns {number}
     */
    findFirstEmptySlot() {
        for (let index = 0; index < this.cardSlots; index++) {
            if (!this.slots[index]) return index;
        }
        return -1;
    }

    /**
     * Add a child to the first empty card slot
     * @param {Card} card
     */
    addCard(card) {
        return this.addCardAt(card, this.findFirstEmptySlot());
    }

    /**
     * Add a child to a slot
     * @param {Card} card
     * @param {number} index
     */
    addCardAt(card, index) {
        if (index < 0 || index >= this.cardSlots) 
            throw new Error(`OutOfBoundException: AbsCardArea(slots: ${this.cardSlots}), index was ${index}`);
        if (this.slots[index]) {
            this.removeChild(this.slots[index]);
        }
        this.slots[index] = card;
        this.updateChildrenPosition();
        return super.addChild(card);
    }

    /**
     * Update all children position
     */
    updateChildrenPosition() {
        let pos = 0;
        for (let index = 0; index < this.cardSlots; index++) {
            const card = this.getCardAt(index);
            if (card) card[this._posPropertyName] = pos;
            pos += CardsGenerator.CARD_WIDTH + this.childMargin;
        }
    }

    updateLayoutPivot() {
        const width = this.cardSlots * CardsGenerator.CARD_WIDTH + (this.cardSlots-1) * this.childMargin;
        this.pivot.set(width / 2, 0);
    }

    update(game) {}

}