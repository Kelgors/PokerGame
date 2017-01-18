import PIXI from 'pixi.js';

export default class GUICursor extends PIXI.Graphics {
    
    constructor() {
        super();
        const WIDTH = 15;
        const HEIGHT = WIDTH;
        this.clear()
            .lineStyle(2, 0, 1)
            .moveTo(0, 0)
            .beginFill(0xffffff, 1)
            .lineTo(WIDTH, HEIGHT/2)
            .lineTo(0, HEIGHT)
            .lineTo(0,0)
            .endFill();
        this.pivot.set(WIDTH, -HEIGHT/2);
    }

    update(game) {
        this.x += Math.cos(game._frame / 10) / 6;
    }

}