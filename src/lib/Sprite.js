import PIXI from 'pixi.js';
import Rect from './Rect';

export default class Sprite extends PIXI.Sprite {

    get offsetLeft() {
        return this.offset.left;
    }
    get offsetTop() {
        return this.offset.top;
    }
    get offsetRight() {
        return this.offset.right;
    }
    get offsetBottom() {
        return this.offset.bottom;
    }

    set offsetLeft(value) {
        this.offset.left = value;
    }
    set offsetTop(value) {
        this.offset.top = value;
    }
    set offsetRight(value) {
        this.offset.right = value;
    }
    set offsetBottom(value) {
        this.offset.bottom = value;
    }

    constructor(options) {
        super(options.texture);
        this.name = options.name;
        this.offset = new Rect(...(options.offset || []));
        this.sizeRatio = options.ratio || 1;
        if (window.DEBUG_HITBOX_MODE) {
            const g = new PIXI.Graphics();
            g.name = 'debug-hitbox';
            this.addChild(g);
        }
    }

    intersects(S_Other) {
        const r1 = this.getPhysicalRectangle();
        const r2 = S_Other.getPhysicalRectangle();
        return !(r1.left > r2.right
            || r1.right < r2.left
            || r1.top > r2.bottom
            || r1.bottom < r2.top
        );
    }

    getPhysicalRectangle() {
        const scale = this.scale;
        const scaledOffset = this.offset.scale(scale.x, scale.y);
        const scaledPivot = new PIXI.Point(this.pivot.x * scale.x, this.pivot.y * scale.y);
        const posX = this.x - scaledPivot.x;
        const posY = this.y - scaledPivot.y;
        return new Rect(
          posY + scaledOffset.top,
          posX + this.width - scaledOffset.right,
          posY + this.height - scaledOffset.bottom,
          posX + scaledOffset.left
        );
    }

    update(game) {
        this.mUpdateHitRenderingBox();
        if (!this.mIsSizeCorrect(game.renderer)) this.mUpdateSpriteSize(game.renderer);
    }

    mUpdateHitRenderingBox() {
        if (window.DEBUG_HITBOX_MODE) {
            const g = this.children.find((d) => d.name === 'debug-hitbox');
            if (g) {
                g.clear().beginFill(0xFF0000, 0.5)
                    .drawRect(this.offset.left, this.offset.top, this.texture.width - this.offset.right - this.offset.left, this.texture.height - this.offset.bottom - this.offset.top)
                    .endFill();
            }
        }
    }

    mIsSizeCorrect(renderer) {
        return this.width === Math.floor(renderer.width * this.sizeRatio);
    }

    mUpdateSpriteSize(renderer) {
        const stageSize = { w: renderer.width, h: renderer.height };
        const oldSize = { w: this.width, h: this.height };
        this.width = Math.floor(stageSize.w * this.sizeRatio);
        this.height = this.width * this.texture.height / this.texture.width;
        this.y -= this.height - oldSize.h;
    }
}
