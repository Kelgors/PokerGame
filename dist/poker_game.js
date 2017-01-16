(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('pixi.js')) :
  typeof define === 'function' && define.amd ? define(['pixi.js'], factory) :
  (global.PokerGame = factory(global.PIXI));
}(this, (function (PIXI$1) { 'use strict';

PIXI$1 = 'default' in PIXI$1 ? PIXI$1['default'] : PIXI$1;

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Card = function (_PIXI$Graphics) {
  inherits(Card, _PIXI$Graphics);

  function Card(options) {
    classCallCheck(this, Card);

    var _this = possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this));

    _this.value = options.value;
    _this.suit = options.suit;

    var width = options.width;
    var height = options.height;
    _this.lineStyle(1, 0x000000, 1).beginFill(0xFFFFFF, 1).drawRoundedRect(0, 0, width, height, width / 10).endFill();
    _this.text = new PIXI$1.Text(_this.toString().split(' of ').join('\nof '), {
      fontSize: 14,
      textColor: 0,
      align: 'center'
    });
    _this.text.x = width / 2;
    _this.text.y = height / 2;
    _this.text.anchor.set(0.5, 0.5);
    _this.addChild(_this.text);
    return _this;
  }

  createClass(Card, [{
    key: 'isJoker',
    value: function isJoker() {
      return this.value === CardsGenerator.JOKER_VALUE;
    }
  }, {
    key: 'getSuit',
    value: function getSuit() {
      if (this.suit === CardsGenerator.JOKER) return 'Joker';
      return CardsGenerator.SUITS[this.suit];
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.value === CardsGenerator.JOKER_VALUE) return 'Joker';
      return CardsGenerator.VALUE_LABELS[this.value];
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.getValue() + ' of ' + this.getSuit();
    }
  }]);
  return Card;
}(PIXI$1.Graphics);

