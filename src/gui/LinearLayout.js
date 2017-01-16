import PIXI from 'pixi.js';

export default class LinearLayout extends PIXI.Container {
    constructor(options = {}) {
        super();
        this.setOrientation(options.orientation || LinearLayout.ORIENTATION_VERTICAL);
    }

    setOrientation(orientation) {
        this._orientation = orientation;
        if (this.orientation === LinearLayout.ORIENTATION_VERTICAL) {
            this._posPropertyName = 'y';
            this._sizePropertyName = 'height';
        } else if (this.orientation === LinearLayout.ORIENTATION_HORIZONTAL) {
            this._posPropertyName = 'x';
            this._sizePropertyName = 'width';
        }
    }

    update(game) {
        this.children.forEach(function (child) { child.update(game); });
        let pos = 0;
        for (let index = 0; index < this.children.length; index++) {
            this.children[index][this._posPropertyName] = pos;
            pos += this.children[index][this._sizePropertyName];
        }
    }
}

LinearLayout.ORIENTATION_VERTICAL = 1;
LinearLayout.ORIENTATION_HORIZONTAL = 2;