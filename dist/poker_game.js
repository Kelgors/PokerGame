(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('pixi.js')) :
	typeof define === 'function' && define.amd ? define(['pixi.js'], factory) :
	(global.PokerGame = factory(global.PIXI));
}(this, (function (PIXI$1) { 'use strict';

PIXI$1 = 'default' in PIXI$1 ? PIXI$1['default'] : PIXI$1;

var keyboardState = new Map();
var lastKeyboardState = new Map();
var Keyboard = {
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  PAUSE: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,
  INSERT: 45,
  DELETE: 46,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  LEFT_WINDOW_KEY: 91,
  RIGHT_WINDOW_KEY: 92,
  SELECT_KEY: 93,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  MULTIPLY: 106,
  ADD: 107,
  SUBTRACT: 109,
  DECIMAL_POINT: 110,
  DIVIDE: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  SEMI_COLON: 186,
  EQUAL_SIGN: 187,
  COMMA: 188,
  DASH: 189,
  PERIOD: 190,
  FORWARD_SLASH: 191,
  GRAVE_ACCENT: 192,
  OPEN_BRACKET: 219,
  BACK_SLASH: 220,
  CLOSE_BRAKET: 221,
  SINGLE_QUOTE: 222,
  isKeyDown: function isKeyDown(keyCode) {
    return !!keyboardState.get(keyCode);
  },
  isKeyUp: function isKeyUp(keyCode) {
    return !keyboardState.get(keyCode);
  },
  isKeyReleased: function isKeyReleased(keyCode) {
    return Keyboard.isKeyUp(keyCode) && lastKeyboardState.get(keyCode);
  },
  isKeyPushed: function isKeyPushed(keyCode) {
    return Keyboard.isKeyDown(keyCode) && !lastKeyboardState.get(keyCode);
  },
  update: function update() {
    lastKeyboardState = keyboardState;
    keyboardState = new Map(lastKeyboardState);
  }
};
// Keep state of all action
window.addEventListener('keyup', function (event) {
  keyboardState.set(event.keyCode, false);
});
window.addEventListener('keydown', function (event) {
  keyboardState.set(event.keyCode, true);
});

var isMe = !!localStorage.getItem('isMe');
var stopTracking = !!localStorage.getItem('StopTracking') || /localhost\:8080/.test(location.toString()) || typeof mixpanel === 'undefined';

if (stopTracking) console.log('stop-tracking');

if (isMe) {
    mixpanel.identify('1');
}

var Tracker = {
    /**
     * @param {String} eventName
     * @param {Object} properties
     * @param {Function} callback
     */
    track: function track(eventName, properties, callback) {
        if (stopTracking) return;
        mixpanel.track(eventName, properties, callback);
    }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
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

var CardsGenerator = function () {
    /**
     * @param {Object<string, PIXI.Texture>}
     */
    function CardsGenerator(cardsTexture) {
        classCallCheck(this, CardsGenerator);

        /** @type {Object<string, PIXI.Texture>} */
        this.cardsTexture = cardsTexture;
        if (!cardsTexture) throw new Error('CardsGenerator needs CardTexture');
    }

    createClass(CardsGenerator, [{
        key: 'toAssetName',
        value: function toAssetName(value, suit) {
            if (suit === CardsGenerator.RED_JOKER) return 'red_joker';
            if (suit === CardsGenerator.BLACK_JOKER) return 'black_joker';
            return 'card:' + CardsGenerator.VALUE_LABELS[value].toLowerCase() + '_of_' + CardsGenerator.SUITS[suit].toLowerCase();
        }
    }, {
        key: 'generateCards',
        value: function generateCards() {
            var output = [];
            for (var suitIndex = 0; suitIndex < CardsGenerator.SUITS.length; suitIndex++) {
                for (var valueIndex = 0; valueIndex < CardsGenerator.VALUE_LABELS.length; valueIndex++) {
                    var assetName = this.toAssetName(valueIndex, suitIndex);
                    var texture = this.cardsTexture[assetName];
                    if (!texture) throw new Error('Asset ' + assetName + ' is missing');
                    output.push(new Card({
                        width: CardsGenerator.CARD_WIDTH,
                        height: CardsGenerator.CARD_HEIGHT,
                        suit: suitIndex,
                        value: valueIndex,
                        texture: texture
                    }));
                }
            }
            output.push(new Card({
                width: CardsGenerator.CARD_WIDTH,
                height: CardsGenerator.CARD_HEIGHT,
                suit: CardsGenerator.RED_JOKER,
                value: CardsGenerator.JOKER_VALUE,
                texture: this.cardsTexture['card:red_joker']
            }));
            output.push(new Card({
                width: CardsGenerator.CARD_WIDTH,
                height: CardsGenerator.CARD_HEIGHT,
                suit: CardsGenerator.BLACK_JOKER,
                value: CardsGenerator.JOKER_VALUE,
                texture: this.cardsTexture['card:black_joker']
            }));
            return new CardCollection(output);
        }
    }]);
    return CardsGenerator;
}();

CardsGenerator.CARD_WIDTH = 370 / 4;
CardsGenerator.CARD_HEIGHT = 522 / 4;
CardsGenerator.RED_JOKER = 'RedJoker';
CardsGenerator.BLACK_JOKER = 'BlackJoker';
CardsGenerator.JOKER_VALUE = 13;
CardsGenerator.SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
CardsGenerator.VALUE_LABELS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A(aA1, aA2) {
    return 1.0 - 3.0 * aA2 + 3.0 * aA1;
}

function B(aA1, aA2) {
    return 3.0 * aA2 - 6.0 * aA1;
}

function C(aA1) {
    return 3.0 * aA1;
}

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier(aT, aA1, aA2) {
    return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
}

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope(aT, aA1, aA2) {
    return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
}

function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX,
        currentT,
        i = 0;
    do {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
            aB = currentT;
        } else {
            aA = currentT;
        }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
}

function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
        var currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) {
            return aGuessT;
        }
        var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
}

function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
        throw new Error('bezier x values must be in [0, 1] range');
    }

    // Precompute samples table
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
        for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
    }

    function getTForX(aX) {
        var intervalStart = 0.0;
        var currentSample = 1;
        var lastSample = kSplineTableSize - 1;

        for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
        }--currentSample;

        // Interpolate to provide an initial guess for t
        var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
        var guessForT = intervalStart + dist * kSampleStepSize;

        var initialSlope = getSlope(guessForT, mX1, mX2);
        if (initialSlope >= NEWTON_MIN_SLOPE) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
        } else if (initialSlope === 0.0) {
            return guessForT;
        } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
        }
    }

    return function BezierEasing(x) {
        if (mX1 === mY1 && mX2 === mY2) {
            return x; // linear
        }
        // Because JavaScript number are imprecise, we should guarantee the extremes are right.
        if (x === 0) {
            return 0;
        }
        if (x === 1) {
            return 1;
        }
        return calcBezier(getTForX(x), mY1, mY2);
    };
}

