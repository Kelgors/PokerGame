import PIXI from 'pixi.js';

export default class Timer {
    constructor(targetedTime, ticker = PIXI.ticker.shared) {
        this.target = targetedTime;
        this.time = 0;
        this.ticker = ticker;
        this.isStarted = false;
    }

    destroy() {
        this.stop();
        this.ticker = null;
    }

    set(targetedTime) {
        this.target = targetedTime || 0;
        this.time = 0;
    }

    reset() {
        this.time = 0;
    }

    start() {
        if (!this.isStarted) {
            this.ticker.add(this.tick, this);
            this.isStarted = true;
        }
    }

    stop() {
        if (this.isStarted) {
            this.ticker.remove(this.tick, this)
            this.isStarted = false;
        }
    }

    tick() {
        this.time += this.ticker.elapsedMS;
    }

    delta() {
        return this.target - this.time;
    }

}
