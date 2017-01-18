import ContextualBox from './ContextualBox';
import Rect from '../../lib/Rect';
import LinearLayout from '../LinearLayout';
import {CardCombo} from '../../CardComboList';
import i18n from '../../i18n';

export default class ContextualDisplayer extends ContextualBox {

    constructor() {
        super();
    }

    drawBox(game) {
        /** @type {PIXI.Graphics} */
        const graphics = this;
        const rect = new Rect(0, this.parent.getWidth() * 4/5 - 10, this.parent.getHeight(), 0);
        this._drawBox(graphics, rect);
    }

    displayControls() {
        this.removeChildren();
        const col1 = new LinearLayout({ childMargin: 15 });
        const col2 = new LinearLayout({ childMargin: 15 });
        const rows = new LinearLayout({
            orientation: LinearLayout.ORIENTATION_HORIZONTAL,
            childMargin: 12,
            x: 30
        });

        const textStyle = {
            fontSize: 16,
            fill: 0xffffff,
            stroke: 0,
            strokeThickness: 3
        };

        col1.addChild(new PIXI.Text('\u25C0 \u25B6 Déplacer le curseur', textStyle));
        col1.addChild(new PIXI.Text('\u2B06 / \u2B07 Sélectionner une carte', textStyle));
        col1.updateChildrenPosition();

        col2.addChild(new PIXI.Text('Shift + \u2B06 / \u2B07 Sélectionner toutes les cartes', textStyle));
        col2.addChild(new PIXI.Text('Entrée Changer de carte', textStyle));
        col1.updateChildrenPosition();
        col2.updateChildrenPosition();
        
        rows.addChild(col1);
        rows.addChild(col2);
        rows.updateChildrenPosition();


        const label = new PIXI.Text('Sélectionnez les cartes que vous souhaitez échanger.', textStyle);
        label.x = 30;
        label.y = 10;
        this.addChild(label);
        rows.y = label.y + label.height + 15;
        this.addChild(rows);
    }

    /**
     * @param {CardCombo}
     */
    displayCombo(combo) {
        this.removeChildren();
        const row = new LinearLayout();
        row.x = 30;

        const textStyle = {
            fill: 0xffa172,
            stroke: 0,
            strokeThickness: 3,
            fontSize: 18
        };
        
        row.addChild(new PIXI.Text(`"${i18n.combo(combo.type, combo.getTypeName())}"`, textStyle));

        row.updateChildrenPosition();
        row.y = row.height / 2;
        this.addChild(row);
    }

    displayChooseBet() {
        this.removeChildren();
        const texts = new LinearLayout({
            orientation: LinearLayout.ORIENTATION_HORIZONTAL
        });
        texts.x = 30;

        const textStyleWhite = {
            fontSize: 18,
            fill: 0xffffff,
            stroke: 0,
            strokeThickness: 4
        };
        const textStyleOrange = {
            fontSize: 18,
            fill: 0xff9763,
            stroke: 0,
            strokeThickness: 4
        };

        texts.addChild(new PIXI.Text('Voulez-vous', textStyleWhite));
        texts.addChild(new PIXI.Text('doubler', textStyleOrange));
        texts.addChild(new PIXI.Text('votre mise ?', textStyleWhite));

        texts.updateChildrenPosition();
        texts.y = texts.height / 2;
        this.addChild(texts);
    }

}