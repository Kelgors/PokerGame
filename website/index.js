var router = new Navigo(null, true);
var currentLang = null;
var settingsView = null;

router.on('/:lang/settings', function () {
    if (!settingsView) {
        settingsView = new SettingsView();
        settingsView.addInteractions();
    }
    settingsView.render();
    settingsView.save();
    setScreen('settings-screen');
});

router.on('/:lang/play', function (params) {
    if (currentLang !== params.lang && window.game) {
        window.game.stop();
        window.game.destroy();
        window.game = null;
    }
    currentLang = params.lang;
    createGame().then(function (game) {
        game.setLanguage(params.lang.toUpperCase());
        game.newGame();
        game.render();
        return setScreen('play-screen');
    }).then(function () {
        game.start();
    });
});

router.on('/:lang', function () {
    setScreen('intro-screen');
});

router.on('', function () {
    router.navigate('/en/play');
});

function setScreen(id) {
    Array.from(document.querySelectorAll('.screen.displayed')).forEach(function (screen) {
        screen.classList.remove('displayed');
    });
    document.getElementById(id).classList.add('displayed');
    return PokerGame.Async.wait(800);
}

function createGame() {
    var promise;
    if (window.game) promise = Promise.resolve(window.game);
    else promise = loadAssets().then(initializeGame);
    return promise;
}

function loadAssets() {
    window.game = null;
    var loader = PIXI.loader.reset();
    if (currentLang && !/en/i.test(currentLang)) {
        loader.add('lang:' + currentLang, 'assets/languages/' + currentLang + '.json');
    }
    loader.add('lang:en', 'assets/languages/en.json')
        .add('card:black_joker', `assets/cards/default/black_joker.svg`)
        .add('card:red_joker', `assets/cards/default/red_joker.svg`);
    [ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace' ].forEach(function (value) {
        ['spades', 'diamonds', 'clubs', 'hearts'].forEach(function (suit) {
            let urlSuitName = suit;
            if (value !== 'ace' && isNaN(value)) urlSuitName += '2';
            loader.add(`card:${value}_of_${suit}`, `assets/cards/default/${value}_of_${urlSuitName}.svg`);
        });
    });
    return new Promise(function (r) {
        loader.load(function (loader, resources) { r(resources); });
    });
}

function setupContainerSize() {
    var container = document.getElementById('viewport');
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    if (width > height) {
        width = height * 4 / 3;
    } else if (height > width) {
        height = width * 4 / 3;
    }
    container.style.width = width + 'px';
    container.style.height = height + 'px';
}

function getContainerSize() {
    var container = document.getElementById('viewport');
    var width = container.style.width;
    var height = container.style.height;
    return [ +width.slice(0, width.length - 2), +height.slice(0, height.length - 2) ];
}

function getCardTextures(res) {
    const out = {};
    Object.keys(res).forEach((d) => {
        if (d.startsWith('card:')) {
            out[d] = res[d].texture;
        }
    });
    return out;
}
function getLanguages(res) {
    const out = [];
    Object.keys(res).forEach((d) => {
        if (d.startsWith('lang:') && res[d].data) {
            out.push(res[d].data);
        }
    });
    return out;
}

function initializeGame(resources) {
    var container = document.getElementById('play-screen');
    var size = getContainerSize();
    game = new PokerGame.Game({
        container: container,
        transparent: true,
        antialias: true,
        width: size[0],
        height: size[1],
        langs: getLanguages(resources),
        cardTextures: getCardTextures(resources)
    });
    document.getElementById('timestamp').textContent = PokerGame.Game.BUILD_TIME;
    document.getElementById('version-name').textContent = PokerGame.Game.VERSION;
    return Promise.resolve(game);
}

function SettingsView() {
    this.el = document.getElementById('settings-screen');
}
SettingsView.prototype.addInteractions = function addInteractions() {
    Array.from(this.el.querySelectorAll('.checkbox-container')).forEach(function (el) {
        el.onclick = function () {
            const checked = this.getAttribute('aria-checked') === 'true';
            this.setAttribute('aria-checked', checked ? 'false' : 'true');
        };
    });
    this.el.querySelector('.submit').onclick = (function () {
        this.save();
    }).bind(this);
};

SettingsView.prototype.render = function render() {
    var itemsLen = localStorage.length;
    for (var index = 0; index < itemsLen; index++) {
        var key = localStorage.key(index);
        var value = localStorage.getItem(key);
        if (!value) continue;
        var el = this.el.querySelector('[name="' + key + '"]');
        if (el.tagName === 'SELECT') {
            var option = el.querySelector('[value="' + value + '"]');
            el.selectedOptions = [ option ];
        } else if (el.getAttribute('role') === 'checkbox') {
            el.setAttribute('aria-checked', value);
        }
    }
};

SettingsView.prototype.save = function save() {
    Array.from(this.el.querySelectorAll('.checkbox-container')).forEach(function (el) {
        localStorage.setItem(el.getAttribute('name'), el.getAttribute('aria-checked'));
    });
    Array.from(this.el.querySelectorAll('select')).forEach(function (el) {
        var option = el.selectedOptions.item(0);
        var value = option.value;
        localStorage.setItem(el.getAttribute('name'), value);
    });
};


window.addEventListener('focus', function () {
    if (window.game) window.game.start();
});

window.addEventListener('blur', function () {
    if (window.game) window.game.stop();
});

window.addEventListener('beforeunload', function () {
    if (window.game) window.game.destroy();
});

setupContainerSize();
router.resolve();

