import CardsGenerator from './CardsGenerator';
import PlayerArea from './PlayerArea';
import {CardComboList} from './CardComboList';
import LinearLayout from './gui/LinearLayout';
import GUICombosList from './gui/debug/GUICombosList';

const ticker = PIXI.ticker.shared;//new PIXI.ticker.Ticker();

export default class Game {

    constructor(options) {
        this._frame = 0;
        this.cards = null;
        this.player = null;

        this.gameState = Game.GAME_IDLE;
        this.playingGameState = Game.STATE_PLAYING_CHOOSE_BET;

        this.fg = new PIXI.Container();
        this.gui = new LinearLayout();
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
        this.cards = null;
        this.player = null;
        this.fg.removeChildren();
        this.gui.removeChildren();
    }

    newGame() {
        this.gameState = Game.GAME_IDLE;
        this.playingGameState = Game.STATE_PLAYING_CHOOSE_BET;

        const stageWidth = this.renderer.width;
        const stageHeight = this.renderer.height;
        this.player = new PlayerArea(stageWidth/2, stageHeight/3*2);

        this.fg.addChild(this.player);
        this.gui.addChild(new GUICombosList()); 
          
    }

    distribute() {
        this.player.removeChildren();
        this.cards = CardsGenerator.generateCards().shuffle();
        const forcedCards = 5;
        
        [ 0, 1, 2, 2, CardsGenerator.JOKER_VALUE ].forEach(function (value) {
            const card = this.cards.getByValue(value);
            this.player.addChild(card);
            this.cards.remove(card);
        }, this);

        // for (let i = 0; i < forcedCards; i++) {
        //     let card = this.cards.getByValue(2);
        //     if (i > 3) card = this.cards.getByValue(4);
        //     this.player.addChild(card)
        //     this.cards.remove(card);
        // }

        // for (let i = 0; i < forcedCards; i++) {
        //     let card = this.cards.getByValue(i + 1);
        //     this.player.addChild(card)
        //     this.cards.remove(card);
        // }



        for (let index = 0; index < 5 - forcedCards; index++) {
            let card = this.cards.peek()
            this.player.addChild(card);
            this.cards.remove(card);
        }
    }

    setState(state) {
        this.gameState = state;
    }

    setPlayingState(state) {
        this.playingGameState = state;
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
        this.gui.update(this);
        this.renderer.render(this.renderingContainer);
        if (this._frame % 10 === 0) {
            
        }
    }

    getCardComboList() {
        return new CardComboList(this.player.getCards());
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
Game.STATE_PLAYING_CHOOSE_DOUBLE_DOWN = 4;
Game.STATE_PLAYING_DISPLAY_DOUBLE_DOWN = 8;
