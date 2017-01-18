import PIXI from 'pixi.js';
import CardsGenerator from './CardsGenerator';
import BezierEasing from './lib/BezierEasing';

export default class Card extends PIXI.Graphics {

  constructor(options) {
    super();
    this.value = options.value;
    this.suit  = options.suit;

    const width = options.width;
    const height = options.height;
    this.originalWidth = options.width;
    this.originalHeight = options.height;
    this.drawBackground();
    const valueText = new PIXI.Text(this.getValue(), {
      fontSize: 26,
      textColor: 0,
      align: 'center',
    });
    const suitText = new PIXI.Text(this.getSuit(), {
      fontSize: 14,
      textColor: 0,
      align: 'center'
    });
    this.isHighlighted = false;
    valueText.x = width/2;
    valueText.y = 30;
    valueText.anchor.set(0.5,0.5);
    suitText.x = width/2;
    suitText.y = height/2;
    suitText.anchor.set(0.5,0.5);
    this.addChild(valueText);
    this.addChild(suitText);
  }

  drawBackground() {
    const shadowSteps = 10;
    this.clear().lineStyle(1, 0x000000, 1)
      .beginFill(this.suit === 1 || this.suit === 2 ? 0xFF0000 : 0, 0.5)
      .drawRoundedRect(0, 0, this.originalWidth, this.originalHeight, this.originalWidth/10)
      .endFill();
    if (this.isHighlighted) {
      for (let i = 1; i < shadowSteps; i++) {
        this.lineStyle(1, 0xffff00, 0.8 - i / shadowSteps)
          .drawRoundedRect(-i, -i, this.originalWidth+i*2, this.originalHeight+i*2, this.originalWidth/10);
      }
      
    }
  }

  highlight() {
    this.isHighlighted = true;
    this.drawBackground();
  }

  isJoker() {
    return this.value === CardsGenerator.JOKER_VALUE;
  }

  getSuit() {
    if (this.suit === CardsGenerator.JOKER) return 'Joker';
    return CardsGenerator.SUITS[this.suit];
  }

  getValue() {
    if (this.value === CardsGenerator.JOKER_VALUE) return 'Joker';
    return CardsGenerator.VALUE_LABELS[this.value];
  }

  toString() {
    return `${this.getValue()} of ${this.getSuit()}`;
  }

}