import PIXI from 'pixi.js';
import Keyboard from './lib/Keyboard';
import Tracker from './Tracker';
import i18n from './i18n';
import Numbers from './utils/Numbers';
import Async from './utils/Async';
import {Resolver,Score} from './utils/Score';

import UpdatableContainer from './containers/UpdatableContainer';
import LinearLayout from './containers/LinearLayout';
import AbsCardArea from './containers/AbsCardArea';
import CardRiverArea from './containers/CardRiverArea';
import CardBetArea from './containers/CardBetArea';

import Card from './cards/Card';
import CardCollection from './cards/CardCollection';
import CardsGenerator from './cards/CardsGenerator';
import {CardComboList,CardCombo,ComboType} from './cards/CardComboList';

import GUICardSelector from './gui/GUICardSelector';
import AbsScoreLayout from './gui/AbsScoreLayout';
import GUIScoreLayout from './gui/GUIScoreLayout';
import GUIBetScore from './gui/GUIBetScore';
import GUIContext from './gui/GUIContext';
import TopMenuLayout from './gui/TopMenuLayout';

const ticker = PIXI.ticker.shared;//new PIXI.ticker.Ticker();
ticker.autoStart = false;
ticker.stop();

export default class Game {

    constructor(options) {
        this._frame = 0;
        /** @type {CardCollection} */
        this.cards = null;
        /** @type {AbsCardArea} */
        this.river = null;
        this._hasChangedPlayingState = false;

        i18n.setup(options.langs);

        this.tokenCount = 10000;
        this.originalBetCount = 100;
        this.betCount = 0;

        this.gameState = Game.GAME_IDLE;
        this._lastPlayingGameState = Game.STATE_PLAYING_CHOOSE_BET;
        this.playingGameState = Game.STATE_PLAYING_CHOOSE_BET;

        this.cardsGenerator = new CardsGenerator(options.cardTextures);

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
        this.cardsGenerator.destroy();
        this.fg.destroy({ children: true });
        this.gui.destroy({ children: true });
        this.renderer.destroy();
        this.cardsGenerator = null;
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
        this.river = new CardRiverArea(stageWidth/2, stageHeight*0.46);
        this.betRiver = new CardBetArea(stageWidth/2, stageHeight/2);
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
    }

    /**
     * Clear the river and generate new deck
     */
    clearBoard() {
        this.river.clearCards();
        if (this.cards) this.cards.destroy();
        this.cards = this.cardsGenerator.generateCards();
        let iteration = Numbers.clamp(Math.floor(Math.random() * 14), 2, 14);
        for (let index = 0; index < iteration; index++) {
            this.cards.shuffle();
        }
        //console.log('shuffle %s times', iteration);
    }

    /**
     * @param {Number} count
     * @param {AbsCardArea} cardArea
     */
    distribute(count, cardArea = this.river) {
        
        // const forcedCards = 0;
        // [ 3, 2, 1, 0, CardsGenerator.JOKER_VALUE ].forEach(function (value) {
        //     const card = this.cards.getByValue(value);
        //     this.river.addChild(card);
        //     this.cards.remove(card);
        // }, this);
        // for (let i = 0; i < forcedCards; i++) {
        //     let card = this.cards.getByValue(2);
        //     if (i > 3) card = this.cards.getByValue(4);
        //     this.river.addChild(card)
        //     this.cards.remove(card);
        // }
        // for (let i = 0; i < forcedCards; i++) {
        //     let card = this.cards.getByValue(i + 1);
        //     this.river.addChild(card)
        //     this.cards.remove(card);
        // }
        const cards = [];
        for (let index = 0; index < count; index++) {
            const card = this.cards.peek();
            this.cards.remove(card);
            cards.push(card);
        }
        const showText = this._lastPlayingGameState !== Game.STATE_PLAYING_CHOOSE_CARDS;
        return Async.forEachAsync(cards, function (card, index) {
            cardArea.addCard(card, showText);
            return Async.wait(index + 1 < count ? 40 : CardRiverArea.TRANSITION_IN_DURATION + 20);
        });
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
        if (state === this.playingGameState) return;
        this._lastPlayingGameState = this.playingGameState;
        this.playingGameState = state;
        this._hasChangedPlayingState = true;
        switch (state) {
            case Game.STATE_PLAYING_CHOOSE_CARDS:
                this.playingGameState = Game.STATE_PLAYING_CARD_TRANSITION;
                this.river.destroyCards();
                this.betRiver.destroyCards();
                this.gui.destroyChildren();

                this.river.visible = true;
                this.betRiver.visible = false;
                this.betCount = this.originalBetCount;
                this.tokenCount -= this.originalBetCount;
                Tracker.track('game:new');
                this.fg.findChildrenByType(GUIContext).displayControls();
                this.clearBoard();
                this.distribute(5).then(() => {
                    this.displayCardCursorSelection();
                    this.playingGameState = Game.STATE_PLAYING_CHOOSE_CARDS;
                });
                break;
            case Game.STATE_PLAYING_DISPLAY_RIVER_SCORE:
                this.playingGameState = Game.STATE_PLAYING_CARD_TRANSITION;
                this.river.hideKeepTexts();
                this.commitChanges().then(this._onChangesCommited.bind(this))
                    .then(() => {
                        this.playingGameState = Game.STATE_PLAYING_DISPLAY_RIVER_SCORE;
                    });
                break;
            case Game.STATE_PLAYING_CHOOSE_RISK:
                this.gui.destroyChildren();
                this.fg.findChildrenByType(GUIContext).displayChooseBet();
                break;
            case Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN:
                this.river.destroyCards();
                this.betRiver.destroyCards();
                this.playingGameState = Game.STATE_PLAYING_CARD_TRANSITION;
                this.river.visible = false;
                this.betRiver.visible = true;
                this.distribute(1, this.betRiver).then(() => {
                    this.fg.findChildrenByType(GUIContext).displayUpOrDownChoice(this._onBetChoiceDone.bind(this));
                    this.playingGameState = Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN;
                });
                break;

        }
    }

