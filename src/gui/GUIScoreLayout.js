import PIXI from 'pixi.js';
import {BigText} from '../Config';
import TransformAnimation from '../lib/TransformAnimation';
import BezierEasing from '../lib/BezierEasing';
import UpdatableContainer from '../containers/UpdatableContainer';
import GUIText from '../lib/GUIText';
import {CardCombo, ComboType} from '../CardComboList';

const TRANSITION_DURATION = 150;
const TRANSITION_DELAY = 1000;

export default class GUIScoreLayout extends UpdatableContainer {
    
    /**
     * @param {Object} options
     * @param {Game} options.game
     * @param {CardCombo} options.playerCombo
     * @param {CardCombo} options.iaCombo
     */
    constructor(options) {
        super();
        /** @type {CardCombo} */
        this.playerCombo = options.playerCombo;
        /** @type {CardCombo} */
        this.iaCombo = options.iaCombo || new CardCombo(ComboType.Pair);
        
        this.spawnSuitName();
        this.spawnComparison();

        /** @type {number} */
        this.rendererWidth = options.game.renderer.width;
        /** @type {number} */
        this.rendererHeight = options.game.renderer.height;
        for (let index = 0; index < this.children.length; index++) {
            const child = this.children[index];
            child.x = this.rendererWidth*3/4 + child.width / 2 + 1;
            child.y = this.rendererHeight / 3;
            child.alpha = 0;
        }
        /** @type {number} */
        this._lastScoreState = 0;
        /** @type {number} */
        this.scoreState = GUIScoreLayout.STATE_TRANSITION_IDLE;
        /** @type {boolean} */
        this.isDestroyed = false;
    }
    
    destroy() {
        super.destroy();
        this.isDestroyed = true;
    }

    spawnSuitName() {
        this.addChild(new GUIText(this.playerCombo.getTypeName(), BigText.textConfig));
    }

    spawnComparison() {
        //const iaScore = this.iaCombo.getScore();
        const iaScore = 10;
        const playerScore = this.playerCombo.getScore();
        console.log('playerScore: %s, iaScore: %s', playerScore, iaScore);
        let comparisonLabel = 'Défaite';
        if (playerScore > iaScore) {
            comparisonLabel = 'Victoire';
        } else if (playerScore === iaScore) {
            comparisonLabel = 'Égalité';
        }
        this.addChild(new GUIText(comparisonLabel, BigText.textConfig));
    }

    getSuitText() {
        return this.getChildAt(0);
    }

    getComparisonText() {
        return this.getChildAt(1);
    }

    changeState(state) {
        this._lastScoreState = this.scoreState;
        this.scoreState = state;
    }

    update(game) {
        super.update(game);
        switch (this.scoreState) {
            case GUIScoreLayout.STATE_TRANSITION_IDLE:
                this.getSuitText().setAnimation(this.getInAnimation(this.getSuitText(), () => {
                    setTimeout(() => {
                        if (!this.isDestroyed) this.changeState(GUIScoreLayout.STATE_TRANSITION_COMPARISON);
                    }, TRANSITION_DELAY);
                }));
                this.changeState(GUIScoreLayout.STATE_TRANSITION_SUIT);
                break;
            case GUIScoreLayout.STATE_TRANSITION_COMPARISON:
                this.getComparisonText().setAnimation(this.getInAnimation(this.getComparisonText(), () => {
                    setTimeout(() => {
                        if (!this.isDestroyed) this.changeState(GUIScoreLayout.STATE_TRANSITION_COMPARISON_ENDING);
                    }, TRANSITION_DELAY);
                }));
                this.getSuitText().setAnimation(this.getOutAnimation(this.getSuitText()));
                this.changeState(GUIScoreLayout.STATE_TRANSITION_SUIT);
                break;
            case GUIScoreLayout.STATE_TRANSITION_COMPARISON_ENDING:
                this.getComparisonText().setAnimation(this.getOutAnimation(this.getComparisonText(), () => {
                    this.changeState(GUIScoreLayout.STATE_TRANSITION_TERMINATED);
                }));
                this.changeState(GUIScoreLayout.STATE_TRANSITION_SUIT);
                break;
        }
    }

    getInAnimation(sprite, callback) {
        return new TransformAnimation({
            posFrom: new PIXI.Point(sprite.x, sprite.y),
            posTo: new PIXI.Point(this.rendererWidth/2-sprite.width/2, sprite.y),
            alphaFrom: 0,
            alphaTo: 1,
            duration: TRANSITION_DURATION,
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
            duration: TRANSITION_DURATION,
            callback: () => {
                sprite.setAnimation(null);
                if (callback) callback();
            }
        });
    }
}

GUIScoreLayout.STATE_TRANSITION_IDLE = 0;
GUIScoreLayout.STATE_TRANSITION_SUIT = 1;
GUIScoreLayout.STATE_TRANSITION_COMPARISON = 2;
GUIScoreLayout.STATE_TRANSITION_COMPARISON_ENDING = 4;
GUIScoreLayout.STATE_TRANSITION_TERMINATED = 8;
