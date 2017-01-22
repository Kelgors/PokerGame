import ContextualBox from '../ContextualBox';
import Rect from '../../lib/Rect';
import LinearLayout from '../../containers/LinearLayout';
import {CardCombo} from '../../cards/CardComboList';
import {Score} from '../../utils/Score';
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

        col1.addChild(new PIXI.Text('\u25C0 \u25B6 ' + i18n.t('Controls.MoveCursor'), textStyle));
        col1.addChild(new PIXI.Text('\u2B06 / \u2B07 ' + i18n.t('Controls.SelectCard'), textStyle));
        col1.updateChildrenPosition();

        col2.addChild(new PIXI.Text('Shift + \u2B06 / \u2B07 ' + i18n.t('Controls.SelectCards'), textStyle));
        col2.addChild(new PIXI.Text('Entrée ' + i18n.t('Controls.CommitChanges'), textStyle));
        col1.updateChildrenPosition();
        col2.updateChildrenPosition();
        
        rows.addChild(col1);
        rows.addChild(col2);
        rows.updateChildrenPosition();


        const label = new PIXI.Text(i18n.t('Controls.ControlsLabel'), textStyle);
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

        let comboName = 'NoCombo';
        if (combo) comboName = combo.getTypeName();
        row.addChild(new PIXI.Text(`"${i18n.t('ComboType.' + comboName)}"`, textStyle));

        row.updateChildrenPosition();
        row.y = row.height / 2;
        this.addChild(row);
    }

    displayComparison(score) {
        this.removeChildren();
        const row = new LinearLayout();
        row.x = 30;

        const textStyle = {
            fill: 0xffa172,
            stroke: 0,
            strokeThickness: 3,
            fontSize: 18
        };

        let comparisonName = i18n.t('Defeat');
        if (score === Score.WON) comparisonName = i18n.t('Victory');
        else if (score === Score.DRAW) comparisonName = i18n.t('Draw');

        row.addChild(new PIXI.Text(`"${comparisonName}"`, textStyle));

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

        // TODO: Abstractize this part
        const text = i18n.t('Bet.ChooseBet');
        let bold = false;
        let beginIndex = 0;
        for (let index = 0; index < text.length; index++) {
            const isLastItem = index + 1 >= text.length;
            if ((!bold && text.charAt(index) === '*') || isLastItem) {
                texts.addChild(new PIXI.Text(text.slice(beginIndex, isLastItem ? index + 1 : index).trim(), textStyleWhite));
                beginIndex = index+1;
                bold = true;
                index++;
            } else if ((bold && text.charAt(index) === '*') || isLastItem) {
                texts.addChild(new PIXI.Text(text.slice(beginIndex, isLastItem ? index + 1 : index).trim(), textStyleOrange));
                beginIndex = index+1;
                bold = false;
                index++;
            }
        }

        texts.updateChildrenPosition();
        texts.y = texts.height / 2;
        this.addChild(texts);
    }

    displayUpOrDownChoice() {
        this.removeChildren();
        const textStyleWhite = {
            fontSize: 18,
            fill: 0xffffff,
            stroke: 0,
            strokeThickness: 4
        };
        this.addChild(new PIXI.Text(i18n.t('Bet.UpOrDown'), textStyleWhite));
    }

}