var CardCollection = function () {
    createClass(CardCollection, null, [{
        key: 'from',
        value: function from(arrayOfCard) {
            if (arrayOfCard instanceof CardCollection) return arrayOfCard;
            if (Array.isArray(arrayOfCard)) return new CardCollection(arrayOfCard);
            return new CardCollection();
        }
    }]);

    function CardCollection(arrayOfCard) {
        classCallCheck(this, CardCollection);

        if (arrayOfCard instanceof CardCollection) {
            this.cards = arrayOfCard.cards.slice(0);
        } else if (Array.isArray(arrayOfCard)) {
            this.cards = arrayOfCard;
        } else {
            this.cards = [];
        }
    }

    /**
     * @param {Card[]} cards
     */


    createClass(CardCollection, [{
        key: 'addAll',
        value: function addAll(cards) {
            var _cards;

            (_cards = this.cards).push.apply(_cards, toConsumableArray(cards));
        }

        /**
         * @param {Card} card
         */

    }, {
        key: 'add',
        value: function add(card) {
            this.cards.push(card);
        }

        /**
         * @param {Card} card
         */

    }, {
        key: 'remove',
        value: function remove(card) {
            var index = void 0;
            if ((index = this.cards.indexOf(card)) > -1) {
                return this.cards.splice(index, 1)[0];
            }
            return null;
        }

        /**
         * @param {number} suit
         * @param {number} value
         * @returns {Card} card
         */

    }, {
        key: 'getBySuitAndValue',
        value: function getBySuitAndValue(suit, value) {
            return this.cards.find(function (c) {
                return c.value === value && c.suit === suit;
            });
        }

        /**
         * @param {number} value
         * @returns {Card} card
         */

    }, {
        key: 'getByValue',
        value: function getByValue(value) {
            return this.cards.find(function (c) {
                return c.value === value;
            });
        }

        /**
         * @param {number} suit
         * @returns {Card} card
         */

    }, {
        key: 'getBySuit',
        value: function getBySuit(suit) {
            return this.cards.find(function (c) {
                return c.suit === suit;
            });
        }

        /**
         * @returns {Card} card
         */

    }, {
        key: 'peek',
        value: function peek() {
            return this.cards[0];
        }
    }, {
        key: 'shuffle',
        value: function shuffle() {
            var output = [];
            var input = this.toArray();
            while (input.length > 0) {
                var index = Math.floor(Math.random() * input.length);
                output.push(input.splice(index, 1)[0]);
            }
            this.cards = output;
            return this;
        }

        /**
         * @returns {Card[]}
         */

    }, {
        key: 'toArray',
        value: function toArray() {
            return this.cards.slice(0);
        }

        /**
         * @returns {String}
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.cards.toString();
        }
    }]);
    return CardCollection;
}();

var CardsGenerator = {
    CARD_WIDTH: 370 / 4,
    CARD_HEIGHT: 522 / 4,
    JOKER: 'Joker',
    JOKER_VALUE: 13,
    SUITS: ['Spades', 'Hearts', 'Diamonds', 'Clubs'],
    VALUE_LABELS: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'],
    generateCards: function generateCards() {
        var output = [];
        for (var suitIndex = 0; suitIndex < CardsGenerator.SUITS.length; suitIndex++) {
            for (var valueIndex = 0; valueIndex < CardsGenerator.VALUE_LABELS.length; valueIndex++) {
                output.push(new Card({
                    width: CardsGenerator.CARD_WIDTH,
                    height: CardsGenerator.CARD_HEIGHT,
                    suit: suitIndex,
                    value: valueIndex
                }));
            }
        }
        for (var index = 0; index < 2; index++) {
            output.push(new Card({
                width: CardsGenerator.CARD_WIDTH,
                height: CardsGenerator.CARD_HEIGHT,
                suit: CardsGenerator.JOKER,
                value: CardsGenerator.JOKER_VALUE
            }));
        }
        return new CardCollection(output);
    }
};

var PlayerArea = function (_PIXI$Container) {
    inherits(PlayerArea, _PIXI$Container);

    function PlayerArea(x, y) {
        classCallCheck(this, PlayerArea);

        var _this = possibleConstructorReturn(this, (PlayerArea.__proto__ || Object.getPrototypeOf(PlayerArea)).call(this));

        _this.x = x;
        _this.y = y;
        return _this;
    }

    createClass(PlayerArea, [{
        key: 'addChild',
        value: function addChild() {
            var _babelHelpers$get;

            for (var _len = arguments.length, card = Array(_len), _key = 0; _key < _len; _key++) {
                card[_key] = arguments[_key];
            }

            var out = (_babelHelpers$get = get(PlayerArea.prototype.__proto__ || Object.getPrototypeOf(PlayerArea.prototype), 'addChild', this)).call.apply(_babelHelpers$get, [this].concat(card));
            this.updateCardPositions();
            return out;
        }
    }, {
        key: 'updateCardPositions',
        value: function updateCardPositions() {
            var cardLen = this.children.length;
            if (cardLen === 0) return;
            var cardWidth = CardsGenerator.CARD_WIDTH;
            var paddingHorizontal = 10;
            for (var index = 0; index < cardLen; index++) {
                var _card = this.getChildAt(index);
                _card.x = index * cardWidth + index * paddingHorizontal;
                _card.y = 0;
            }
            this.pivot.set(this.width / 2, this.height / 2);
        }
    }, {
        key: 'getCards',
        value: function getCards() {
            return new CardCollection(this.children.slice(0));
        }
    }]);
    return PlayerArea;
}(PIXI.Container);

function _identity(d) {
  return d;
}
var Arrays = {
  uniq: function uniq(array) {
    var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _identity;

    var output = [];
    var ids = [];
    array.forEach(function (d) {
      var id = predicate(d);
      if (ids.indexOf(id) === -1) {
        output.push(d);
        ids.push(id);
      }
    });
    return output;
  }
};

var Numbers = {
    Compare: {
        asc: function asc(a, b) {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        },
        desc: function desc(a, b) {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }
    },
    clamp: function clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
};

var ComboType = {
    HigherCard: 1,
    Pair: 2,
    TwoPair: 3,
    ThreeOfAKind: 4,
    Straight: 5,
    Flush: 6,
    FullHouse: 7,
    FourOfAKind: 8,
    StraightFlush: 9,
    FiveOfAKind: 10
};

var CardComboList = function () {

    /**
     * @param {CardCollection} cardsCollection
     */
    function CardComboList(cardsCollection) {
        classCallCheck(this, CardComboList);

        this.originalCollection = cardsCollection;
        this.combos = [];
        this._parse(cardsCollection);
    }

    createClass(CardComboList, [{
        key: 'addAll',
        value: function addAll(objects) {
            var _this = this;

            objects.forEach(function (d) {
                return _this.add(d);
            });
        }
    }, {
        key: 'add',
        value: function add(object) {
            var cardCombo = void 0;
            if (!(object instanceof CardCombo)) {
                cardCombo = new CardCombo(object);
            } else cardCombo = object;
            this.combos.push(cardCombo);
            return this;
        }
    }, {
        key: 'getHigherCombo',
        value: function getHigherCombo() {
            return this.combos.sort(function (a, b) {
                if (a.type > b.type) return -1;
                if (a.type < b.type) return 1;
                return 0;
            })[0];
        }
    }, {
        key: '_parse',
        value: function _parse() {
            // 1- HigherCard
            this.add({ type: ComboType.HigherCard, card: this._getHigherCard() });
            // 2 - Pair
            // 4 - ThreeOfAKind
            // 8 - FourOfAKind
            // 10 - FiveOfAKind
            this.addAll(this._getXOfAKind());
            // 3 - TwoPair
            var twoPairsCombo = this._getTwoPairs();
            if (twoPairsCombo) this.add(twoPairsCombo);
            // 5 - Straight
            var straightCombo = this._getStraight();
            if (straightCombo) this.add(straightCombo);
            // 6 - Flush
            var flushCombo = this._getFlush();
            if (flushCombo) this.add(flushCombo);
            // 7 - FullHouse
            var fullHouseCombo = this._getFullHouse();
            if (fullHouseCombo) this.add(fullHouseCombo);
            // 9 - StraightFlush
            var straightFlushCombo = this._getStraightFlush();
            if (straightFlushCombo) this.add(straightFlushCombo);

            this.combos.sort(function (a, b) {
                return Numbers.Compare.desc(a.getScore(), b.getScore());
            });
        }
    }, {
        key: '_getHigherCard',
        value: function _getHigherCard() {
            var cards = this.originalCollection.toArray();
            return cards.sort(function (a, b) {
                if (a.value > b.value) return -1;
                if (a.value < b.value) return 1;
                return 0;
            })[0];
        }
    }, {
        key: '_getTwoPairs',
        value: function _getTwoPairs() {
            var pairs = [];
            this.combos.forEach(function (combo) {
                if (combo.type === ComboType.Pair) pairs.push(combo);
            });
            if (pairs.length === 2 && this._isAllCardDifferents(pairs[0], pairs[1])) {
                var _ref;

                return new CardCombo({
                    type: ComboType.TwoPair,
                    cards: (_ref = []).concat.apply(_ref, toConsumableArray(pairs.map(function (d) {
                        return d.cards;
                    })))
                });
            }
        }
    }, {
        key: '_getXOfAKind',
        value: function _getXOfAKind() {
            var cards = this.originalCollection.toArray();
            var combos = [];
            var comboTypeMapper = {
                2: ComboType.Pair,
                3: ComboType.ThreeOfAKind,
                4: ComboType.FourOfAKind,
                5: ComboType.FiveOfAKind
            };
            cards.forEach(function (card, cardIndex, cards) {
                var localeCards = [card];
                for (var index = 0; index < cards.length; index++) {
                    if (card !== cards[index] && (card.value === cards[index].value || cards[index].isJoker())) {
                        localeCards.push(cards[index]);
                    }
                }
                console.log(localeCards.toString());
                if (localeCards.length > 1 && localeCards.length < 6) {
                    combos.push(new CardCombo({
                        type: comboTypeMapper[localeCards.length],
                        cards: localeCards
                    }));
                }
            });
            return Arrays.uniq(combos, function (d) {
                return d.getId();
            });
        }
    }, {
        key: '_getFullHouse',
        value: function _getFullHouse() {
            var pair = this.combos.find(function (d) {
                return d.type === ComboType.Pair;
            });
            var threeOfAKind = this.combos.find(function (d) {
                return d.type === ComboType.ThreeOfAKind;
            });
            if (pair && threeOfAKind && this._isAllCardDifferents(pair, threeOfAKind)) {
                return new CardCombo({
                    type: ComboType.FullHouse,
                    cards: [].concat(pair.getCards(), threeOfAKind.getCards())
                });
            }
        }
    }, {
        key: '_getStraight',
        value: function _getStraight() {
            // TODO: Joker
            var cards = this.originalCollection.toArray();
            var values = cards.map(function (d) {
                return d.value;
            }).sort();
            for (var index = 1, i = values[0]; index < values.length; index++) {
                if (i + 1 !== values[index]) return;
                i++;
            }
            return new CardCombo({
                type: ComboType.Straight,
                cards: cards
            });
        }
    }, {
        key: '_getFlush',
        value: function _getFlush() {
            var cards = this.originalCollection.toArray();
            var black = 0,
                red = 0;
            for (var index = 0; index < cards.length; index++) {
                if (cards[index].isJoker()) {
                    black++;
                    red++;
                } else if (/Spades|Clubs/.test(cards[index].getSuit())) {
                    black++;
                } else red++;
            }
            if (black === cards.length || red === cards.length) {
                return new CardCombo({
                    type: ComboType.Flush,
                    cards: cards
                });
            }
        }
    }, {
        key: '_getStraightFlush',
        value: function _getStraightFlush() {
            var flush = this.combos.find(function (d) {
                return d.type === ComboType.Flush;
            });
            var straight = this.combos.find(function (d) {
                return d.type === ComboType.Straight;
            });
            if (flush && straight) {
                return new CardCombo({
                    type: ComboType.StraightFlush,
                    cards: flush.getCards()
                });
            }
        }

        /**
         * @param {Combo} c1
         * @param {Combo} c2
         * @returns {boolean}
         */

    }, {
        key: '_isAllCardDifferents',
        value: function _isAllCardDifferents(c1, c2) {
            var c1Cards = c1.getCards();
            var c2Cards = c2.getCards();
            for (var i1 = 0; i1 < c1Cards.length; i1++) {
                for (var i2 = 0; i2 < c2Cards.length; i2++) {
                    if (c1Cards[i1] === c2Cards[i2]) return false;
                }
            }return true;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.combos.join('\n');
        }
    }]);
    return CardComboList;
}();

var CardCombo = function () {
    function CardCombo(object) {
        classCallCheck(this, CardCombo);

        this.type = object.type;
        this.cards = new CardCollection();
        if (object.cards) this.cards.addAll(object.cards);else if (object.card) this.cards.add(object.card);
    }

    createClass(CardCombo, [{
        key: 'getCard',
        value: function getCard() {
            return this.cards.peek();
        }
    }, {
        key: 'getCards',
        value: function getCards() {
            return this.cards.cards;
        }
    }, {
        key: '_sortCards',
        value: function _sortCards() {
            this.getCards().sort(function (a, b) {
                return Numbers.Compare.asc(a.suit, b.suit);
            });
        }
    }, {
        key: 'getId',
        value: function getId() {
            this._sortCards();
            return this.getCards().map(function (d) {
                return d.value + '&' + d.suit;
            }).join('/');
        }
    }, {
        key: 'getScore',
        value: function getScore() {
            var cards = this.getCards();
            var out = 0;
            for (var index = 0; index < cards.length; index++) {
                out += cards[index].value;
            }return out + this.type * 10;
        }
    }, {
        key: 'getTypeName',
        value: function getTypeName() {
            var _this2 = this;

            var keys = Object.keys(ComboType);
            return keys.find(function (key) {
                return ComboType[key] === _this2.type;
            });
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.getTypeName() + ' { ' + this.getCards().join(', ') + ' }';
        }
    }]);
    return CardCombo;
}();

var LinearLayout = function (_PIXI$Container) {
    inherits(LinearLayout, _PIXI$Container);

    function LinearLayout() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, LinearLayout);

        var _this = possibleConstructorReturn(this, (LinearLayout.__proto__ || Object.getPrototypeOf(LinearLayout)).call(this));

        _this.setOrientation(options.orientation || LinearLayout.ORIENTATION_VERTICAL);
        return _this;
    }

    createClass(LinearLayout, [{
        key: 'setOrientation',
        value: function setOrientation(orientation) {
            this._orientation = orientation;
            if (this.orientation === LinearLayout.ORIENTATION_VERTICAL) {
                this._posPropertyName = 'y';
                this._sizePropertyName = 'height';
            } else if (this.orientation === LinearLayout.ORIENTATION_HORIZONTAL) {
                this._posPropertyName = 'x';
                this._sizePropertyName = 'width';
            }
        }
    }, {
        key: 'update',
        value: function update(game) {
            this.children.forEach(function (child) {
                child.update(game);
            });
            var pos = 0;
            for (var index = 0; index < this.children.length; index++) {
                this.children[index][this._posPropertyName] = pos;
                pos += this.children[index][this._sizePropertyName];
            }
        }
    }]);
    return LinearLayout;
}(PIXI$1.Container);

LinearLayout.ORIENTATION_VERTICAL = 1;
LinearLayout.ORIENTATION_HORIZONTAL = 2;

var Debug = {
    textConfig: {
        fontSize: 14,
        fontFamily: 'Consolas',
        fill: 0
    }
};

var GUICombosList = function (_PIXI$Text) {
    inherits(GUICombosList, _PIXI$Text);

    function GUICombosList() {
        classCallCheck(this, GUICombosList);
        return possibleConstructorReturn(this, (GUICombosList.__proto__ || Object.getPrototypeOf(GUICombosList)).call(this, '', Debug.textConfig));
    }

    createClass(GUICombosList, [{
        key: 'update',
        value: function update(game) {
            this.text = game.getCardComboList().toString();
        }
    }]);
    return GUICombosList;
}(PIXI$1.Text);

var ticker = PIXI.ticker.shared; //new PIXI.ticker.Ticker();

var Game = function () {
    function Game(options) {
        classCallCheck(this, Game);

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
        var rendererOptions = {
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

    createClass(Game, [{
        key: 'destroy',
        value: function destroy() {
            this.clearGame();
            this.fg.destroy();
            this.gui.destroy();
            this.renderer.destroy();
            this.fg = null;
            this.gui = null;
            this.renderer = null;
        }
    }, {
        key: 'clearGame',
        value: function clearGame() {
            this.stop();
            this.cards = null;
            this.player = null;
            this.fg.removeChildren();
            this.gui.removeChildren();
        }
    }, {
        key: 'newGame',
        value: function newGame() {
            this.gameState = Game.GAME_IDLE;
            this.playingGameState = Game.STATE_PLAYING_CHOOSE_BET;

            var stageWidth = this.renderer.width;
            var stageHeight = this.renderer.height;
            this.player = new PlayerArea(stageWidth / 2, stageHeight / 3 * 2);

            this.fg.addChild(this.player);
            this.gui.addChild(new GUICombosList());
        }
    }, {
        key: 'distribute',
        value: function distribute() {
            this.player.removeChildren();
            this.cards = CardsGenerator.generateCards().shuffle();
            var forcedCards = 5;

            [0, 1, 2, 2, CardsGenerator.JOKER_VALUE].forEach(function (value) {
                var card = this.cards.getByValue(value);
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


            for (var index = 0; index < 5 - forcedCards; index++) {
                var card = this.cards.peek();
                this.player.addChild(card);
                this.cards.remove(card);
            }
        }
    }, {
        key: 'setState',
        value: function setState(state) {
            this.gameState = state;
        }
    }, {
        key: 'setPlayingState',
        value: function setPlayingState(state) {
            this.playingGameState = state;
        }
    }, {
        key: 'getFPS',
        value: function getFPS() {
            return ticker.FPS;
        }
    }, {
        key: 'isRunning',
        value: function isRunning() {
            return ticker.started;
        }
    }, {
        key: 'isPlaying',
        value: function isPlaying() {
            return this.gameState === Game.GAME_PLAYING;
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            return { width: this.renderer.width, height: this.renderer.height };
        }
    }, {
        key: 'setSize',
        value: function setSize(w, h) {
            if (this.container) {
                this.container.style.width = w + 'px';
                this.container.style.height = h + 'px';
            }
            if (this.renderer.width !== w || this.renderer.height !== h) {
                this.renderer.resize(w, h);
            }
        }
    }, {
        key: 'start',
        value: function start() {
            if (!this.isRunning()) {
                if (this.gameState === Game.GAME_IDLE) {
                    this.setState(Game.STATE_PLAYING);
                }
                ticker.add(this.loop, this);
                ticker.start();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.isRunning()) {
                ticker.stop();
                ticker.remove(this.loop, this);
            }
        }
    }, {
        key: 'loop',
        value: function loop(time) {
            this._frame += 1;
            this.gui.update(this);
            this.renderer.render(this.renderingContainer);
            if (this._frame % 10 === 0) {}
        }
    }, {
        key: 'getCardComboList',
        value: function getCardComboList() {
            return new CardComboList(this.player.getCards());
        }

        /**
         * 
         * @param {Function} GuiClass - The GuiClass to instantiate
         * @param {boolean=} swt - true will create an instance if it doesnt exists, false will destroy it
         */

    }, {
        key: 'toggleGuiElementPresence',
        value: function toggleGuiElementPresence(GuiClass, swt) {
            var instance = this.gui.children.find(function (d) {
                return d instanceof GuiClass;
            });
            if (typeof swt === 'undefined') swt = !instance;
            if (!instance && swt) {
                instance = new GuiClass();
                this.gui.addChild(instance);
            } else if (instance && !swt) {
                instance.destroy();
            }
        }
    }]);
    return Game;
}();


Game.STATE_INTRO = 1;
Game.STATE_PLAYING = 2;
Game.STATE_GAMEOVER = 4;

Game.STATE_PLAYING_CHOOSE_BET = 1;
Game.STATE_PLAYING_CHOOSE_CARDS = 2;
Game.STATE_PLAYING_CHOOSE_DOUBLE_DOWN = 4;
Game.STATE_PLAYING_DISPLAY_DOUBLE_DOWN = 8;

var poker_game = {
    Card: Card, Game: Game
};

return poker_game;

})));
//# sourceMappingURL=poker_game.js.map