var Card = function (_PIXI$Container) {
  inherits(Card, _PIXI$Container);

  function Card(options) {
    classCallCheck(this, Card);

    var _this = possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this));

    _this.value = options.value;
    _this.suit = options.suit;

    _this.isHighlighted = false;
    _this.highlightGraphics = new PIXI$1.Graphics();
    _this.highlightGraphics.visible = false;

    var cardPicture = new PIXI$1.Sprite(options.texture);
    cardPicture.width = options.width;
    cardPicture.height = options.height;
    _this.addChild(_this.highlightGraphics);
    _this.addChild(cardPicture);
    return _this;
  }

  createClass(Card, [{
    key: 'highlight',
    value: function highlight() {
      var shadowSteps = 10;
      this.isHighlighted = true;
      this.highlightGraphics.visible = true;
      this.highlightGraphics.clear();
      for (var i = 0; i < shadowSteps; i++) {
        var alpha = 0.8 - i / shadowSteps;
        if (alpha < 0) break;
        this.highlightGraphics.lineStyle(1, 0xffff00, alpha).drawRoundedRect(-i, -i, this.width + 1, this.height + 1, this.width / 10);
      }
    }
  }, {
    key: 'isJoker',
    value: function isJoker() {
      return this.value === CardsGenerator.JOKER_VALUE;
    }
  }, {
    key: 'getSuit',
    value: function getSuit() {
      if (this.isJoker()) return 'Joker';
      return CardsGenerator.SUITS[this.suit];
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.isJoker()) return 'Joker';
      return CardsGenerator.VALUE_LABELS[this.value];
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.getValue() + ' of ' + this.getSuit();
    }
  }]);
  return Card;
}(PIXI$1.Container);

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

    createClass(CardCollection, [{
        key: 'destroy',
        value: function destroy() {
            this.cards.forEach(function (d) {
                return d.destroy();
            });
        }

        /**
         * @param {Card[]} cards
         */

    }, {
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
    /**
     * @param {number} value the value to clamp
     * @param {number} min
     * @param {number} max
     */
    clamp: function clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
};

/** @type {Object.<string, number>} */
var ComboType = {
    Pair: 1,
    TwoPair: 2,
    ThreeOfAKind: 3,
    Straight: 5,
    Flush: 7,
    FullHouse: 8,
    FourOfAKind: 10,
    StraightFlush: 20,
    RoyalFlush: 50,
    FiveOfAKind: 100
};
/**
 * @property {Function}
 * @name ComboType.forName
 * @param {Number} type
 * @returns {String}
*/
Object.defineProperty(ComboType, 'forName', {
    enumerable: false,
    value: function forName(type) {
        return Object.keys(ComboType).find(function (key) {
            return ComboType[key] === type;
        });
    }
});

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

            // todo: royalFlush

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
                        return d.cards.toArray();
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
            var cards = this.originalCollection.toArray();
            var values = cards.map(function (d) {
                return d.value;
            }).sort(Numbers.Compare.asc);
            var jokers = cards.filter(function (d) {
                return d.isJoker();
            }).length;
            for (var index = 1, value = values[0]; index < values.length; index++) {
                var match = value + 1 === values[index];
                if (!match && jokers === 0) return;
                if (!match) jokers--;
                value++;
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
            var firstSuit = cards[0].suit;
            for (var index = 1; index < cards.length; index++) {
                if (cards[index].suit !== firstSuit && !cards[index].isJoker()) return null;
            }
            return new CardCombo({
                type: ComboType.Flush,
                cards: cards
            });
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
// TODO: TEST K 4 4 K J
// TODO: TEST Q 5 5 Q J
var CardCombo = function () {
    function CardCombo(object) {
        classCallCheck(this, CardCombo);

        /** @type {number} */
        this.type = object.type;
        /** @type {CardCollection} */
        this.cards = new CardCollection();
        if (object.cards) this.cards.addAll(object.cards);else if (object.card) this.cards.add(object.card);
        this.getCards().sort(function (a, b) {
            return Numbers.Compare.asc(a.value, b.value);
        });
    }

    /**
     * @returns {Card}
     */


    createClass(CardCombo, [{
        key: 'getCard',
        value: function getCard() {
            return this.cards.peek();
        }
        /**
         * @returns {CardCollection}
         */

    }, {
        key: 'getCards',
        value: function getCards() {
            return this.cards.cards;
        }

        /**
         * @private
         * @returns {CardCollection}
         */

    }, {
        key: '_sortCards',
        value: function _sortCards() {
            this.getCards().sort(function (a, b) {
                return Numbers.Compare.asc(a.suit, b.suit);
            });
        }

        /**
         * @returns {String}
         */

    }, {
        key: 'getId',
        value: function getId() {
            this._sortCards();
            return this.getCards().map(function (d) {
                return d.value + '&' + d.suit;
            }).join('/');
        }

        /**
         * @returns {number}
         */

    }, {
        key: 'getScore',
        value: function getScore() {
            return this.type;
        }

        /**
         * @returns {String}
         */

    }, {
        key: 'getTypeName',
        value: function getTypeName() {
            return ComboType.forName(this.type);
        }

        /**
         * @returns {String}
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.getTypeName() + ' { ' + this.getCards().join(', ') + ' }';
        }
    }]);
    return CardCombo;
}();

var languages = [];
var currentLang = null;

var i18n = {
    setup: function setup(langs) {
        languages = langs;
        currentLang = languages[0];
    },
    setLang: function setLang(lang) {
        currentLang = languages.find(function (d) {
            return d.Lang === lang;
        });
    },
    t: function t(chainedName) {
        var names = chainedName.split('.');
        var currentObject = currentLang;
        for (var index = 0; index < names.length; index++) {
            var keyName = names[index];
            if (keyName in currentObject) {
                if (_typeof(currentObject[keyName]) !== 'object') {
                    return currentObject[keyName];
                } else {
                    currentObject = currentObject[keyName];
                }
            }
        }
        return '';
    }
};

var UpdatableContainer = function (_PIXI$Container) {
    inherits(UpdatableContainer, _PIXI$Container);

    function UpdatableContainer() {
        classCallCheck(this, UpdatableContainer);
        return possibleConstructorReturn(this, (UpdatableContainer.__proto__ || Object.getPrototypeOf(UpdatableContainer)).apply(this, arguments));
    }

    createClass(UpdatableContainer, [{
        key: 'update',
        value: function update(game) {
            this.updateChildren(game);
        }
    }, {
        key: 'destroyChildren',
        value: function destroyChildren() {
            this.children.forEach(function (d) {
                return d.destroy();
            });
            this.removeChildren();
        }

        /**
         * Invoke update method of all children
         * @param {Game} game
         */

    }, {
        key: 'updateChildren',
        value: function updateChildren(game) {
            this.children.forEach(function (child) {
                child.update(game);
            });
        }

        /**
         * @param {Function} Type
         * @returns {PIXI.DisplayObject}
         */

    }, {
        key: 'findChildrenByType',
        value: function findChildrenByType(Type) {
            return this.children.find(function (d) {
                return d instanceof Type;
            });
        }

        /**
         * @param {Function} Type
         * @returns {PIXI.DisplayObject[]}
         */

    }, {
        key: 'findAllChildByType',
        value: function findAllChildByType(Type) {
            return this.children.filter(function (d) {
                return d instanceof Type;
            });
        }
    }]);
    return UpdatableContainer;
}(PIXI$1.Container);

var LinearLayout = function (_UpdatableContainer) {
    inherits(LinearLayout, _UpdatableContainer);

    /**
     * @param {Object} [options]
     * @property {number} x
     * @property {number} y
     * @property {number} childMargin
     */
    function LinearLayout() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, LinearLayout);

        var _this = possibleConstructorReturn(this, (LinearLayout.__proto__ || Object.getPrototypeOf(LinearLayout)).call(this));

        _this.childMargin = 0;
        if ('x' in options) _this.x = options.x;
        if ('y' in options) _this.y = options.y;
        if ('childMargin' in options) _this.childMargin = options.childMargin;
        _this.setOrientation(options.orientation || LinearLayout.ORIENTATION_VERTICAL);
        return _this;
    }

    createClass(LinearLayout, [{
        key: 'setOrientation',
        value: function setOrientation(orientation) {
            this._orientation = orientation;
            if (orientation === LinearLayout.ORIENTATION_VERTICAL) {
                this._posPropertyName = 'y';
                this._sizePropertyName = 'height';
            } else if (orientation === LinearLayout.ORIENTATION_HORIZONTAL) {
                this._posPropertyName = 'x';
                this._sizePropertyName = 'width';
            }
        }

        /**
         * @param {number} childIndex
         * @returns {PIXI.Point}
         */

    }, {
        key: 'getChildPositionAt',
        value: function getChildPositionAt(childIndex) {
            return this.getChildPosition(this.getChildAt(childIndex));
        }

        /**
         * @param {PIXI.DisplayObject} child
         * @returns {PIXI.Point}
         */

    }, {
        key: 'getChildPosition',
        value: function getChildPosition(child) {
            return new PIXI$1.Point(this.x - this.pivot.x + child.x - child.pivot.x, this.y - this.pivot.y + child.y - child.pivot.y);
        }
    }, {
        key: 'update',
        value: function update(game) {
            get(LinearLayout.prototype.__proto__ || Object.getPrototypeOf(LinearLayout.prototype), 'update', this).call(this, game);
            this.updateChildrenPosition();
        }
    }, {
        key: 'updateChildrenPosition',
        value: function updateChildrenPosition() {
            var pos = 0;
            for (var index = 0; index < this.children.length; index++) {
                this.children[index][this._posPropertyName] = pos;
                pos += this.children[index][this._sizePropertyName] + this.childMargin;
            }
        }
    }]);
    return LinearLayout;
}(UpdatableContainer);

LinearLayout.ORIENTATION_VERTICAL = 1;
LinearLayout.ORIENTATION_HORIZONTAL = 2;

var Score = {
    LOST: 0,
    DRAW: 1,
    WON: 2
};

var Resolver = {

    /**
     * @param {Card} card1
     * @param {Card} card2
     */
    compareCards: function compareCards(card1, card2) {
        if (card1 && !card2) return Score.WON;
        if (!card1 && card2) return Score.LOST;
        if (card1.value > card2.value) return Score.WON;
        if (card1.value < card2.value) return Score.LOST;
        return Score.DRAW;
    },


    /**
     * @param {CardCombo} combo1
     * @param {CardCombo} combo2
     */
    compareCombos: function compareCombos(combo1, combo2) {
        if (combo1 && !combo2) return Score.WON;
        if (!combo1 && combo2) return Score.LOST;
        if (combo1.getScore() > combo2.getScore()) return Score.WON;
        if (combo1.getScore() < combo2.getScore()) return Score.LOST;
        return Score.DRAW;
    }
};

var GUICardSelector = function (_PIXI$Graphics) {
    inherits(GUICardSelector, _PIXI$Graphics);

    function GUICardSelector(x, y) {
        classCallCheck(this, GUICardSelector);

        var _this = possibleConstructorReturn(this, (GUICardSelector.__proto__ || Object.getPrototypeOf(GUICardSelector)).call(this));

        var WIDTH = 20;
        var HEIGHT = WIDTH;
        _this.clear().lineStyle(3, 0, 1).moveTo(WIDTH / 2, 0).beginFill(0xffffff, 1).lineTo(WIDTH, HEIGHT).lineTo(0, HEIGHT).lineTo(WIDTH / 2, 0).endFill();
        _this.pivot.set(WIDTH / 2, 0);
        _this.originalY = y;
        if (x) _this.x = x;
        if (y) _this.y = y;
        return _this;
    }

    createClass(GUICardSelector, [{
        key: 'setCursorCardIndex',
        value: function setCursorCardIndex(game, index) {
            var river = game.river;
            if (index < 0) index = 4;
            if (index > river.cardSlots - 1) index = 0;
            this.index = index;
            var p = game.river.getCardPositionAt(index);
            this.x = p.x + CardsGenerator.CARD_WIDTH / 2;
            this.y = p.y + CardsGenerator.CARD_HEIGHT + 20;
        }

        /**
         * @param {Game} game
         */

    }, {
        key: 'update',
        value: function update(game) {
            this.y += Math.cos(game._frame / 10);

            if (Keyboard.isKeyPushed(Keyboard.LEFT_ARROW)) {
                this.setCursorCardIndex(game, this.index - 1);
            } else if (Keyboard.isKeyPushed(Keyboard.RIGHT_ARROW)) {
                this.setCursorCardIndex(game, this.index + 1);
            } else if (Keyboard.isKeyPushed(Keyboard.UP_ARROW)) {
                if (Keyboard.isKeyDown(Keyboard.SHIFT)) {
                    for (var i = 0; i < 5; i++) {
                        game.river.setSelectedCardIndex(i, true);
                    }
                } else {
                    game.river.setSelectedCardIndex(this.index, true);
                }
            } else if (Keyboard.isKeyPushed(Keyboard.DOWN_ARROW)) {
                if (Keyboard.isKeyDown(Keyboard.SHIFT)) {
                    for (var _i = 0; _i < 5; _i++) {
                        game.river.setSelectedCardIndex(_i, false);
                    }
                } else {
                    game.river.setSelectedCardIndex(this.index, false);
                }
            } else if (Keyboard.isKeyPushed(Keyboard.ENTER)) {
                this.destroy();
            }
        }
    }]);
    return GUICardSelector;
}(PIXI$1.Graphics);

var Timer = function () {
    function Timer(targetedTime) {
        var ticker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIXI$1.ticker.shared;
        classCallCheck(this, Timer);

        this.target = targetedTime;
        this.time = 0;
        this.ticker = ticker;
        this.isStarted = false;
    }

    createClass(Timer, [{
        key: 'destroy',
        value: function destroy() {
            this.stop();
            this.ticker = null;
        }
    }, {
        key: 'set',
        value: function set(targetedTime) {
            this.target = targetedTime || 0;
            this.time = 0;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.time = 0;
        }
    }, {
        key: 'start',
        value: function start() {
            if (!this.isStarted) {
                this.ticker.add(this.tick, this);
                this.isStarted = true;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.isStarted) {
                this.ticker.remove(this.tick, this);
                this.isStarted = false;
            }
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.time += this.ticker.elapsedMS;
        }
    }, {
        key: 'delta',
        value: function delta() {
            return this.target - this.time;
        }
    }]);
    return Timer;
}();

var TransformAnimation = function () {
    /**
     * @param {Object} options
     * @param {PIXI.Point} options.posFrom
     * @param {PIXI.Point} options.posTo
     * @param {PIXI.Point} options.pivot
     * @param {number} options.scaleFrom
     * @param {number} options.scaleTo
     * @param {number} options.rotationFrom
     * @param {number} options.rotationTo
     * @param {number} options.timeFrom
     * @param {number} options.duration
     * @param {Function} options.callback
    */
    function TransformAnimation(options) {
        classCallCheck(this, TransformAnimation);

        this.posFrom = options.posFrom || null;
        this.posTo = options.posTo || null;
        this.scaleFrom = !isNaN(options.scaleFrom) ? +options.scaleFrom : 1;
        this.scaleTo = !isNaN(options.scaleTo) ? +options.scaleTo : 1;
        this.rotationFrom = !isNaN(options.rotationFrom) ? +options.rotationFrom : 0;
        this.rotationTo = !isNaN(options.rotationTo) ? +options.rotationTo : 0;
        this.alphaFrom = !isNaN(options.alphaFrom) ? +options.alphaFrom : 1;
        this.alphaTo = !isNaN(options.alphaTo) ? +options.alphaTo : 1;
        this.pivot = options.pivot || new PIXI.Point(0, 0);

        this.timer = new Timer(options.duration);
        this.duration = options.duration;
        this.callback = options.callback || function () {};
        this.interpolator = options.interpolator || bezier(0, 0, 1, 1);
    }

    /**
     * Destroy all references presents in the animation
     */


    createClass(TransformAnimation, [{
        key: 'destroy',
        value: function destroy() {
            this.timer.stop();
            this.timer = null;
            this.posFrom = this.posTo = this.pivot = null;
            this.callback = null;
            this.interpolator = null;
        }

        /**
         * Update object position relative to 
         */

    }, {
        key: 'update',
        value: function update(sprite) {
            if (!this.timer.isStarted) this.timer.start();
            var rawRatio = Math.min(this.duration, this.timer.time) / this.duration;

            var ratio = Math.max(0, Math.min(1, this.interpolator(rawRatio)));
            sprite.setTransform(this.posFrom && this.posTo ? this.posFrom.x + (this.posTo.x - this.posFrom.x) * ratio : sprite.x, this.posFrom && this.posTo ? this.posFrom.y + (this.posTo.y - this.posFrom.y) * ratio : sprite.y, this.scaleFrom + (this.scaleTo - this.scaleFrom) * ratio, this.scaleFrom + (this.scaleTo - this.scaleFrom) * ratio, this.rotationFrom + (this.rotationTo - this.rotationFrom) * ratio, 0, 0, this.pivot.x, this.pivot.y);
            sprite.alpha = this.alphaFrom + (this.alphaTo - this.alphaFrom) * ratio;

            if (rawRatio == 1) {
                this.callback(sprite);
            }
        }
    }]);
    return TransformAnimation;
}();

var GUIText = function (_PIXI$Text) {
    inherits(GUIText, _PIXI$Text);

    function GUIText(text, textStyle) {
        classCallCheck(this, GUIText);

        var _this = possibleConstructorReturn(this, (GUIText.__proto__ || Object.getPrototypeOf(GUIText)).call(this, text, textStyle));

        _this.tags = ['gui'];
        _this.animation = null;
        return _this;
    }

    createClass(GUIText, [{
        key: 'destroy',
        value: function destroy() {
            this.setAnimation(null);
            get(GUIText.prototype.__proto__ || Object.getPrototypeOf(GUIText.prototype), 'destroy', this).call(this);
        }

        /**
         * @param {TransformAnimation} animation
         */

    }, {
        key: 'setAnimation',
        value: function setAnimation(animation) {
            if (this.animation) this.animation.destroy();
            this.animation = animation;
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.animation) this.animation.update(this);
        }
    }]);
    return GUIText;
}(PIXI$1.Text);

