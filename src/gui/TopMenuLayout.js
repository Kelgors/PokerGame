import PIXI from 'pixi.js';
import UpdatableContainer from '../containers/UpdatableContainer';
import GUIComboTypesList from './top-menu/GUIComboTypesList';
import GUIBetBox from './top-menu/GUIBetBox';
import GUITokenCount from './top-menu/GUITokenCount';
const MARGIN_HONRIZONTAL = 10;
const MARGIN_VERTICAL = 15;

export default class TopMenuLayout extends UpdatableContainer {
    constructor(x, y, game) {
        super();
        this.game = game;
        this.x = x + MARGIN_HONRIZONTAL;
        this.y = y + MARGIN_VERTICAL;
        this.addChild(new GUIComboTypesList());
        this.addChild(new GUIBetBox());
        this.addChild(new GUITokenCount());
    }

    destroy() {
        this.game = null;
        super.destroy();
    }

    update(game) {
        this._width = game.renderer.width - MARGIN_HONRIZONTAL * 2;
        this._height = game.renderer.height - this.y - MARGIN_VERTICAL;
        super.update(game);
    }

    getWidth() { return this._width; }
    getHeight() { return this._height; }
};
