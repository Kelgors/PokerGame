import Keyboard from './lib/Keyboard';
import Tracker from './Tracker';
import i18n from './i18n';

import UpdatableContainer from './containers/UpdatableContainer';
import LinearLayout from './gui/LinearLayout';

import CardCollection from './CardCollection';
import CardsGenerator from './CardsGenerator';
import {CardComboList,CardCombo,ComboType} from './CardComboList';
import {Resolver,Score} from './Score';

import GUICardSelector from './gui/GUICardSelector';
import AbsScoreLayout from './gui/AbsScoreLayout';
import GUIScoreLayout from './gui/GUIScoreLayout';
import GUIBetScore from './gui/GUIBetScore';
import GUIContext from './gui/GUIContext';
import TopMenuLayout from './gui/TopMenuLayout';

import AbsCardArea from './containers/AbsCardArea';
import CardRiverArea from './containers/CardRiverArea';
import CardBetArea from './containers/CardBetArea';

const ticker = PIXI.ticker.shared;//new PIXI.ticker.Ticker();

export default class Game {

    constructor(options) {
        this._frame = 0;
        /** @type {CardCollection} */
        this.cards = null;
        /** @type {AbsCardArea} */
        this.river = null;

        i18n.setup(options.langs);

        this.tokenCount = 54960;
        this.originalBetCount = 100;
        this.betCount = 100;

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

    setLanguage(lang) {
        i18n.setLang(lang);
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
        this.gameState = Game.STATE_IDLE;

        const stageWidth = this.renderer.width;
        const stageHeight = this.renderer.height;
        this.river = new CardRiverArea(stageWidth/2, stageHeight/4*2);
        this.betRiver = new CardBetArea(stageWidth/2, stageHeight/4*2);
        this.river.visible = false;
        this.betRiver.visible = false;
        this.fg.addChild(this.river);
        this.fg.addChild(this.betRiver);
        const contextualBox = new GUIContext(0, stageHeight * 5/6, this);
        const topMenu = new TopMenuLayout(0, 0, this);

        this.fg.addChild(contextualBox);
        this.fg.addChild(topMenu);
        contextualBox.update(this);
        topMenu.update(this);
        this.clearBoard();
        this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
          
    }

    clearBoard() {
        this.river.destroyChildren();
        if (this.cards) this.cards.destroy();
        this.cards = CardsGenerator.generateCards().shuffle();
    }

    /**
     * @param {number} count
     * @param {AbsCardArea} cardArea
     */
    distribute(count, cardArea = this.river) {
        
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
            cardArea.addCard(card);
            this.cards.remove(card);
        }
    }

    displayCardCursorSelection() {
        const p = this.river.getCardAt(0);
        const cursor = new GUICardSelector(p.x + CardsGenerator.CARD_WIDTH / 2, p.y + CardsGenerator.CARD_HEIGHT + 25)
        cursor.setCursorCardIndex(this, 0);
        this.gui.addChild(cursor);
    }

    setState(state) {
        this.gameState = state;
    }

    setPlayingState(state) {
        this.playingGameState = state;
        switch (state) {
            case Game.STATE_PLAYING_CHOOSE_CARDS:
                this.river.visible = true;
                this.betRiver.visible = false;
                this.betCount = this.originalBetCount;
                this.tokenCount -= this.originalBetCount;
                Tracker.track('game:new');
                this.gui.destroyChildren();
                this.fg.findChildrenByType(GUIContext).displayControls();
                this.clearBoard();
                this.distribute(5);
                this.displayCardCursorSelection();
                break;
            case Game.STATE_PLAYING_DISPLAY_RIVER_SCORE:
                this.commitChanges();
                const combo = this.getCardComboList().getHigherCombo() || null;
                const iaCombo = new CardCombo({ type: ComboType.Pair });

                const score = Resolver.compareCombos(combo, iaCombo);
                if (combo) {
                    combo.getCards().forEach(function (d) {
                        d.highlight();
                    });
                    Tracker.track('combo', {
                        type: combo.getTypeName(),
                        cards: combo.getCards().map(String)
                    });
                    if (Score.WON === score) {
                        this.betCount = this.originalBetCount * combo.type;
                    }
                }
                this.fg.findChildrenByType(GUIContext).displayCombo(combo);
                this.gui.addChild(new GUIScoreLayout({
                    playerCombo: combo,
                    iaCombo: iaCombo,
                    game: this
                }));
                
                break;
            case Game.STATE_PLAYING_CHOOSE_RISK:
                this.gui.destroyChildren();
                this.fg.findChildrenByType(GUIContext).displayChooseBet();
                break;
            case Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN:
                this.river.visible = false;
                this.betRiver.visible = true;
                this.betRiver.destroyChildren();
                this.distribute(1, this.betRiver);
                this.fg.findChildrenByType(GUIContext).displayUpOrDownChoice(this._onBetChoiceDone.bind(this));
                break;

        }
    }

