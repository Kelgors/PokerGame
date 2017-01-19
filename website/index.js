window.game = null;
PIXI.loader
    .add('langs/fr.json')
    .load(function (loader, res) {
        console.log(res['langs/fr.json'].data);
        var container =  document.getElementById('viewport');
        game = new PokerGame.Game({
            container: container,
            transparent: true,
            antialias: true,
            width: container.offsetWidth,
            height: container.offsetHeight,
            langs: [ res['langs/fr.json'].data ]
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