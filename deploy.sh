if [ "$1" = "prod" ]; then
    echo "Deploy production"
    scp -r website/* dist/poker_game.js deploy@kelgors.me:~/poker_game
else
    echo "Deploy nightly"
    scp -r website/* dist/poker_game.js deploy@kelgors.me:~/poker_game/nightly
fi

