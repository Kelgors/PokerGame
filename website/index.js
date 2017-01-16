var container =  document.getElementById('viewport');
var game = new PokerGame.Game({
    container: container,
    transparent: true,
    antialias: true,
    width: container.offsetWidth,
    height: container.offsetHeight
});
game.newGame();
game.loop(0);
