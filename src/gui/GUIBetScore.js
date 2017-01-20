import PIXI from 'pixi.js';
import i18n from '../i18n';
import {BigText} from '../Config';
import TransformAnimation from '../lib/TransformAnimation';
import BezierEasing from '../lib/BezierEasing';
import AbsScoreLayout from './AbsScoreLayout';
import GUIText from '../lib/GUIText';
import {Resolver} from '../Score';
import {CardCombo, ComboType} from '../CardComboList';

export default class GUIBetScore extends AbsScoreLayout {

    /**
     * @param {Object} options
     * @param {Game} options.game
     * @param {CardCombo} options.playerCombo
     * @param {CardCombo} options.iaCombo
     */
    constructor(options) {
        super(options);
        this.spawnComparison();
        this.mUpdateChildrenPosition();
    }
    
    destroy() {
        super.destroy();
        this.isDestroyed = true;
    }

    getComparisonText() {
        return this.getChildAt(0);
    }

    update(game) {
        super.update(game);
        switch (this.scoreState) {
            case AbsScoreLayout.STATE_TRANSITION_IDLE:
                this.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON);
                break;
            case AbsScoreLayout.STATE_TRANSITION_COMPARISON:
                this.getComparisonText().setAnimation(this.getInAnimation(this.getComparisonText(), () => {
                    setTimeout(() => {
                        if (!this.isDestroyed) this.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING);
                    }, this.transitionDelay);
                }));
                this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                break;
            case AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING:
                this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                this.getComparisonText().setAnimation(this.getOutAnimation(this.getComparisonText(), () => {
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_TERMINATED);
                }));
                break;
        }
    }


}