    _onBetChoiceDone(choice) {
        this.distribute(1, this.betRiver);
        const firstCard = this.betRiver.getCardAt(0);
        const lastCard = this.betRiver.getCardAt(1);

        if ((choice == 'up' && firstCard.value < lastCard.value) || (choice == 'down' && firstCard.value > lastCard.value)) {
            this.betCount *= 2;
            this.displayBetScore(Score.WON);
        } else {
            this.displayBetScore(Score.LOST);
        }
        this.setPlayingState(Game.STATE_PLAYING_DISPLAY_BET_SCORE);
    }

    displayBetScore(score) {
        this.gui.addChild(new GUIBetScore({
            game: this,
            score: score
        }));
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
        if (this.gameState === Game.STATE_PLAYING) {
            if (this.playingGameState === Game.STATE_PLAYING_CHOOSE_CARDS) {
                if (Keyboard.isKeyPushed(Keyboard.ENTER)) {
                    this.setPlayingState(Game.STATE_PLAYING_DISPLAY_RIVER_SCORE);
                }
            } else if (this.playingGameState === Game.STATE_PLAYING_DISPLAY_BET_SCORE) {

                let scoreLayout = this.gui.findChildrenByType(GUIBetScore);
                if (scoreLayout.scoreState === AbsScoreLayout.STATE_TRANSITION_TERMINATED || Keyboard.isKeyPushed(Keyboard.ENTER)) {
                    if (scoreLayout.hasWon()) {
                        this.setPlayingState(Game.STATE_PLAYING_CHOOSE_RISK);
                    } else {
                        this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
                    }
                }

            } else if (this.playingGameState === Game.STATE_PLAYING_DISPLAY_RIVER_SCORE) {
                let scoreLayout = this.gui.findChildrenByType(GUIScoreLayout);
                if (scoreLayout.scoreState === AbsScoreLayout.STATE_TRANSITION_TERMINATED || Keyboard.isKeyPushed(Keyboard.ENTER)) {
                    if (!scoreLayout.playerCombo || scoreLayout.playerCombo.type < 2) {
                        if (scoreLayout.playerCombo) {
                            this.tokenCount += this.betCount;
                        }
                        this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
                    } else {
                        this.setPlayingState(Game.STATE_PLAYING_CHOOSE_RISK);
                    }
                }
            }
        }

        if (this.gameState === Game.STATE_IDLE) {
            this.gameState = Game.STATE_PLAYING;
            this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
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

Game.STATE_IDLE = 0;
Game.STATE_INTRO = 1;
Game.STATE_PLAYING = 2;
Game.STATE_GAMEOVER = 4;

Game.STATE_PLAYING_CHOOSE_BET = 1;
Game.STATE_PLAYING_CHOOSE_CARDS = 2;
Game.STATE_PLAYING_EXCHANGE_CARD_TRANSITION = 3;
Game.STATE_PLAYING_DISPLAY_RIVER_SCORE = 4;
Game.STATE_PLAYING_CHOOSE_RISK = 5;
Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN = 6;
Game.STATE_PLAYING_DISPLAY_BET_SCORE = 7;
Game.STATE_PLAYING_UP_OR_DOWN_SCORE = 8;

