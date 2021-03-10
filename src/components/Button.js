import { Container, Text, Graphics } from 'pixi.js';
import gsap from 'gsap';

export default class Button extends Container {
    constructor() {
        super();

        this.name = 'button';
        this.interactive = true;
        this.buttonMode = true;
        this.x = -150;
        this.y = 300;
        this._addButton();
        this._addText();
    }

    show() {
        gsap.to(this, { alpha: 1, duration: 0.1 });
    }

    hide() {
        gsap.to(this, { alpha: 0, duration: 0.1 });
    }

    _addButton() {
        const button = new Graphics();
        button.beginFill(0xff0000);
        button.drawRect(0, 0, 300, 100);
        button.endFill();
        this.addChild(button);
    }

    _addText() {
        const text = new Text('Throw Ball', {
            fill: 0xffffff,
            fontWeight: 'bold',
            align: 'center',
        });
        text.x = this.width / 2;
        text.y = this.height / 2;
        text.anchor.set(0.5);
        this.addChild(text);
    }
}