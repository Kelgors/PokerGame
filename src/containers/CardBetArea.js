import AbsCardArea from './AbsCardArea';

export default class CardBetArea extends AbsCardArea {

    constructor(x, y) {
        super(x, y, 2);
        this.childMargin = 120;
        this.updateLayoutPivot();
    }

}