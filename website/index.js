window.game = null;
const loader = PIXI.loader
    .add('lang:fr', 'assets/languages/fr.json')
    .add('lang:en', 'assets/languages/en.json')
    .add('card:black_joker', `assets/cards/default/black_joker.svg`)
    .add('card:red_joker', `assets/cards/default/red_joker.svg`);

[ '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace' ].forEach(function (value) {
    ['spades', 'diamonds', 'clubs', 'hearts'].forEach(function (suit) {
        let urlSuitName = suit;
        if (value !== 'ace' && isNaN(value)) urlSuitName += '2';
        loader.add(`card:${value}_of_${suit}`, `assets/cards/default/${value}_of_${urlSuitName}.svg`);
    });
});

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
        if (d.startsWith('lang:')) {
            out.push(res[d].data);
        }
    });
    return out;
}

loader.load(function (loader, res) {
    const container =  document.getElementById('viewport');

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    if (width > height) {
        width = height * 4 / 3;
    } else if (height > width) {
        height = width * 4 / 3;
    }

    game = new PokerGame.Game({
        container: container,
        transparent: true,
        antialias: true,
        width,
        height,
        langs: getLanguages(res),
        cardTextures: getCardTextures(res)
    });
    const query = location.search.slice(1, location.search.length);
    query.split('&').forEach(function (queryElement) {
        const params = queryElement.split('=');
        if (params[0] === 'lang') game.setLanguage(params[1].toUpperCase());
    });

    document.getElementById('timestamp').textContent = PokerGame.Game.BUILD_TIME;
    document.getElementById('version-name').textContent = PokerGame.Game.VERSION;

    setTimeout(function () {
        game.stop();
        game.clearGame();
        game.newGame();    
        game.distribute();
        
        game.start();

        window.addEventListener('focus', function () {
            game.start();
        });

        window.addEventListener('blur', function () {
            game.stop();
        });
    }, 200);

});