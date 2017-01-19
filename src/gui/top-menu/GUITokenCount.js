import PIXI from 'pixi.js';
import ContextualBox from '../ContextualBox';
import Rect from '../../lib/Rect';
import i18n from '../../i18n';
import {GuiText,GuiToken} from '../../Config';

export default class GUITokenCount extends ContextualBox {

    constructor() {
        super();
        this.addChild(new PIXI.Text(i18n.t('TotalToken'), GuiText.textConfig));
        this.addChild(this.totalTokenText = new PIXI.Text('0', GuiToken.textConfig));
    }

    drawBox(game) {
        /** @type {PIXI.Graphics} */
        const graphics = this;
        this.x = this.parent.getWidth() * 4 / 5;
        const rect = new Rect(
            0,
            this.parent.getWidth() - 10 - this.x,
            this.parent.getHeight()/8 - 5,
            0);
        this._drawBox(graphics, rect);
        this.getChildAt(0).position.set(10, 10);
    }

    update(game) {
        super.update(game);
        this.totalTokenText.text = game.tokenCount;
        this.totalTokenText.position.set( this.width - this.totalTokenText.width - 10, this.height - this.totalTokenText.height - 10 );
    }
};
