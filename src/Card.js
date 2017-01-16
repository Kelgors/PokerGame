import PIXI from 'pixi.js';
import CardsGenerator from './CardsGenerator';

export default class Card extends PIXI.Graphics {

  constructor(options) {
    super();
    this.value = options.value;
    this.suit  = options.suit;

    const width = options.width;
    const height = options.height;
    this.lineStyle(1, 0x000000, 1)
      .beginFill(0xFFFFFF, 1)
      .drawRoundedRect(0, 0, width, height, width/10)
      .endFill();
    this.text = new PIXI.Text(this.toString().split(' of ').join('\nof '), {
      fontSize: 22,
      textColor: 0,
      align: 'center'
    });
    this.text.x = width/2;
    this.text.y = height/2;
    this.text.anchor.set(0.5,0.5);
    this.addChild(this.text);
  }

  getSuit() {
    return CardsGenerator.SUITS[this.suit];
  }

  getValue() {
    return CardsGenerator.VALUE_LABELS[this.value];
  }

  toString() {
    return `${this.getValue()} of ${this.getSuit()}`;
  }

}