var BigText = {
    textConfig: {
        fontSize: 72,
        fontFamily: 'Verdana',
        fill: 0xffff00,
        stroke: 0xef0000,
        strokeThickness: 8,
        fontVariant: 'small-caps',
        fontWeight: 900
    }
};

var GuiText = {
    textConfig: {
        fontSize: 16,
        fontFamily: 'Verdana',
        fill: 0xffffff,
        stroke: 0,
        strokeThickness: 3,
        fontWeight: 300
    }
};

var GuiToken = {
    textConfig: {
        fontSize: 20,
        fontFamily: 'Verdana',
        fill: 0xffffff,
        letterSpacing: 4
    }
};

var AbsScoreLayout = function (_UpdatableContainer) {
    inherits(AbsScoreLayout, _UpdatableContainer);

    /**
     * @param {Object} options
     * @param {number} options.score - The score
     */
    function AbsScoreLayout(options) {
        classCallCheck(this, AbsScoreLayout);

        /** @type {number} */
        var _this = possibleConstructorReturn(this, (AbsScoreLayout.__proto__ || Object.getPrototypeOf(AbsScoreLayout)).call(this));

        _this.score = options.score;
        _this.transitionDuration = options.transitionDuration || 150;
        _this.transitionDelay = options.transitionDelay || 1000;

        /** @type {number} */
        _this._lastScoreState = 0;
        /** @type {number} */
        _this.scoreState = AbsScoreLayout.STATE_TRANSITION_IDLE;
        /** @type {boolean} */
        _this.isDestroyed = false;
        /** @type {number} */
        _this.rendererWidth = options.game.renderer.width;
        /** @type {number} */
        _this.rendererHeight = options.game.renderer.height;
        return _this;
    }

    createClass(AbsScoreLayout, [{
        key: 'changeState',
        value: function changeState(state) {
            this._lastScoreState = this.scoreState;
            this.scoreState = state;
        }

        /**
         * Update children initial positions
         * @protected
         */

    }, {
        key: 'mUpdateChildrenPosition',
        value: function mUpdateChildrenPosition() {
            for (var index = 0; index < this.children.length; index++) {
                var child = this.children[index];
                child.x = this.rendererWidth * 3 / 4 + child.width / 2 + 1;
                child.y = this.rendererHeight / 3;
                child.alpha = 0;
            }
        }
    }, {
        key: 'hasWon',
        value: function hasWon() {
            return this.score === Score.WON;
        }
    }, {
        key: 'hasLost',
        value: function hasLost() {
            return this.score === Score.LOST;
        }
    }, {
        key: 'isDraw',
        value: function isDraw() {
            return this.score === Score.DRAW;
        }
    }, {
        key: 'spawnComparison',
        value: function spawnComparison() {
            var comparisonLabel = i18n.t('Defeat');
            if (this.hasWon()) {
                comparisonLabel = i18n.t('Victory');
            } else if (this.isDraw()) {
                comparisonLabel = i18n.t('Draw');
            }
            this.addChild(new GUIText(comparisonLabel, BigText.textConfig));
        }
    }, {
        key: 'getInAnimation',
        value: function getInAnimation(sprite, _callback) {
            return new TransformAnimation({
                posFrom: new PIXI.Point(sprite.x, sprite.y),
                posTo: new PIXI.Point(this.rendererWidth / 2 - sprite.width / 2, sprite.y),
                alphaFrom: 0,
                alphaTo: 1,
                duration: this.transitionDuration,
                callback: function callback() {
                    sprite.setAnimation(null);
                    if (_callback) _callback();
                }
            });
        }
    }, {
        key: 'getOutAnimation',
        value: function getOutAnimation(sprite, _callback2) {
            return new TransformAnimation({
                posFrom: new PIXI.Point(sprite.x, sprite.y),
                posTo: new PIXI.Point(this.rendererWidth * 1 / 6 - sprite.width / 2, sprite.y),
                alphaFrom: 1,
                alphaTo: 0,
                duration: this.transitionDuration,
                callback: function callback() {
                    sprite.setAnimation(null);
                    if (_callback2) _callback2();
                }
            });
        }
    }]);
    return AbsScoreLayout;
}(UpdatableContainer);



