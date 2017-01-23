import PIXI from 'pixi.js';
import i18n from '../i18n';
import { BigText } from '../Config';
import TransformAnimation from '../lib/TransformAnimation';
import BezierEasing from '../lib/BezierEasing';
import AbsScoreLayout from './AbsScoreLayout';
import GUIText from '../lib/GUIText';
import { Resolver } from '../utils/Score';
import { CardCombo, ComboType } from '../cards/CardComboList';

export default class GUIScoreLayout extends AbsScoreLayout {

    /**
     * @param {Object} options
     * @param {Game} options.game
     * @param {CardCombo} options.playerCombo
     * @param {CardCombo} options.iaCombo
     */
    constructor(options) {
        super({
            score: Resolver.compareCombos(options.playerCombo, options.iaCombo),
            game: options.game,
        });
        /** @type {CardCombo} */
        this.playerCombo = options.playerCombo;
        /** @type {CardCombo} */
        this.iaCombo = options.iaCombo;

        this.spawnSuitName();
        this.spawnComparison();
        this.mUpdateChildrenPosition();
    }

    destroy() {
        super.destroy();
        this.isDestroyed = true;
    }

    spawnSuitName() {
        let comboName = 'NoCombo';
        if (this.playerCombo) comboName = this.playerCombo.getTypeName();
        this.addChild(new GUIText(i18n.t(`ComboType.${comboName}`), BigText.textConfig));
    }

    getSuitText() {
        return this.getChildAt(0);
    }

    getComparisonText() {
        return this.getChildAt(1);
    }

    update(game) {
        super.update(game);
        switch (this.scoreState) {
            case AbsScoreLayout.STATE_TRANSITION_IDLE:
                this.getSuitText().setAnimation(this.getInAnimation(this.getSuitText(), () => {
                    setTimeout(() => {
                        if (!this.isDestroyed) this.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON);
                    }, this.transitionDelay);
                }));
                this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                break;
            case AbsScoreLayout.STATE_TRANSITION_COMPARISON:
                this.getComparisonText().setAnimation(this.getInAnimation(this.getComparisonText(), () => {
                    setTimeout(() => {
                        if (!this.isDestroyed) this.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING);
                    }, this.transitionDelay);
                }));
                this.getSuitText().setAnimation(this.getOutAnimation(this.getSuitText()));
                this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                break;
            case AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING:
                this.getComparisonText().setAnimation(this.getOutAnimation(this.getComparisonText(), () => {
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_TERMINATED);
                }));
                this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                break;
        }
    }

}