    /**
     * Remove selected cards and distribute new ones
     * @async
     * @returns {Promise}
     */
    commitChanges() {
        const cards = this.river.selectedCardsToBeChanged.splice(0, this.river.selectedCardsToBeChanged.length);
        const cardsLen = cards.length;
        return Async.forEachAsync(cards, function (card, index) {
            card.setOutAnimation(() => {
                this.river.removeCard(card);
                card.destroy();
            });
            return Async.wait(index + 1 < cardsLen ? 40 : Card.TRANSITION_OUT_DURATION + 20);
        }, this).then(() => this.distribute(cardsLen));
    }

    /**
     * Display score when distribution animation is over
     */
    _onChangesCommited() {
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
    }

    _onBetChoiceDone(choice) {
        this.fg.findChildrenByType(GUIContext).clearBoxes();
        this.distribute(1, this.betRiver).then(() => {
            const firstCard = this.betRiver.getCardAt(0);
            const lastCard = this.betRiver.getCardAt(1);

            if ((choice == 'up' && firstCard.value < lastCard.value) || (choice == 'down' && firstCard.value > lastCard.value)) {
                this.betCount *= 2;
                this.displayBetScore(Score.WON);
            } else {
                this.displayBetScore(Score.LOST);
            }
            this.setPlayingState(Game.STATE_PLAYING_DISPLAY_BET_SCORE);
        });
    }

    displayBetScore(score) {
        const guiContext = this.fg.findChildrenByType(GUIContext);
        guiContext.displayComparison(score);
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
        if (!this._hasChangedPlayingState) {
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
                    if (scoreLayout && scoreLayout.scoreState === AbsScoreLayout.STATE_TRANSITION_TERMINATED || Keyboard.isKeyPushed(Keyboard.ENTER)) {
                        if (!scoreLayout.hasWon()) {
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
        }

        this.render();
        Keyboard.update();
        this._hasChangedPlayingState = false;
    }

    render() {
        this.renderer.render(this.renderingContainer);
    }

    getCardComboList() {
        return new CardComboList(this.river.getCards());
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

Game.STATE_PLAYING_CARD_TRANSITION = 0;
Game.STATE_PLAYING_CHOOSE_BET = 1;
Game.STATE_PLAYING_CHOOSE_CARDS = 2;
Game.STATE_PLAYING_EXCHANGE_CARD_TRANSITION = 3;
Game.STATE_PLAYING_DISPLAY_RIVER_SCORE = 4;
Game.STATE_PLAYING_CHOOSE_RISK = 5;
Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN = 6;
Game.STATE_PLAYING_DISPLAY_BET_SCORE = 7;
Game.STATE_PLAYING_UP_OR_DOWN_SCORE = 8;

