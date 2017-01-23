export default class Rect {
    constructor(top, right, bottom, left) {
        this.set(top || 0, right || 0, bottom || 0, left || 0);
    }

    set(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    scale(x, y) {
        return new Rect(this.top * y, this.right * x, this.bottom * y, this.left * x);
    }
}
