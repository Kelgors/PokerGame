if [ "$1" = "prod" ]; then
    echo "Deploy production"
    scp website/* dist/poker_game.js deploy@kelgors.me:~/poker_game
else
    echo "Deploy nightly"
    scp website/* dist/poker_game.js deploy@kelgors.me:~/poker_game/nightly
fi