AbsScoreLayout.STATE_TRANSITION_IDLE = 0;
AbsScoreLayout.STATE_TRANSITION_SUIT = 1;
AbsScoreLayout.STATE_TRANSITION_COMPARISON = 2;
AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING = 4;
AbsScoreLayout.STATE_TRANSITION_TERMINATED = 8;

var GUIScoreLayout = function (_AbsScoreLayout) {
    inherits(GUIScoreLayout, _AbsScoreLayout);

    /**
     * @param {Object} options
     * @param {Game} options.game
     * @param {CardCombo} options.playerCombo
     * @param {CardCombo} options.iaCombo
     */
    function GUIScoreLayout(options) {
        classCallCheck(this, GUIScoreLayout);

        /** @type {CardCombo} */
        var _this = possibleConstructorReturn(this, (GUIScoreLayout.__proto__ || Object.getPrototypeOf(GUIScoreLayout)).call(this, {
            score: Resolver.compareCombos(options.playerCombo, options.iaCombo),
            game: options.game
        }));

        _this.playerCombo = options.playerCombo;
        /** @type {CardCombo} */
        _this.iaCombo = options.iaCombo;

        _this.spawnSuitName();
        _this.spawnComparison();
        _this.mUpdateChildrenPosition();
        return _this;
    }

    createClass(GUIScoreLayout, [{
        key: 'destroy',
        value: function destroy() {
            get(GUIScoreLayout.prototype.__proto__ || Object.getPrototypeOf(GUIScoreLayout.prototype), 'destroy', this).call(this);
            this.isDestroyed = true;
        }
    }, {
        key: 'spawnSuitName',
        value: function spawnSuitName() {
            var comboName = 'NoCombo';
            if (this.playerCombo) comboName = this.playerCombo.getTypeName();
            this.addChild(new GUIText(i18n.t('ComboType.' + comboName), BigText.textConfig));
        }
    }, {
        key: 'getSuitText',
        value: function getSuitText() {
            return this.getChildAt(0);
        }
    }, {
        key: 'getComparisonText',
        value: function getComparisonText() {
            return this.getChildAt(1);
        }
    }, {
        key: 'update',
        value: function update(game) {
            var _this2 = this;

            get(GUIScoreLayout.prototype.__proto__ || Object.getPrototypeOf(GUIScoreLayout.prototype), 'update', this).call(this, game);
            switch (this.scoreState) {
                case AbsScoreLayout.STATE_TRANSITION_IDLE:
                    this.getSuitText().setAnimation(this.getInAnimation(this.getSuitText(), function () {
                        setTimeout(function () {
                            if (!_this2.isDestroyed) _this2.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON);
                        }, _this2.transitionDelay);
                    }));
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                    break;
                case AbsScoreLayout.STATE_TRANSITION_COMPARISON:
                    this.getComparisonText().setAnimation(this.getInAnimation(this.getComparisonText(), function () {
                        setTimeout(function () {
                            if (!_this2.isDestroyed) _this2.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING);
                        }, _this2.transitionDelay);
                    }));
                    this.getSuitText().setAnimation(this.getOutAnimation(this.getSuitText()));
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                    break;
                case AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING:
                    this.getComparisonText().setAnimation(this.getOutAnimation(this.getComparisonText(), function () {
                        _this2.changeState(AbsScoreLayout.STATE_TRANSITION_TERMINATED);
                    }));
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                    break;
            }
        }
    }]);
    return GUIScoreLayout;
}(AbsScoreLayout);

var GUIBetScore = function (_AbsScoreLayout) {
    inherits(GUIBetScore, _AbsScoreLayout);

    /**
     * @param {Object} options
     * @param {Game} options.game
     * @param {CardCombo} options.playerCombo
     * @param {CardCombo} options.iaCombo
     */
    function GUIBetScore(options) {
        classCallCheck(this, GUIBetScore);

        var _this = possibleConstructorReturn(this, (GUIBetScore.__proto__ || Object.getPrototypeOf(GUIBetScore)).call(this, options));

        _this.spawnComparison();
        _this.mUpdateChildrenPosition();
        return _this;
    }

    createClass(GUIBetScore, [{
        key: 'destroy',
        value: function destroy() {
            get(GUIBetScore.prototype.__proto__ || Object.getPrototypeOf(GUIBetScore.prototype), 'destroy', this).call(this);
            this.isDestroyed = true;
        }
    }, {
        key: 'getComparisonText',
        value: function getComparisonText() {
            return this.getChildAt(0);
        }
    }, {
        key: 'update',
        value: function update(game) {
            var _this2 = this;

            get(GUIBetScore.prototype.__proto__ || Object.getPrototypeOf(GUIBetScore.prototype), 'update', this).call(this, game);
            switch (this.scoreState) {
                case AbsScoreLayout.STATE_TRANSITION_IDLE:
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON);
                    break;
                case AbsScoreLayout.STATE_TRANSITION_COMPARISON:
                    this.getComparisonText().setAnimation(this.getInAnimation(this.getComparisonText(), function () {
                        setTimeout(function () {
                            if (!_this2.isDestroyed) _this2.changeState(AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING);
                        }, _this2.transitionDelay);
                    }));
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                    break;
                case AbsScoreLayout.STATE_TRANSITION_COMPARISON_ENDING:
                    this.changeState(AbsScoreLayout.STATE_TRANSITION_SUIT);
                    this.getComparisonText().setAnimation(this.getOutAnimation(this.getComparisonText(), function () {
                        _this2.changeState(AbsScoreLayout.STATE_TRANSITION_TERMINATED);
                    }));
                    break;
            }
        }
    }]);
    return GUIBetScore;
}(AbsScoreLayout);

