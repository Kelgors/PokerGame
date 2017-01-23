import PIXI from 'pixi.js';

export default class UpdatableContainer extends PIXI.Container {
    update(game) {
        this.updateChildren(game);
    }

    destroyChildren() {
        this.children.forEach((d) => d.destroy());
        this.removeChildren();
    }

    /**
     * Invoke update method of all children
     * @param {Game} game
     */
    updateChildren(game) {
        this.children.forEach(function updateChildrenInnerIterator(child) {
            child.update(game);
        });
    }

    /**
     * @param {Function} Type
     * @returns {PIXI.DisplayObject}
     */
    findChildrenByType(Type) {
        return this.children.find((d) => d instanceof Type);
    }

    /**
     * @param {Function} Type
     * @returns {PIXI.DisplayObject[]}
     */
    findAllChildByType(Type) {
        return this.children.filter((d) => d instanceof Type);
    }
}
