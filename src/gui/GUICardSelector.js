import PIXI from 'pixi.js';
import Keyboard from '../lib/Keyboard';
import Game from '../Game';

import CardsGenerator from '../CardsGenerator';

export default class GUICardSelector extends PIXI.Graphics {
    constructor(x, y) {
        super();
        const WIDTH = 20;
        const HEIGHT = WIDTH;
        this.clear()
            .lineStyle(3, 0, 1)
            .moveTo(WIDTH/2,0)
            .beginFill(0xffffff, 1)
            .lineTo(WIDTH, HEIGHT)
            .lineTo(0, HEIGHT)
            .lineTo(WIDTH/2,0)
            .endFill();
        this.pivot.set(WIDTH / 2, 0);
        this.originalY = y;
        if (x) this.x = x;
        if (y) this.y = y;
        this.setCursorCardIndex(game, 0);
    }

    setCursorCardIndex(game, index) {
        if (index < 0) index = 4;
        if (index > 4) index = 0;
        this.index = index;
        const p = game.player.getChildPosition(index);
        this.x = p.x + CardsGenerator.CARD_WIDTH / 2;
    }

    /**
     * @param {Game} game
     */
    update(game) {
        this.y += Math.cos(game._frame / 10);
        
        if (Keyboard.isKeyPushed(Keyboard.LEFT_ARROW)) {
            this.setCursorCardIndex(game, this.index - 1);
        } else if (Keyboard.isKeyPushed(Keyboard.RIGHT_ARROW)) {
            this.setCursorCardIndex(game, this.index + 1);    
        } else if (Keyboard.isKeyPushed(Keyboard.UP_ARROW)) {
            if (Keyboard.isKeyDown(Keyboard.SHIFT)) {
                for (let i=0;i<5;i++) game.player.setSelectedCardIndex(i, true);
            } else {
                game.player.setSelectedCardIndex(this.index, true);
            }
        } else if (Keyboard.isKeyPushed(Keyboard.DOWN_ARROW)) {
            if (Keyboard.isKeyDown(Keyboard.SHIFT)) {
                for (let i=0;i<5;i++) game.player.setSelectedCardIndex(i, false);
            } else {
                game.player.setSelectedCardIndex(this.index, false);
            }
            
        } else if (Keyboard.isKeyPushed(Keyboard.ENTER)) {
            this.destroy();
        }
    }
}