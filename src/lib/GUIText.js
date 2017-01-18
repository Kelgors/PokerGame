import PIXI from 'pixi.js';
import TransformAnimation from './TransformAnimation';

export default class GUIText extends PIXI.Text {
    constructor(text, textStyle) {
        super(text, textStyle);
        this.tags = [ 'gui' ];
    }

    destroy() {
        this.setAnimation(null);
        super.destroy();
    }

    /**
     * @param {TransformAnimation} animation
     */
    setAnimation(animation) {
        if (this.animation) this.animation.destroy();
        this.animation = animation;
    }
    update() {
        if (this.animation) this.animation.update(this);
    }
}