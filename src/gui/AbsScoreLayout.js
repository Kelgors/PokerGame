import UpdatableContainer from '../containers/UpdatableContainer';
import {Score} from '../utils/Score';
import i18n from '../i18n';
import GUIText from '../lib/GUIText';
import {BigText} from '../Config';
import TransformAnimation from '../lib/TransformAnimation';
import BezierEasing from '../lib/BezierEasing';

export default class AbsScoreLayout extends UpdatableContainer {
    /**
     * @param {Object} options
     * @param {number} options.score - The score
     */
    constructor(options) {
        super();
        /** @type {number} */
        this.score = options.score;
        this.transitionDuration = options.transitionDuration || 150;
        this.transitionDelay = options.transitionDelay || 1000;

        /** @type {number} */
        this._lastScoreState = 0;
        /** @type {number} */
        this.scoreState = AbsScoreLayout.STATE_TRANSITION_IDLE;
        /** @type {boolean} */
        this.isDestroyed = false;
        /** @type {number} */
        this.rendererWidth = options.game.renderer.width;
        /** @type {number} */
        this.rendererHeight = options.game.renderer.height;
    }

    changeState(state) {
        this._lastScoreState = this.scoreState;
        this.scoreState = state;
    }

    /**
     * Update children initial positions
     * @protected
     */
    mUpdateChildrenPosition() {
        for (let index = 0; index < this.children.length; index++) {
            const child = this.children[index];
            child.x = this.rendererWidth*3/4 + child.width / 2 + 1;
            child.y = this.rendererHeight / 3;
            child.alpha = 0;
        }
    }

    hasWon() {
        return this.score === Score.WON;
    }

    hasLost() {
        return this.score === Score.LOST;
    }

    isDraw() {
        return this.score === Score.DRAW;
    }

    spawnComparison() {
        let comparisonLabel = i18n.t('Defeat');
        if (this.hasWon()) {
            comparisonLabel = i18n.t('Victory');
        } else if (this.isDraw()) {
            comparisonLabel = i18n.t('Draw');
        }
        this.addChild(new GUIText(comparisonLabel, BigText.textConfig));
    }

    getInAnimation(sprite, callback) {
        return new TransformAnimation({
            posFrom: new PIXI.Point(sprite.x, sprite.y),
            posTo: new PIXI.Point(this.rendererWidth/2-sprite.width/2, sprite.y),
            alphaFrom: 0,
            alphaTo: 1,
            duration: this.transitionDuration,
            callback: () => {
                sprite.setAnimation(null);
                if (callback) callback();
            }
        });
    }

    getOutAnimation(sprite, callback) {
        return new TransformAnimation({
            posFrom: new PIXI.Point(sprite.x, sprite.y),
            posTo: new PIXI.Point(this.rendererWidth*1/6-sprite.width/2, sprite.y),
            alphaFrom: 1,
            alphaTo: 0,
            duration: this.transitionDuration,
            callback: () => {
                sprite.setAnimation(null);
                if (callback) callback();
            }
        });
    }
};

AbsScoreLayout.STATE_TRANSITION_IDLE = 0;
AbsScoreLayout.STATE_TRANSITION_SUIT = 1;
AbsScoreLayout.STATE_TRANSITION_COMPARISON = 2;
AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING = 4;
AbsScoreLayout.STATE_TRANSITION_TERMINATED = 8;