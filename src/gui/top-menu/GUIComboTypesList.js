import PIXI from 'pixi.js';
import ContextualBox from '../ContextualBox';
import Rect from '../../lib/Rect';
import LinearLayout from '../../containers/LinearLayout';
import { ComboType } from '../../cards/CardComboList';
import i18n from '../../i18n';
import Numbers from '../../utils/Numbers';
import GUIComboTypeItem from './GUIComboTypeItem';

export default class GUIComboTypesList extends ContextualBox {
    constructor(options) {
        super();
    }

    drawBox(game) {
        /** @type {PIXI.Graphics} */
        const graphics = this;
        const rect = new Rect(0, this.parent.getWidth() * 4 / 5 - 10, this.parent.getHeight() / 4, 0);
        this._drawBox(graphics, rect);
        this.drawLists();
    }

    drawLists() {
        const MARGIN_HOR = 20;
        const width = this.width - MARGIN_HOR * 2;
        const linearLayoutWidth = width / 2 - MARGIN_HOR;

        const col1 = new LinearLayout({
            childMargin: 4,
            x: MARGIN_HOR * 1.5 + 5,
            y: 12,
        });

        const col2 = new LinearLayout({
            childMargin: 4,
            x: width / 2 + col1.x,
            y: 12,
        });

        this.removeChildren();
        this.addChild(col1);
        this.addChild(col2);

        const values = Object.keys(ComboType).map((d) => ComboType[d]).sort(Numbers.Compare.desc);
        [
            values.slice(0, Math.floor(values.length / 2)),
            values.slice(Math.floor(values.length / 2), values.length),
        ].forEach(function (values, i) {
            const layout = this.getChildAt(i);
            values.forEach(function (value) {
                layout.addChild(new GUIComboTypeItem({
                    comboType: value,
                    parentWidth: linearLayoutWidth,
                }));
            }, this);
            layout.updateChildrenPosition();
        }, this);
    }
}
