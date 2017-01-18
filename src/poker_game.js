import Game from './Game';
import Card from './Card';
import Tracker from './Tracker';
import {version} from '../package.json';

Game.VERSION = version;
Game.BUILD_TIME = '{BUILD_TIME}';

Tracker.track('pageview');

export default {
    Game
};