var ContextualBox = function (_PIXI$Graphics) {
    inherits(ContextualBox, _PIXI$Graphics);

    function ContextualBox() {
        classCallCheck(this, ContextualBox);

        var _this = possibleConstructorReturn(this, (ContextualBox.__proto__ || Object.getPrototypeOf(ContextualBox)).call(this));

        _this._isValid = false;
        return _this;
    }

    createClass(ContextualBox, [{
        key: 'clear',
        value: function clear() {
            this.removeChildren();
        }
    }, {
        key: 'update',
        value: function update(game) {
            if (!this._isValid) {
                this.drawBox(game);
                this._isValid = true;
            }
        }
    }, {
        key: 'drawBox',
        value: function drawBox(game) {}
    }, {
        key: 'invalidate',
        value: function invalidate() {
            this._isValid = false;
        }
    }, {
        key: '_drawBox',
        value: function _drawBox(graphics, rect) {
            graphics.moveTo(rect.left, rect.top).lineStyle(1, 0, 1).beginFill(0x675C53, 1).lineTo(rect.right, rect.top).lineTo(rect.right, rect.bottom).lineTo(rect.left, rect.bottom).lineTo(rect.left, rect.top).endFill();
        }
    }]);
    return ContextualBox;
}(PIXI$1.Graphics);

var Rect = function () {
    function Rect(top, right, bottom, left) {
        classCallCheck(this, Rect);

        this.set(top || 0, right || 0, bottom || 0, left || 0);
    }

    createClass(Rect, [{
        key: "set",
        value: function set(top, right, bottom, left) {
            this.top = top;
            this.right = right;
            this.bottom = bottom;
            this.left = left;
        }
    }, {
        key: "scale",
        value: function scale(x, y) {
            return new Rect(this.top * y, this.right * x, this.bottom * y, this.left * x);
        }
    }]);
    return Rect;
}();

