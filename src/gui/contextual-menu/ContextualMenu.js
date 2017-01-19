import ContextualBox from '../ContextualBox';
import Rect from '../../lib/Rect';
import GUICursor from './GUICursor';
import LinearLayout from '../LinearLayout';
import Keyboard from '../../lib/Keyboard';

const MENU_ITEM_FONT_SIZE = {
    2: 22
};

export default class ContextualMenu extends ContextualBox {

    constructor() {
        super();
        /** @type {GUICursor} */
        this.currentCursor = null;
        this.currentCursorIndex = 0;
    }

    removeChildren() {
        this.currentCursorIndex = 0;
        if (this.currentCursor) this.currentCursor = null;
        super.removeChildren();
    }

    drawBox(game) {
        /** @type {PIXI.Graphics} */
        const graphics = this;
        this.x = this.parent.getWidth()*4/5;
        const rect = new Rect(0, this.parent.getWidth()*1/5, this.parent.getHeight(), 0);
        this._drawBox(graphics, rect);
    }

    displayMenu(menuItems) {
        this.removeChildren();
        const layout = new LinearLayout();
        for (let index = 0; index < menuItems.length; index++) {
            const menuDesc = menuItems[index];
            const menuitem = new PIXI.Text(menuDesc.label, {
                fontSize: MENU_ITEM_FONT_SIZE[menuItems.length],
                fill: 0xffffff,
                stroke: 0,
                strokeThickness: 3
            });
            menuitem.menuItemIndex = index;
            menuitem.menuItemCallback = menuDesc.callback;
            layout.addChild(menuitem);
        }
        
        layout.updateChildrenPosition();
        layout.x = this.width / 2- layout.width / 2;
        layout.y = layout.height / 2;
        this.addChild(layout);
        this.currentCursor = new GUICursor();
        this.addChild(this.currentCursor);
        this.setCursorIndex(0);
    }

    setCursorIndex(index) {
        const menuItems = this.getChildAt(0).children;
        if (index < 0) index = menuItems.length - 1;
        if (index >= menuItems.length) index = 0;
        const position = this.getChildAt(0).getChildPositionAt(index);
        this.currentCursor.y = position.y;
        this.currentCursor.x = position.x - 15;
        this.currentCursorIndex = index;
    }
    
    hasCursor() {
        return this.currentCursor !== null;
    }

    update(game) {
        super.update(game);
        if (this.hasCursor()) {
            this.currentCursor.update(game);
            if (Keyboard.isKeyReleased(Keyboard.UP_ARROW)) {
                this.setCursorIndex(this.currentCursorIndex - 1);
            } else if (Keyboard.isKeyReleased(Keyboard.DOWN_ARROW)) {
                this.setCursorIndex(this.currentCursorIndex + 1);
            } else if (Keyboard.isKeyReleased(Keyboard.ENTER)) {
                let item = this.getChildAt(0).getChildAt(this.currentCursorIndex);
                if (item && item.menuItemCallback) item.menuItemCallback();
            }
        }
    }

}