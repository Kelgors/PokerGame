var container =  document.getElementById('viewport');
var game = new PokerGame.Game({
    container: container,
    transparent: true,
    antialias: true,
    width: container.offsetWidth,
    height: container.offsetHeight
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

