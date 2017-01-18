import PIXI from 'pixi.js';
import UpdatableContainer from '../containers/UpdatableContainer';
import ContextualDisplayer from './contextual-menu/ContextualDisplayer';
import ContextualMenu from './contextual-menu/ContextualMenu';
import Game from '../Game';

const MARGIN_HONRIZONTAL = 10;
const MARGIN_VERTICAL = 15;

export default class GUIContext extends UpdatableContainer {

    constructor(x, y, game) {
        super();
        /** @type {Game} */
        this.game = game;
        this.x = x + MARGIN_HONRIZONTAL;
        this.y = y - MARGIN_VERTICAL;
        this.addChild(new ContextualDisplayer());
        this.addChild(new ContextualMenu());
    }

    update(game) {
        this._width = game.renderer.width - MARGIN_HONRIZONTAL * 2;
        this._height = game.renderer.height - this.y - MARGIN_VERTICAL; 
        super.update(game);
    }

    getWidth() {
        return this._width;
    }

    getHeight() {
        return this._height;
    }

    displayControls() {
        this.getChildAt(0).displayControls();
        this.getChildAt(1).removeChildren();
    }

    displayCombo(combo) {
        this.getChildAt(0).displayCombo(combo);
        this.getChildAt(1).removeChildren();
    }

    displayChooseBet() {
        this.getChildAt(0).displayChooseBet();
        this.getChildAt(1).displayMenu([
            {
                label: 'Yes',
                callback: () => this.game.setPlayingState(Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN)
            },
            {
                label: 'No',
                callback: () => this.game.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS)
            }
        ]);
    }

    displayMenu() {

    }

}