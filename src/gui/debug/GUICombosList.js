import PIXI from 'pixi.js';
import { Debug } from '../../Config';

export default class GUICombosList extends PIXI.Text {

    constructor() {
        super('', Debug.textConfig);
    }

    update(game) {
        this.text = game.getCardComboList().toString();
    }
}
