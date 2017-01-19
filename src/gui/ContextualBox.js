import PIXI from 'pixi.js';

export default class ContextualBox extends PIXI.Graphics {

    constructor() {
        super();
        this._isValid = false;
    }

    clear() {
        this.removeChildren();
    }

    update(game) {
        if (!this._isValid) {
            this.drawBox(game);
            this._isValid=true;
        }
    }

    drawBox(game) {}

    invalidate(){
        this._isValid=false;
    }

    _drawBox(graphics, rect) {
        graphics.moveTo(rect.left, rect.top)
            .lineStyle(1, 0, 1)
            .beginFill(0x675C53, 1)
            .lineTo(rect.right, rect.top)
            .lineTo(rect.right, rect.bottom)
            .lineTo(rect.left, rect.bottom)
            .lineTo(rect.left, rect.top)
            .endFill();
    }
}