/**
 * Card is a card game object.
 * Extends Phaser.GameObjects.Sprite and encapsulates animations
 * for movement and flipping, as well as the open/closed state.
 */
class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value) {
        super(scene, 0, 0, 'card');
        this.scene = scene;
        this.value = value;
        this.scene.add.existing(this);
        this.setDisplaySize(GameConfig.cardWidth, GameConfig.cardHeight);
        this.setInteractive();
        this.opened = false;
    }

    init(position) {
        this.position = position;
        this.close();
        // We place the map outside the screen for the effect of flying in
        this.setPosition(-this.displayWidth, -this.displayHeight);
    }

    move(params) {
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: GameConfig.animation.cardMoveDuration,
        });
    }

    flip() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: GameConfig.animation.cardFlipDuration,
            onComplete: () => this.show(),
        });
    }

    show() {
        const texture = this.opened ? 'card' + this.value : 'card';
        this.setTexture(texture);
        // Important: different textures are of different sizes, so we will renormalize
        this.setDisplaySize(GameConfig.cardWidth, GameConfig.cardHeight);
        const targetScaleX = this.scaleX;
        this.scaleX = 0;
        this.scene.tweens.add({
            targets: this,
            scaleX: targetScaleX,
            ease: 'Linear',
            duration: GameConfig.animation.cardFlipDuration,
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
