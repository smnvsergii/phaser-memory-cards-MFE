/**
 * Card — игровой объект карточки.
 * Расширяет Phaser.GameObjects.Sprite и инкапсулирует анимации
 * передвижения и переворота, а также состояние «открыта/закрыта».
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
        // ставим карту за пределы экрана для эффекта влёта
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
        // важно: разные текстуры разного размера, поэтому перенормируем
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
