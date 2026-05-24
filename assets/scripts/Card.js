class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.scene.add.existing(this);
        this.setDisplaySize(config.cardWidth, config.cardHeight);
        this.setInteractive();
        this.opened = false;
    }

    init(position) {
        this.position = position;
        this.close();
        this.setPosition(-this.displayWidth, -this.displayHeight);
    }

    move(params) {
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
            }
        });
        // this.setPosition(params.x, params.y);
    }

    flip() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                this.show();
            }
        });
    }

    show() {
        let texture = this.opened ? 'card' + this.value : 'card';
        this.setTexture(texture);
        this.setDisplaySize(config.cardWidth, config.cardHeight);
        const targetScaleX = this.scaleX;
        this.scaleX = 0;
        this.scene.tweens.add({
            targets: this,
            scaleX: targetScaleX,
            ease: 'Linear',
            duration: 150,
        });
    }

    open() {
        this.opened = true;
        this.flip();
    }
    close() {
        if (this.opened) {
            this.opened = false;
            this.flip();
        }
    }
}