import PIXI from 'pixi.js';

export default class GUIText extends PIXI.Text {
    constructor(text, textStyle) {
        super(text, textStyle);
        this.tags = [ 'gui' ];
    }
    update() {}
}