var ContextualDisplayer = function (_ContextualBox) {
    inherits(ContextualDisplayer, _ContextualBox);

    function ContextualDisplayer() {
        classCallCheck(this, ContextualDisplayer);
        return possibleConstructorReturn(this, (ContextualDisplayer.__proto__ || Object.getPrototypeOf(ContextualDisplayer)).call(this));
    }

    createClass(ContextualDisplayer, [{
        key: 'drawBox',
        value: function drawBox(game) {
            /** @type {PIXI.Graphics} */
            var graphics = this;
            var rect = new Rect(0, this.parent.getWidth() * 4 / 5 - 10, this.parent.getHeight(), 0);
            this._drawBox(graphics, rect);
        }
    }, {
        key: 'displayControls',
        value: function displayControls() {
            this.removeChildren();
            var col1 = new LinearLayout({ childMargin: 15 });
            var col2 = new LinearLayout({ childMargin: 15 });
            var rows = new LinearLayout({
                orientation: LinearLayout.ORIENTATION_HORIZONTAL,
                childMargin: 12,
                x: 30
            });

            var textStyle = {
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

            var label = new PIXI.Text(i18n.t('Controls.ControlsLabel'), textStyle);
            label.x = 30;
            label.y = 10;
            this.addChild(label);
            rows.y = label.y + label.height + 15;
            this.addChild(rows);
        }

        /**
         * @param {CardCombo}
         */

    }, {
        key: 'displayCombo',
        value: function displayCombo(combo) {
            this.removeChildren();
            var row = new LinearLayout();
            row.x = 30;

            var textStyle = {
                fill: 0xffa172,
                stroke: 0,
                strokeThickness: 3,
                fontSize: 18
            };

            var comboName = 'NoCombo';
            if (combo) comboName = combo.getTypeName();
            row.addChild(new PIXI.Text('"' + i18n.t('ComboType.' + comboName) + '"', textStyle));

            row.updateChildrenPosition();
            row.y = row.height / 2;
            this.addChild(row);
        }
    }, {
        key: 'displayChooseBet',
        value: function displayChooseBet() {
            this.removeChildren();
            var texts = new LinearLayout({
                orientation: LinearLayout.ORIENTATION_HORIZONTAL
            });
            texts.x = 30;

            var textStyleWhite = {
                fontSize: 18,
                fill: 0xffffff,
                stroke: 0,
                strokeThickness: 4
            };
            var textStyleOrange = {
                fontSize: 18,
                fill: 0xff9763,
                stroke: 0,
                strokeThickness: 4
            };

            // TODO: Abstractize this part
            var text = i18n.t('Bet.ChooseBet');
            var bold = false;
            var beginIndex = 0;
            for (var index = 0; index < text.length; index++) {
                var isLastItem = index + 1 >= text.length;
                if (!bold && text.charAt(index) === '*' || isLastItem) {
                    texts.addChild(new PIXI.Text(text.slice(beginIndex, isLastItem ? index + 1 : index).trim(), textStyleWhite));
                    beginIndex = index + 1;
                    bold = true;
                    index++;
                } else if (bold && text.charAt(index) === '*' || isLastItem) {
                    texts.addChild(new PIXI.Text(text.slice(beginIndex, isLastItem ? index + 1 : index).trim(), textStyleOrange));
                    beginIndex = index + 1;
                    bold = false;
                    index++;
                }
            }

            texts.updateChildrenPosition();
            texts.y = texts.height / 2;
            this.addChild(texts);
        }
    }, {
        key: 'displayUpOrDownChoice',
        value: function displayUpOrDownChoice() {
            this.removeChildren();
            var textStyleWhite = {
                fontSize: 18,
                fill: 0xffffff,
                stroke: 0,
                strokeThickness: 4
            };
            this.addChild(new PIXI.Text(i18n.t('Bet.UpOrDown'), textStyleWhite));
        }
    }]);
    return ContextualDisplayer;
}(ContextualBox);

var GUICursor = function (_PIXI$Graphics) {
    inherits(GUICursor, _PIXI$Graphics);

    function GUICursor() {
        classCallCheck(this, GUICursor);

        var _this = possibleConstructorReturn(this, (GUICursor.__proto__ || Object.getPrototypeOf(GUICursor)).call(this));

        var WIDTH = 15;
        var HEIGHT = WIDTH;
        _this.clear().lineStyle(2, 0, 1).moveTo(0, 0).beginFill(0xffffff, 1).lineTo(WIDTH, HEIGHT / 2).lineTo(0, HEIGHT).lineTo(0, 0).endFill();
        _this.pivot.set(WIDTH, -HEIGHT / 2);
        return _this;
    }

    createClass(GUICursor, [{
        key: 'update',
        value: function update(game) {
            this.x += Math.cos(game._frame / 10) / 6;
        }
    }]);
    return GUICursor;
}(PIXI$1.Graphics);

var MENU_ITEM_FONT_SIZE = {
    2: 22
};

var ContextualMenu = function (_ContextualBox) {
    inherits(ContextualMenu, _ContextualBox);

    function ContextualMenu() {
        classCallCheck(this, ContextualMenu);

        /** @type {GUICursor} */
        var _this = possibleConstructorReturn(this, (ContextualMenu.__proto__ || Object.getPrototypeOf(ContextualMenu)).call(this));

        _this.currentCursor = null;
        _this.currentCursorIndex = 0;
        return _this;
    }

    createClass(ContextualMenu, [{
        key: 'removeChildren',
        value: function removeChildren() {
            this.currentCursorIndex = 0;
            if (this.currentCursor) this.currentCursor = null;
            get(ContextualMenu.prototype.__proto__ || Object.getPrototypeOf(ContextualMenu.prototype), 'removeChildren', this).call(this);
        }
    }, {
        key: 'drawBox',
        value: function drawBox(game) {
            /** @type {PIXI.Graphics} */
            var graphics = this;
            this.x = this.parent.getWidth() * 4 / 5;
            var rect = new Rect(0, this.parent.getWidth() * 1 / 5, this.parent.getHeight(), 0);
            this._drawBox(graphics, rect);
        }
    }, {
        key: 'displayMenu',
        value: function displayMenu(menuItems) {
            this.removeChildren();
            var layout = new LinearLayout();
            for (var index = 0; index < menuItems.length; index++) {
                var menuDesc = menuItems[index];
                var menuitem = new PIXI.Text(menuDesc.label, {
                    fontSize: MENU_ITEM_FONT_SIZE[menuItems.length],
                    fill: 0xffffff,
                    stroke: 0,
                    strokeThickness: 3
                });
                menuitem.menuItemIndex = index;
                menuitem.menuItemCallback = menuDesc.callback;
                layout.addChild(menuitem);
            }

            layout.updateChildrenPosition();
            layout.x = this.width / 2 - layout.width / 2;
            layout.y = layout.height / 2;
            this.addChild(layout);
            this.currentCursor = new GUICursor();
            this.addChild(this.currentCursor);
            this.setCursorIndex(0);
        }
    }, {
        key: 'setCursorIndex',
        value: function setCursorIndex(index) {
            var menuItems = this.getChildAt(0).children;
            if (index < 0) index = menuItems.length - 1;
            if (index >= menuItems.length) index = 0;
            var position = this.getChildAt(0).getChildPositionAt(index);
            this.currentCursor.y = position.y;
            if (this.currentCursor.x == 0) this.currentCursor.x = position.x - 15;
            this.currentCursorIndex = index;
        }
    }, {
        key: 'hasCursor',
        value: function hasCursor() {
            return this.currentCursor !== null;
        }
    }, {
        key: 'update',
        value: function update(game) {
            get(ContextualMenu.prototype.__proto__ || Object.getPrototypeOf(ContextualMenu.prototype), 'update', this).call(this, game);
            if (this.hasCursor()) {
                this.currentCursor.update(game);
                if (Keyboard.isKeyReleased(Keyboard.UP_ARROW)) {
                    this.setCursorIndex(this.currentCursorIndex - 1);
                } else if (Keyboard.isKeyReleased(Keyboard.DOWN_ARROW)) {
                    this.setCursorIndex(this.currentCursorIndex + 1);
                } else if (Keyboard.isKeyReleased(Keyboard.ENTER)) {
                    var item = this.getChildAt(0).getChildAt(this.currentCursorIndex);
                    if (item && item.menuItemCallback) item.menuItemCallback();
                }
            }
        }
    }]);
    return ContextualMenu;
}(ContextualBox);

var MARGIN_HONRIZONTAL = 10;
var MARGIN_VERTICAL = 15;

var GUIContext = function (_UpdatableContainer) {
    inherits(GUIContext, _UpdatableContainer);

    function GUIContext(x, y, game) {
        classCallCheck(this, GUIContext);

        /** @type {Game} */
        var _this = possibleConstructorReturn(this, (GUIContext.__proto__ || Object.getPrototypeOf(GUIContext)).call(this));

        _this.game = game;
        _this.x = x + MARGIN_HONRIZONTAL;
        _this.y = y - MARGIN_VERTICAL;
        _this.addChild(new ContextualDisplayer());
        _this.addChild(new ContextualMenu());
        return _this;
    }

    createClass(GUIContext, [{
        key: 'destroy',
        value: function destroy() {
            this.game = null;
            get(GUIContext.prototype.__proto__ || Object.getPrototypeOf(GUIContext.prototype), 'destroy', this).call(this);
        }
    }, {
        key: 'update',
        value: function update(game) {
            this._width = game.renderer.width - MARGIN_HONRIZONTAL * 2;
            this._height = game.renderer.height - this.y - MARGIN_VERTICAL;
            get(GUIContext.prototype.__proto__ || Object.getPrototypeOf(GUIContext.prototype), 'update', this).call(this, game);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this._width;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._height;
        }
    }, {
        key: 'displayControls',
        value: function displayControls() {
            this.getChildAt(0).displayControls();
            this.getChildAt(1).removeChildren();
        }
    }, {
        key: 'displayCombo',
        value: function displayCombo(combo) {
            this.getChildAt(0).displayCombo(combo);
            this.getChildAt(1).removeChildren();
        }
    }, {
        key: 'displayChooseBet',
        value: function displayChooseBet() {
            var _this2 = this;

            this.getChildAt(0).displayChooseBet();
            this.getChildAt(1).displayMenu([{
                label: i18n.t('Yes'),
                callback: function callback() {
                    return _this2.game.setPlayingState(Game.STATE_PLAYING_CHOOSE_UP_OR_DOWN);
                }
            }, {
                label: i18n.t('No'),
                callback: function callback() {
                    _this2.game.tokenCount += _this2.game.betCount;
                    _this2.game.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
                }
            }]);
        }
    }, {
        key: 'displayUpOrDownChoice',
        value: function displayUpOrDownChoice(_callback) {
            this.getChildAt(0).displayUpOrDownChoice();
            this.getChildAt(1).displayMenu([{
                label: i18n.t('Bet.Up'),
                callback: function callback() {
                    return _callback('up');
                }
            }, {
                label: i18n.t('Bet.Down'),
                callback: function callback() {
                    return _callback('down');
                }
            }]);
        }
    }]);
    return GUIContext;
}(UpdatableContainer);

var GUIComboTypeItem = function (_PIXI$Container) {
    inherits(GUIComboTypeItem, _PIXI$Container);

    function GUIComboTypeItem(options) {
        classCallCheck(this, GUIComboTypeItem);

        var _this = possibleConstructorReturn(this, (GUIComboTypeItem.__proto__ || Object.getPrototypeOf(GUIComboTypeItem)).call(this));

        _this.comboType = options.comboType;
        _this.parentWidth = options.parentWidth;
        _this.redraw();
        return _this;
    }

    createClass(GUIComboTypeItem, [{
        key: 'redraw',
        value: function redraw() {
            this.removeChildren();
            var comboName = ComboType.forName(this.comboType);
            var localeComboName = i18n.t('ComboType.' + comboName);
            this.addChild(new PIXI$1.Text(localeComboName, GuiText.textConfig));
            var factorText = new PIXI$1.Text('\xD7 ' + this.comboType, GuiText.textConfig);

            factorText.x = this.parentWidth - 50;
            this.addChild(factorText);
        }
    }]);
    return GUIComboTypeItem;
}(PIXI$1.Container);

var GUIComboTypesList = function (_ContextualBox) {
    inherits(GUIComboTypesList, _ContextualBox);

    function GUIComboTypesList(options) {
        classCallCheck(this, GUIComboTypesList);
        return possibleConstructorReturn(this, (GUIComboTypesList.__proto__ || Object.getPrototypeOf(GUIComboTypesList)).call(this));
    }

    createClass(GUIComboTypesList, [{
        key: 'drawBox',
        value: function drawBox(game) {
            /** @type {PIXI.Graphics} */
            var graphics = this;
            var rect = new Rect(0, this.parent.getWidth() * 4 / 5 - 10, this.parent.getHeight() / 4, 0);
            this._drawBox(graphics, rect);
            this.drawLists();
        }
    }, {
        key: 'drawLists',
        value: function drawLists() {
            var MARGIN_HOR = 20;
            var width = this.width - MARGIN_HOR * 2;
            var linearLayoutWidth = width / 2 - MARGIN_HOR;

            var col1 = new LinearLayout({
                childMargin: 4,
                x: MARGIN_HOR * 1.5 + 5,
                y: 12
            });

            var col2 = new LinearLayout({
                childMargin: 4,
                x: width / 2 + col1.x,
                y: 12
            });

            this.removeChildren();
            this.addChild(col1);
            this.addChild(col2);

            var values = Object.keys(ComboType).map(function (d) {
                return ComboType[d];
            }).sort(Numbers.Compare.desc);
            [values.slice(0, Math.floor(values.length / 2)), values.slice(Math.floor(values.length / 2), values.length)].forEach(function (values, i) {
                var layout = this.getChildAt(i);
                values.forEach(function (value) {
                    layout.addChild(new GUIComboTypeItem({
                        comboType: value,
                        parentWidth: linearLayoutWidth
                    }));
                }, this);
                layout.updateChildrenPosition();
            }, this);
        }
    }]);
    return GUIComboTypesList;
}(ContextualBox);

var GUIBetBox = function (_ContextualBox) {
    inherits(GUIBetBox, _ContextualBox);

    function GUIBetBox() {
        classCallCheck(this, GUIBetBox);

        var _this = possibleConstructorReturn(this, (GUIBetBox.__proto__ || Object.getPrototypeOf(GUIBetBox)).call(this));

        _this.addChild(new PIXI$1.Text(i18n.t('Bet.Bet'), GuiText.textConfig));
        _this.addChild(_this.betText = new PIXI$1.Text('0', GuiToken.textConfig));
        return _this;
    }

    createClass(GUIBetBox, [{
        key: 'drawBox',
        value: function drawBox(game) {
            /** @type {PIXI.Graphics} */
            var graphics = this;
            this.x = this.parent.getWidth() * 4 / 5;
            this.y = this.parent.getHeight() / 8 + 5;
            var rect = new Rect(0, this.parent.getWidth() - 10 - this.x, this.parent.getHeight() / 4 - this.y, 0);
            this._drawBox(graphics, rect);
            this.getChildAt(0).position.set(10, 10);
        }
    }, {
        key: 'update',
        value: function update(game) {
            get(GUIBetBox.prototype.__proto__ || Object.getPrototypeOf(GUIBetBox.prototype), 'update', this).call(this, game);
            this.betText.text = game.betCount;
            this.betText.position.set(this.width - this.betText.width - 10, this.height - this.betText.height - 10);
        }
    }]);
    return GUIBetBox;
}(ContextualBox);

var GUITokenCount = function (_ContextualBox) {
    inherits(GUITokenCount, _ContextualBox);

    function GUITokenCount() {
        classCallCheck(this, GUITokenCount);

        var _this = possibleConstructorReturn(this, (GUITokenCount.__proto__ || Object.getPrototypeOf(GUITokenCount)).call(this));

        _this.addChild(new PIXI$1.Text(i18n.t('TotalToken'), GuiText.textConfig));
        _this.addChild(_this.totalTokenText = new PIXI$1.Text('0', GuiToken.textConfig));
        return _this;
    }

    createClass(GUITokenCount, [{
        key: 'drawBox',
        value: function drawBox(game) {
            /** @type {PIXI.Graphics} */
            var graphics = this;
            this.x = this.parent.getWidth() * 4 / 5;
            var rect = new Rect(0, this.parent.getWidth() - 10 - this.x, this.parent.getHeight() / 8 - 5, 0);
            this._drawBox(graphics, rect);
            this.getChildAt(0).position.set(10, 10);
        }
    }, {
        key: 'update',
        value: function update(game) {
            get(GUITokenCount.prototype.__proto__ || Object.getPrototypeOf(GUITokenCount.prototype), 'update', this).call(this, game);
            this.totalTokenText.text = game.tokenCount;
            this.totalTokenText.position.set(this.width - this.totalTokenText.width - 10, this.height - this.totalTokenText.height - 10);
        }
    }]);
    return GUITokenCount;
}(ContextualBox);

var MARGIN_HONRIZONTAL$1 = 10;
var MARGIN_VERTICAL$1 = 15;

var TopMenuLayout = function (_UpdatableContainer) {
    inherits(TopMenuLayout, _UpdatableContainer);

    function TopMenuLayout(x, y, game) {
        classCallCheck(this, TopMenuLayout);

        var _this = possibleConstructorReturn(this, (TopMenuLayout.__proto__ || Object.getPrototypeOf(TopMenuLayout)).call(this));

        _this.game = game;
        _this.x = x + MARGIN_HONRIZONTAL$1;
        _this.y = y + MARGIN_VERTICAL$1;
        _this.addChild(new GUIComboTypesList());
        _this.addChild(new GUIBetBox());
        _this.addChild(new GUITokenCount());
        return _this;
    }

    createClass(TopMenuLayout, [{
        key: 'destroy',
        value: function destroy() {
            this.game = null;
            get(TopMenuLayout.prototype.__proto__ || Object.getPrototypeOf(TopMenuLayout.prototype), 'destroy', this).call(this);
        }
    }, {
        key: 'update',
        value: function update(game) {
            this._width = game.renderer.width - MARGIN_HONRIZONTAL$1 * 2;
            this._height = game.renderer.height - this.y - MARGIN_VERTICAL$1;
            get(TopMenuLayout.prototype.__proto__ || Object.getPrototypeOf(TopMenuLayout.prototype), 'update', this).call(this, game);
        }
    }, {
        key: 'getWidth',
        value: function getWidth() {
            return this._width;
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            return this._height;
        }
    }]);
    return TopMenuLayout;
}(UpdatableContainer);

var AbsCardArea = function (_LinearLayout) {
    inherits(AbsCardArea, _LinearLayout);

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} cardSlots
     */
    function AbsCardArea(x, y, cardSlots) {
        classCallCheck(this, AbsCardArea);

        var _this = possibleConstructorReturn(this, (AbsCardArea.__proto__ || Object.getPrototypeOf(AbsCardArea)).call(this, {
            orientation: LinearLayout.ORIENTATION_HORIZONTAL,
            childMargin: CardsGenerator.CARD_WIDTH / 10
        }));

        _this.x = x;
        _this.y = y;
        /** @type {number} */
        _this.cardSlots = cardSlots;
        /** @type {Card[]} */
        _this.slots = new Array(_this.cardSlots);
        _this.updateLayoutPivot();
        return _this;
    }

    /** @inheritdoc */


    createClass(AbsCardArea, [{
        key: 'destroyChildren',
        value: function destroyChildren() {
            this.slots = new Array(this.cardSlots);
            return get(AbsCardArea.prototype.__proto__ || Object.getPrototypeOf(AbsCardArea.prototype), 'destroyChildren', this).call(this);
        }
    }, {
        key: 'clearCards',
        value: function clearCards() {
            var _this2 = this;

            this.slots.forEach(function (card) {
                _this2.removeCard(card);
            });
            this.slots = new Array(this.cardSlots);
        }

        /**
         * @param {number} index
         * @returns {Card}
         */

    }, {
        key: 'removeCardAt',
        value: function removeCardAt(index) {
            if (index < 0 || index >= this.cardSlots) throw new Error('OutOfBoundException: AbsCardArea(slots: ' + this.cardSlots + '), index was ' + index);
            var card = this.slots[index];
            if (card) {
                this.removeChild(card);
                this.slots[index] = null;
            }
            return card;
        }

        /**
         * @param {Card} card
         * @returns {Card}
         */

    }, {
        key: 'removeCard',
        value: function removeCard(card) {
            return this.removeCardAt(this.slots.indexOf(card));
        }

        /**
         * @returns {CardCollection}
         */

    }, {
        key: 'getCards',
        value: function getCards() {
            return new CardCollection(this.slots.slice(0));
        }

        /**
         * @param {number} index
         * @returns {Card}
         */

    }, {
        key: 'getCardAt',
        value: function getCardAt(index) {
            return this.slots[index];
        }

        /**
         * @param {number} index
         * @returns {PIXI.Point}
         */

    }, {
        key: 'getCardPositionAt',
        value: function getCardPositionAt(index) {
            return this.getChildPosition(this.getCardAt(index));
        }

        /**
         * Find the first empty card slot index
         * @returns {number}
         */

    }, {
        key: 'findFirstEmptySlot',
        value: function findFirstEmptySlot() {
            for (var index = 0; index < this.cardSlots; index++) {
                if (!this.slots[index]) return index;
            }
            return -1;
        }

        /**
         * Add a child to the first empty card slot
         * @param {Card} card
         */

    }, {
        key: 'addCard',
        value: function addCard(card) {
            return this.addCardAt(card, this.findFirstEmptySlot());
        }

        /**
         * Add a child to a slot
         * @param {Card} card
         * @param {number} index
         */

    }, {
        key: 'addCardAt',
        value: function addCardAt(card, index) {
            if (index < 0 || index >= this.cardSlots) throw new Error('OutOfBoundException: AbsCardArea(slots: ' + this.cardSlots + '), index was ' + index);
            if (this.slots[index]) {
                this.removeChild(this.slots[index]);
            }
            this.slots[index] = card;
            this.updateChildrenPosition();
            return get(AbsCardArea.prototype.__proto__ || Object.getPrototypeOf(AbsCardArea.prototype), 'addChild', this).call(this, card);
        }

        /**
         * Update all children position
         */

    }, {
        key: 'updateChildrenPosition',
        value: function updateChildrenPosition() {
            var pos = 0;
            for (var index = 0; index < this.cardSlots; index++) {
                var card = this.getCardAt(index);
                if (card) card[this._posPropertyName] = pos;
                pos += CardsGenerator.CARD_WIDTH + this.childMargin;
            }
        }
    }, {
        key: 'updateLayoutPivot',
        value: function updateLayoutPivot() {
            var width = this.cardSlots * CardsGenerator.CARD_WIDTH + (this.cardSlots - 1) * this.childMargin;
            this.pivot.set(width / 2, 0);
        }
    }, {
        key: 'update',
        value: function update(game) {}
    }]);
    return AbsCardArea;
}(LinearLayout);

