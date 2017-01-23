import PIXI from 'pixi.js';
import ContextualBox from '../ContextualBox';
import Rect from '../../lib/Rect';
import i18n from '../../i18n';
import { GuiText, GuiToken } from '../../Config';

export default class GUIBetBox extends ContextualBox {

    constructor() {
        super();
        this.addChild(new PIXI.Text(i18n.t('Bet.Bet'), GuiText.textConfig));
        this.addChild(this.betText = new PIXI.Text('0', GuiToken.textConfig));
    }

    drawBox(game) {
        /** @type {PIXI.Graphics} */
        const graphics = this;
        this.x = this.parent.getWidth() * 4 / 5;
        this.y = this.parent.getHeight() / 8 + 5;
        const rect = new Rect(
            0,
            this.parent.getWidth() - 10 - this.x,
            this.parent.getHeight() / 4 - this.y,
            0
        );
        this._drawBox(graphics, rect);
        this.getChildAt(0).position.set(10, 10);
    }

    update(game) {
        super.update(game);
        this.betText.text = game.betCount;
        this.betText.position.set(this.width - this.betText.width - 10, this.height - this.betText.height - 10);
    }
}
