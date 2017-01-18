import PIXI from 'pixi.js';
import UpdatableContainer from '../containers/UpdatableContainer';

export default class LinearLayout extends UpdatableContainer {
    constructor(options = {}) {
        super();
        this.childMargin = 0;
        if ('x' in options) this.x = options.x;
        if ('y' in options) this.y = options.y;
        if ('childMargin' in options) this.childMargin = options.childMargin;
        this.setOrientation(options.orientation || LinearLayout.ORIENTATION_VERTICAL);
    }

    setOrientation(orientation) {
        this._orientation = orientation;
        if (orientation === LinearLayout.ORIENTATION_VERTICAL) {
            this._posPropertyName = 'y';
            this._sizePropertyName = 'height';
        } else if (orientation === LinearLayout.ORIENTATION_HORIZONTAL) {
            this._posPropertyName = 'x';
            this._sizePropertyName = 'width';
        }
    }

    getChildPosition(childIndex) {
        const child = this.getChildAt(childIndex);
        return new PIXI.Point(this.x - this.pivot.x + child.x - child.pivot.x, this.y - this.pivot.y + child.y - child.pivot.y);
    }

    update(game) {
        super.update(game);
        this.updateChildrenPosition();
    }

    updateChildrenPosition() {
        let pos = 0;
        for (let index = 0; index < this.children.length; index++) {
            this.children[index][this._posPropertyName] = pos;
            pos += this.children[index][this._sizePropertyName] + this.childMargin;
        }
    }
}

LinearLayout.ORIENTATION_VERTICAL = 1;
LinearLayout.ORIENTATION_HORIZONTAL = 2;