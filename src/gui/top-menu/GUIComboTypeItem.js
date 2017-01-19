import PIXI from 'pixi.js';
import i18n from '../../i18n';
import {ComboType} from '../../CardComboList';
import {GuiText} from '../../Config';

export default class GUIComboTypeItem extends PIXI.Container {
    constructor(options) {
        super();
        this.comboType = options.comboType;
        this.parentWidth = options.parentWidth;
        this.redraw();
    }

    redraw() {
        this.removeChildren();
        const comboName = ComboType.forName(this.comboType);
        const localeComboName = i18n.t(`ComboType.${comboName}`);
        this.addChild(new PIXI.Text(localeComboName, GuiText.textConfig));
        const factorText = new PIXI.Text(`\u00D7 ${this.comboType}`, GuiText.textConfig);

        factorText.x = this.parentWidth - 50;
        this.addChild(factorText);
    }
};
