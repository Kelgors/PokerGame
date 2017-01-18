import PIXI from 'pixi.js';
import GUIText from '../lib/GUIText';
import {BigText} from '../Config';
import TransformAnimation from '../lib/TransformAnimation';
import BezierEasing from '../lib/BezierEasing';

export default class GUISuitName extends GUIText {

    /**
     * @param {String} text
     */
    constructor(options) {
        super(options.text, BigText.textConfig);
        this.x = options.game.renderer.width + this.width / 2 + 1;
        this.y = options.game.renderer.height / 3 - this.height / 2;
        this.setAnimation(new TransformAnimation({
            posFrom: new PIXI.Point(this.x, this.y),
            posTo: new PIXI.Point(options.game.renderer.width/2-this.width/2, this.y),
            duration: 400,
            interpolator: BezierEasing(.26,.58,.63,.97),
            callback: () => {
                this.setAnimation(null);
            }
        }));
    }

}