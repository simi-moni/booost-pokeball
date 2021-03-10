import { Container, Text, Sprite } from 'pixi.js';
import gsap from 'gsap';

export default class Pokeball extends Container {
    constructor() {
        super();

        this.name = 'pokeball';
        this.text = this._addText();
        this.isOpened = false;

        this.top = Sprite.from('top');
        this.top.anchor.set(0.5, 0.5);

        this.bottom = Sprite.from('bot');
        this.bottom.anchor.set(0.5, -0.4);

        this.addChild(this.top);
        this.addChild(this.bottom);

        //this.on(Pokeball.events.OPEN_START, () => this.open());
        this.on(Pokeball.events.OPEN_END, () => this.close());
    };

    static get events() {
        return {
            OPEN_END: 'open_end',
            OPEN_START: 'open_start',
            CLOSE_END: 'close_end',
            CLOSE_START: 'close_start',
        }
    };

    static get pokemons() {
        return {
            names: ['Pikachu', 'Bulbasaur', 'Raichu', 'Charizard', 'Jigglypuff', 'Chimchar', 'Turtwig', 'Totodile']
        }
    };

    _setRandomText() {
        this.text.text = Pokeball.pokemons.names[Math.floor(Math.random() * Pokeball.pokemons.names.length)];
    }

    async open() {
        this.emit(Pokeball.events.OPEN_START);

        const tlOpen = new gsap.timeline();
        await tlOpen.to(this.top, { y: -200, ease: 'bounce.out', }, 'open')//elastic or bounce
            .to(this.bottom, { y: 50, ease: 'bounce.out', }, 'open');

        gsap.to(this.text, { alpha: 1 });
        await this._shuffle();
        gsap.to(this.text, { alpha: 0 });

        this.emit(Pokeball.events.OPEN_END);
        this.isOpened = true;
    }

    async close() {
        this.emit(Pokeball.events.CLOSE_START);

        const tlClose = new gsap.timeline();
        await tlClose.to(this.top, { y: 0, ease: 'bounce.out', }, 'close')
            .to(this.bottom, { y: 0, ease: 'bounce.out', }, 'close');

        this.emit(Pokeball.events.CLOSE_END);
        this.isOpened = false;
    }

    _addText() {
        const text = new Text('Text', {
            fill: 0xffffff,
            fontWeight: 'bold',
            fontSize: 100,
            align: 'center',
        });
        text.x = this.width / 2;
        text.y = this.height / 2;
        text.alpha = 0;
        text.anchor.set(0.5);
        this.addChild(text);
        return text;
    }

    async _shuffle() {
        let prev = 0;

        const dummy = { value: 0 };
        const steps = gsap.to(dummy, {
            duration: 1,
            ease: "steps(100)",
            value: 100,
            paused: true,
            onUpdate: () => {
                if (dummy.value !== prev) this._setRandomText();
                prev = dummy.value;
            },
        });

        await gsap.to(steps, { duration: 5, progress: 1, ease: "circ.out" });
    }
}