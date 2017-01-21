import PIXI from 'pixi.js';
import CardsGenerator from './CardsGenerator';
import BezierEasing from './lib/BezierEasing';

export default class Card extends PIXI.Container {

  constructor(options) {
    super();
    this.value = options.value;
    this.suit  = options.suit;

    this.isHighlighted = false;
    this.highlightGraphics = new PIXI.Graphics();
    this.highlightGraphics.visible = false;

    const cardPicture = new PIXI.Sprite(options.texture);
    cardPicture.width = options.width;
    cardPicture.height = options.height;
    this.addChild(this.highlightGraphics);
    this.addChild(cardPicture);
  }

  highlight() {
    const shadowSteps = 10;
    this.isHighlighted = true;
    this.highlightGraphics.visible = true;
    this.highlightGraphics.clear();
    for (let i = 0; i < shadowSteps; i++) {
      let alpha = 0.8 - i / shadowSteps;
      if (alpha < 0) break;
      this.highlightGraphics.lineStyle(1, 0xffff00, alpha)
        .drawRoundedRect(-i, -i, this.width+1, this.height+1, this.width/10);
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