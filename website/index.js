var container =  document.getElementById('viewport');
var game = new PokerGame.Game({
    container: container,
    transparent: true,
    antialias: true,
    width: container.offsetWidth,
    height: container.offsetHeight
});

setTimeout(function () {
    game.stop();
    game.clearGame();
    game.newGame();    
    game.distribute();
    
    game.loop(1);
}, 1000);

