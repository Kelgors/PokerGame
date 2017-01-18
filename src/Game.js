import UpdatableContainer from './containers/UpdatableContainer';
import CardsGenerator from './CardsGenerator';
import {CardComboList} from './CardComboList';
import LinearLayout from './gui/LinearLayout';
import GUICombosList from './gui/debug/GUICombosList';
import GUICardSelector from './gui/GUICardSelector';
import Keyboard from './lib/Keyboard';
import GUIText from './lib/GUIText';
import Tracker from './Tracker';

import GUIScoreLayout from './gui/GUIScoreLayout';

import CardCollection from './CardCollection';

import AbsCardArea from './containers/AbsCardArea';
import CardRiverArea from './containers/CardRiverArea';

const ticker = PIXI.ticker.shared;//new PIXI.ticker.Ticker();

export default class Game {

    constructor(options) {
        this._frame = 0;
        /** @type {CardCollection} */
        this.cards = null;
        /** @type {AbsCardArea} */
        this.river = null;

        this.gameState = Game.GAME_IDLE;
        this.playingGameState = Game.STATE_PLAYING_CHOOSE_BET;

        this.fg = new UpdatableContainer();
        this.gui = new UpdatableContainer();
        this.renderingContainer = new PIXI.Container();
        this.renderingContainer.addChild(this.fg);
        this.renderingContainer.addChild(this.gui);
        // create renderer
        const rendererOptions = {
            transparent: options.transparent || false,
            autoResize: options.autoResize || false,
            antialias: options.antialias || false,
            resolution: options.resolution || 1,
            clearBeforeRender: true,
            backgroundColor: options.backgroundColor,
            roundPixels: options.roundPixels || true
        }; 
        this.renderer = PIXI.autoDetectRenderer(options.width || 800, options.height || 600, rendererOptions, false);
        /** @type {HTMLElement} */
        this.container = null;
        if (options.container) {
            this.container = options.container;
            this.container.appendChild(this.renderer.view);
        }
        this.setSize(this.renderer.width, this.renderer.height);
    }

    destroy() {
        this.clearGame();
        this.fg.destroy();
        this.gui.destroy();
        this.renderer.destroy();
        this.fg = null;
        this.gui = null;
        this.renderer = null;
    }

    clearGame() {
        this.stop();
        if (this.cards) this.cards.destroy();
        this.cards = null;
        this.player = null;
        this.fg.destroyChildren();
        this.gui.destroyChildren();
    }

    newGame() {
        this.gameState = Game.GAME_PLAYING;

        const stageWidth = this.renderer.width;
        const stageHeight = this.renderer.height;
        this.river = new CardRiverArea(stageWidth/2, stageHeight/3*2);
        this.fg.addChild(this.river);
        this.clearBoard();
        this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
          
    }

    clearBoard() {
        this.river.destroyChildren();
        if (this.cards) this.cards.destroy();
        this.cards = CardsGenerator.generateCards().shuffle();
    }

    distribute(count) {
        
        // const forcedCards = 0;
        // [ 3, 2, 1, 0, CardsGenerator.JOKER_VALUE ].forEach(function (value) {
        //     const card = this.cards.getByValue(value);
        //     this.river.addChild(card);
        //     this.cards.remove(card);
        // }, this);
        // // for (let i = 0; i < forcedCards; i++) {
        // //     let card = this.cards.getByValue(2);
        // //     if (i > 3) card = this.cards.getByValue(4);
        // //     this.river.addChild(card)
        // //     this.cards.remove(card);
        // // }
        // // for (let i = 0; i < forcedCards; i++) {
        // //     let card = this.cards.getByValue(i + 1);
        // //     this.river.addChild(card)
        // //     this.cards.remove(card);
        // // }

        for (let index = 0; index < count; index++) {
            let card = this.cards.peek();
            this.river.addCard(card);
            this.cards.remove(card);
        }
    }

    displayCardCursorSelection() {
        const p = this.river.getCardAt(0);
        this.gui.addChild(new GUICardSelector(p.x + CardsGenerator.CARD_WIDTH / 2, p.y + CardsGenerator.CARD_HEIGHT + 25));
    }

    setState(state) {
        this.gameState = state;
    }