var CardRiverArea = function (_AbsCardArea) {
    inherits(CardRiverArea, _AbsCardArea);

    /**
     * @param {number} x
     * @param {number} y
     */
    function CardRiverArea(x, y) {
        classCallCheck(this, CardRiverArea);

        var _this = possibleConstructorReturn(this, (CardRiverArea.__proto__ || Object.getPrototypeOf(CardRiverArea)).call(this, x, y, 5));

        _this.childMargin = 40;
        _this.updateLayoutPivot();
        _this.keepTexts = [];
        _this.selectedCardsToBeChanged = [];
        _this._generateKeepTexts();
        return _this;
    }

    /**
     * @private
     */


    createClass(CardRiverArea, [{
        key: '_generateKeepTexts',
        value: function _generateKeepTexts() {
            for (var index = 0, text; index < this.cardSlots; index++) {
                text = new PIXI$1.Text('GARDER', { fill: 0x000000, fontSize: 16 });
                this.keepTexts.push(text);
                this.addChild(text);
            }
        }
    }, {
        key: 'clearCards',
        value: function clearCards() {
            this.displayKeepTexts();
            get(CardRiverArea.prototype.__proto__ || Object.getPrototypeOf(CardRiverArea.prototype), 'clearCards', this).call(this);
        }
    }, {
        key: 'displayKeepTexts',
        value: function displayKeepTexts() {
            this.keepTexts.forEach(function (text) {
                return text.visible = true;
            });
        }
    }, {
        key: 'hideKeepTexts',
        value: function hideKeepTexts() {
            this.keepTexts.forEach(function (text) {
                return text.visible = false;
            });
        }
    }, {
        key: 'updateChildrenPosition',
        value: function updateChildrenPosition() {
            var pos = 0;
            for (var index = 0; index < this.cardSlots; index++) {
                var card = this.getCardAt(index);
                if (card) {
                    card.x = pos;
                    var keepText = this.keepTexts[index];
                    if (keepText) {
                        keepText.position.set(pos + CardsGenerator.CARD_WIDTH / 2 - keepText.width / 2, card.y - keepText.height - 10);
                    }
                }

                pos += CardsGenerator.CARD_WIDTH + this.childMargin;
            }
        }

        /**
         * @param {number} index
         * @param {boolean} swt
         */

    }, {
        key: 'setSelectedCardIndex',
        value: function setSelectedCardIndex(index, swt) {
            var card = this.getCardAt(index);
            var indexOfCard = this.selectedCardsToBeChanged.indexOf(card);
            var isSelected = indexOfCard > -1;
            if (isSelected && swt || !isSelected && !swt) return;
            if (swt) {
                this.selectedCardsToBeChanged.push(card);
                this.keepTexts[index].visible = false;
            } else {
                this.selectedCardsToBeChanged.splice(indexOfCard, 1);
                this.keepTexts[index].visible = true;
            }
            card.y += swt ? -20 : 20;
        }
    }]);
    return CardRiverArea;
}(AbsCardArea);

