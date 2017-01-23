import BezierEasing from './BezierEasing';
import Timer from '../lib/Timer';

export default class TransformAnimation {
    /**
     * @param {Object} options
     * @param {PIXI.Point} options.posFrom
     * @param {PIXI.Point} options.posTo
     * @param {PIXI.Point} options.pivot
     * @param {number} options.scaleFrom
     * @param {number} options.scaleTo
     * @param {number} options.rotationFrom
     * @param {number} options.rotationTo
     * @param {number} options.timeFrom
     * @param {number} options.duration
     * @param {Function} options.callback
    */
    constructor(options) {
        this.posFrom = options.posFrom || null;
        this.posTo = options.posTo || null;
        this.scaleFrom = !isNaN(options.scaleFrom) ? Number(options.scaleFrom) : 1;
        this.scaleTo = !isNaN(options.scaleTo) ? Number(options.scaleTo) : 1;
        this.rotationFrom = !isNaN(options.rotationFrom) ? Number(options.rotationFrom) : 0;
        this.rotationTo = !isNaN(options.rotationTo) ? Number(options.rotationTo) : 0;
        this.alphaFrom = !isNaN(options.alphaFrom) ? Number(options.alphaFrom) : 1;
        this.alphaTo = !isNaN(options.alphaTo) ? Number(options.alphaTo) : 1;
        this.pivot = options.pivot || new PIXI.Point(0, 0);

        this.timer = new Timer(options.duration);
        this.duration = options.duration;
        this.callback = options.callback || function () {};
        this.interpolator = options.interpolator || BezierEasing(0, 0, 1, 1);
    }

    /**
     * Destroy all references presents in the animation
     */
    destroy() {
        this.timer.stop();
        this.timer = null;
        this.posFrom = this.posTo = this.pivot = null;
        this.callback = null;
        this.interpolator = null;
    }

    /**
     * Update object position relative to
     */
    update(sprite) {
        if (!this.timer.isStarted) this.timer.start();
        const rawRatio = Math.min(this.duration, this.timer.time) / this.duration;

        const ratio = Math.max(0, Math.min(1, this.interpolator(rawRatio)));
        sprite.setTransform(
            this.posFrom && this.posTo ? this.posFrom.x + (this.posTo.x - this.posFrom.x) * ratio : sprite.x,
            this.posFrom && this.posTo ? this.posFrom.y + (this.posTo.y - this.posFrom.y) * ratio : sprite.y,
            this.scaleFrom + (this.scaleTo - this.scaleFrom) * ratio,
            this.scaleFrom + (this.scaleTo - this.scaleFrom) * ratio,
            this.rotationFrom + (this.rotationTo - this.rotationFrom) * ratio,
            0,
            0,
            this.pivot.x,
            this.pivot.y
        );
        sprite.alpha = this.alphaFrom + (this.alphaTo - this.alphaFrom) * ratio;

        if (rawRatio == 1) {
            this.callback(sprite);
        }
    }
}
