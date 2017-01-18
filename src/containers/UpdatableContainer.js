import PIXI from 'pixi.js';

export default class UpdatableContainer extends PIXI.Container {
    update(game) {
        this.updateChildren(game);
    }

    destroyChildren() {
        this.children.forEach((d) => d.destroy());
        this.removeChildren();
    }

    updateChildren(game) {
        this.children.forEach(function (child) { 
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
}