var CardBetArea = function (_AbsCardArea) {
    inherits(CardBetArea, _AbsCardArea);

    function CardBetArea(x, y) {
        classCallCheck(this, CardBetArea);
        return possibleConstructorReturn(this, (CardBetArea.__proto__ || Object.getPrototypeOf(CardBetArea)).call(this, x, y, 2));
    }

    return CardBetArea;
}(AbsCardArea);

var ticker = PIXI.ticker.shared; //new PIXI.ticker.Ticker();

var Game = function () {
    function Game(options) {
        classCallCheck(this, Game);

        this._frame = 0;
        /** @type {CardCollection} */
        this.cards = null;
        /** @type {AbsCardArea} */
        this.river = null;

        i18n.setup(options.langs);

        this.tokenCount = 10000;
        this.originalBetCount = 100;
        this.betCount = 0;

        this.gameState = Game.GAME_IDLE;
        this.playingGameState = Game.STATE_PLAYING_CHOOSE_BET;

        this.cardsGenerator = new CardsGenerator(options.cardTextures);

        this.fg = new UpdatableContainer();
        this.gui = new UpdatableContainer();
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
        /** @type {HTMLElement} */
        this.container = null;
        if (options.container) {
            this.container = options.container;
            this.container.appendChild(this.renderer.view);
        }
        this.setSize(this.renderer.width, this.renderer.height);
    }

    createClass(Game, [{
        key: 'setLanguage',
        value: function setLanguage(lang) {
            i18n.setLang(lang);
        }
    }, {
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
            if (this.cards) this.cards.destroy();
            this.cards = null;
            this.player = null;
            this.fg.destroyChildren();
            this.gui.destroyChildren();
        }
    }, {
        key: 'newGame',
        value: function newGame() {
            this.gameState = Game.STATE_IDLE;

            var stageWidth = this.renderer.width;
            var stageHeight = this.renderer.height;
            this.river = new CardRiverArea(stageWidth / 2, stageHeight / 4 * 2);
            this.betRiver = new CardBetArea(stageWidth / 2, stageHeight / 4 * 2);
            this.river.visible = false;
            this.betRiver.visible = false;
            this.fg.addChild(this.river);
            this.fg.addChild(this.betRiver);
            var contextualBox = new GUIContext(0, stageHeight * 5 / 6, this);
            var topMenu = new TopMenuLayout(0, 0, this);

            this.fg.addChild(contextualBox);
            this.fg.addChild(topMenu);
            contextualBox.update(this);
            topMenu.update(this);
            this.clearBoard();
        }
    }, {
        key: 'clearBoard',
        value: function clearBoard() {
            this.river.clearCards();
            if (this.cards) this.cards.destroy();
            this.cards = this.cardsGenerator.generateCards();
            var iteration = Numbers.clamp(Math.floor(Math.random() * 14), 2, 14);
            for (var index = 0; index < iteration; index++) {
                this.cards.shuffle();
            }
            console.log('shuffle %s times', iteration);
        }

        /**
         * @param {number} count
         * @param {AbsCardArea} cardArea
         */

    }, {
        key: 'distribute',
        value: function distribute(count) {
            var cardArea = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.river;


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

            for (var index = 0; index < count; index++) {
                var card = this.cards.peek();
                cardArea.addCard(card);
                this.cards.remove(card);
            }
        }
    }, {
        key: 'displayCardCursorSelection',
        value: function displayCardCursorSelection() {
            var p = this.river.getCardAt(0);
            var cursor = new GUICardSelector(p.x + CardsGenerator.CARD_WIDTH / 2, p.y + CardsGenerator.CARD_HEIGHT + 25);
            cursor.setCursorCardIndex(this, 0);
            this.gui.addChild(cursor);
        }
    }, {
        key: 'setState',
        value: function setState(state) {
            this.gameState = state;
        }
    }, {
        key: 'setPlayingState',
        value: function setPlayingState(state) {
            if (state === this.playingGameState) return;
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
                    this.river.hideKeepTexts();
                    this.commitChanges();
                    var combo = this.getCardComboList().getHigherCombo() || null;
                    var iaCombo = new CardCombo({ type: ComboType.Pair });

                    var score = Resolver.compareCombos(combo, iaCombo);
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
    }, {
        key: '_onBetChoiceDone',
        value: function _onBetChoiceDone(choice) {
            this.distribute(1, this.betRiver);
            var firstCard = this.betRiver.getCardAt(0);
            var lastCard = this.betRiver.getCardAt(1);

            if (choice == 'up' && firstCard.value < lastCard.value || choice == 'down' && firstCard.value > lastCard.value) {
                this.betCount *= 2;
                this.displayBetScore(Score.WON);
            } else {
                this.displayBetScore(Score.LOST);
            }
            this.setPlayingState(Game.STATE_PLAYING_DISPLAY_BET_SCORE);
        }
    }, {
        key: 'displayBetScore',
        value: function displayBetScore(score) {
            this.gui.addChild(new GUIBetScore({
                game: this,
                score: score
            }));
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

            this.fg.update(this);
            this.gui.update(this);
            if (this.gameState === Game.STATE_PLAYING) {
                if (this.playingGameState === Game.STATE_PLAYING_CHOOSE_CARDS) {
                    if (Keyboard.isKeyPushed(Keyboard.ENTER)) {
                        this.setPlayingState(Game.STATE_PLAYING_DISPLAY_RIVER_SCORE);
                    }
                } else if (this.playingGameState === Game.STATE_PLAYING_DISPLAY_BET_SCORE) {

                    var scoreLayout = this.gui.findChildrenByType(GUIBetScore);
                    if (scoreLayout.scoreState === AbsScoreLayout.STATE_TRANSITION_TERMINATED || Keyboard.isKeyPushed(Keyboard.ENTER)) {
                        if (scoreLayout.hasWon()) {
                            this.setPlayingState(Game.STATE_PLAYING_CHOOSE_RISK);
                        } else {
                            this.setPlayingState(Game.STATE_PLAYING_CHOOSE_CARDS);
                        }
                    }
                } else if (this.playingGameState === Game.STATE_PLAYING_DISPLAY_RIVER_SCORE) {
                    var _scoreLayout = this.gui.findChildrenByType(GUIScoreLayout);
                    if (_scoreLayout.scoreState === AbsScoreLayout.STATE_TRANSITION_TERMINATED || Keyboard.isKeyPushed(Keyboard.ENTER)) {
                        if (!_scoreLayout.playerCombo || _scoreLayout.playerCombo.type < 2) {
                            if (_scoreLayout.playerCombo) {
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
    }, {
        key: 'getCardComboList',
        value: function getCardComboList() {
            return new CardComboList(this.river.getCards());
        }
    }, {
        key: 'commitChanges',
        value: function commitChanges() {
            var cards = this.river.selectedCardsToBeChanged.splice(0, this.river.selectedCardsToBeChanged.length);
            var cardsLen = cards.length;
            for (var index = 0; index < cardsLen; index++) {
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

var version = "0.0.7-PRE-Alpha";

Game.VERSION = version;
Game.BUILD_TIME = '01-21-2017 16:57:43';

Tracker.track('pageview');

var poker_game = {
    Game: Game
};

return poker_game;

})));
//# sourceMappingURL=poker_game.js.map
