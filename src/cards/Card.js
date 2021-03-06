import PIXI from 'pixi.js';
import CardsGenerator from './CardsGenerator';
import BezierEasing from '../lib/BezierEasing';
import TransformAnimation from '../lib/TransformAnimation';

export default class Card extends PIXI.Container {

    constructor(options) {
        super();
        this.value = options.value;
        this.suit = options.suit;

        this.isHighlighted = false;
        this.highlightGraphics = new PIXI.Graphics();
        this.highlightGraphics.visible = false;

        const cardPicture = new PIXI.Sprite(options.texture);
        cardPicture.width = options.width;
        cardPicture.height = options.height;
        this.addChild(this.highlightGraphics);
        this.addChild(cardPicture);
        this.animation = null;
    }

    destroy() {
        this.setAnimation(null);
        super.destroy({ texture: false, baseTexture: false });
    }

    setAnimation(animation) {
        if (this.animation) this.animation.destroy();
        this.animation = animation;
        if (animation) animation.update(this);
    }

    setInAnimation(callback) {
        this.setAnimation(new TransformAnimation({
            posFrom: new PIXI.Point(this.x, this.y - 300),
            posTo: new PIXI.Point(this.x, this.y),
            alphaFrom: 0,
            alphaTo: 1,
            duration: Card.TRANSITION_IN_DURATION,
            callback: (s) => {
                s.setAnimation(null);
                if (callback) callback();
            },
        }));
    }

    setOutAnimation(callback) {
        this.setAnimation(new TransformAnimation({
            posFrom: new PIXI.Point(this.x, this.y),
            posTo: new PIXI.Point(this.x, this.y - 300),
            alphaFrom: 1,
            alphaTo: 0,
            duration: Card.TRANSITION_OUT_DURATION,
            callback: (s) => {
                s.setAnimation(null);
                if (callback) callback();
            },
        }));
    }

    update(game) {
        if (this.animation) this.animation.update(this);
    }

    highlight() {
        const shadowSteps = 10;
        this.isHighlighted = true;
        this.highlightGraphics.visible = true;
        this.highlightGraphics.clear();
        for (let i = 0; i < shadowSteps; i++) {
            const alpha = 0.8 - i / shadowSteps;
            if (alpha < 0) break;
            this.highlightGraphics.lineStyle(1, 0xffff00, alpha)
        .drawRoundedRect(-i, -i, this.width + 1, this.height + 1, this.width / 10);
        }
    }

    isJoker() {
        return this.value === CardsGenerator.JOKER_VALUE;
    }

    getSuit() {
        if (this.isJoker()) return 'Joker';
        return CardsGenerator.SUITS[this.suit];
    }

    getValue() {
        if (this.isJoker()) return 'Joker';
        return CardsGenerator.VALUE_LABELS[this.value];
    }

    toString() {
        return `${this.getValue()} of ${this.getSuit()}`;
    }

}

Card.TRANSITION_IN_DURATION = 100;
Card.TRANSITION_OUT_DURATION = 100;