    setPlayingState(state) {
        this.playingGameState = state;
        switch (state) {
            case Game.STATE_PLAYING_CHOOSE_CARDS:
                Tracker.track('game:new');
                this.gui.destroyChildren();
                this.clearBoard();
                this.distribute(5);
                this.displayCardCursorSelection();
                break;
            case Game.STATE_PLAYING_DISPLAY_RIVER_SCORE:
                this.commitChanges();
                const combo = this.getCardComboList().getHigherCombo();
                combo.getCards().forEach(function (d) {
                    d.highlight();
                });
                Tracker.track('combo', {
                    type: combo.getTypeName(),
                    cards: combo.getCards().map(String)
                });
                this.gui.addChild(new GUIScoreLayout({
                    playerCombo: combo,
                    game: this
                }));
                
                break;
            case Game.STATE_PLAYING_CHOOSE_RISK:
                break;
            
        }
    }

    getFPS() {
        return ticker.FPS;
    }

    isRunning() {
        return ticker.started;
    }

    isPlaying() {
        return this.gameState === Game.GAME_PLAYING;
    }

    getSize() {
        return { width: this.renderer.width, height: this.renderer.height };
    }

    setSize(w, h) {
        if (this.container) {
            this.container.style.width = `${w}px`;
            this.container.style.height = `${h}px`;
        }
        if (this.renderer.width !== w || this.renderer.height !== h) {
            this.renderer.resize(w, h);
        }
    }

    start() {
        if (!this.isRunning()) {
            if (this.gameState === Game.GAME_IDLE) {
                this.setState(Game.STATE_PLAYING);
            }
            ticker.add(this.loop, this);
            ticker.start();
        }
    }

    stop() {
        if (this.isRunning()) {
            ticker.stop();
            ticker.remove(this.loop, this);
        }
    }

    loop(time) {
        this._frame += 1;

        this.fg.update(this);
        this.gui.update(this);

        if (this.playingGameState === Game.STATE_PLAYING_CHOOSE_CARDS) {
            if (Keyboard.isKeyPushed(Keyboard.ENTER)) {
                this.setPlayingState(Game.STATE_PLAYING_DISPLAY_RIVER_SCORE);
            }
        } else if (this.playingGameState === Game.STATE_PLAYING_DISPLAY_RIVER_SCORE) {
            let scoreLayout = this.gui.findChildrenByType(GUIScoreLayout);  
            if (scoreLayout.scoreState === GUIScoreLayout.STATE_TRANSITION_TERMINATED || Keyboard.isKeyPushed(Keyboard.ENTER)) {
                this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
            }
        }

        this.renderer.render(this.renderingContainer);
        Keyboard.update();
    }

    getCardComboList() {
        return new CardComboList(this.river.getCards());
    }

    commitChanges() {
        const cards = this.river.selectedCardsToBeChanged.splice(0, this.river.selectedCardsToBeChanged.length);
        const cardsLen = cards.length;
        for (let index = 0; index < cardsLen; index++) {
            this.river.removeCard(cards[index]);
            cards[index].destroy(); 
        }
        this.distribute(cardsLen);
    }


    /**
     * 
     * @param {Function} GuiClass - The GuiClass to instantiate
     * @param {boolean=} swt - true will create an instance if it doesnt exists, false will destroy it
     */
    toggleGuiElementPresence(GuiClass, swt) {
        let instance = this.gui.children.find((d) => d instanceof GuiClass);
        if (typeof swt === 'undefined') swt = !instance;
        if (!instance && swt) {
            instance = new GuiClass();
            this.gui.addChild(instance);
        } else if (instance && !swt) {
            instance.destroy();
        }
    }

};
Game.STATE_INTRO = 1;
Game.STATE_PLAYING = 2;
Game.STATE_GAMEOVER = 4;

Game.STATE_PLAYING_CHOOSE_BET = 1;
Game.STATE_PLAYING_CHOOSE_CARDS = 2;
Game.STATE_PLAYING_EXCHANGE_CARD_TRANSITION = 4;
Game.STATE_PLAYING_DISPLAY_RIVER_SCORE = 8;
Game.STATE_PLAYING_CHOOSE_RISK = 16;
Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN = 32;
Game.STATE_PLAYING_UP_OR_DOWN_SCORE = 64;

