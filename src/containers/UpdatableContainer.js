export default class UpdatableContainer extends PIXI.Container {
    update(game) {
        this.updateChildren(game);
    }

    updateChildren(game) {
        this.children.forEach(function (child) { 
            child.update(game); 
        });
    }
}