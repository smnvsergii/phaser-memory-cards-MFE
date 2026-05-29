import Phaser from 'phaser';
import { GameConfig, type CardKey } from '../config';

export interface CardPosition {
    x: number;
    y: number;
    delay: number;
}

/**
 * Card is a Phaser sprite that knows how to flip and fly into place.
 *
 * The displayed size is provided externally via `setCardSize` so the
 * scene can re-lay out cards on viewport resize. State is intentionally
 * minimal: `value` (which face it shows when open) and `opened`.
 *
 * Size is enforced after every texture swap. The flip animation never
 * touches `scaleY` — it scales only X to 0 and back, then re-applies
 * the target X scale derived from the current card width.
 */
export class Card extends Phaser.GameObjects.Sprite {
    readonly value: CardKey;
    opened = false;
    position!: CardPosition;

    private cardWidth = 200;
    private cardHeight = 300;

    constructor(scene: Phaser.Scene, value: CardKey) {
        super(scene, 0, 0, 'card-back');
        this.value = value;
        scene.add.existing(this);
        this.setInteractive();
        // Linear filter gives a smoother look when downscaling — Phaser's
        // default, but state it explicitly in case a future config flips it.
        this.texture.setFilter(Phaser.Textures.FilterMode.LINEAR);
    }

    /** Adjust the rendered size. Call on layout / resize. */
    setCardSize(width: number, height: number): this {
        this.cardWidth = width;
        this.cardHeight = height;
        this.applyDisplaySize();
        return this;
    }

    init(position: CardPosition): void {
        this.position = position;
        // Reset state without playing a flip animation.
        this.opened = false;
        this.setTexture('card-back');
        this.applyDisplaySize();
        // Place the card off-screen so it can fly in.
        this.setPosition(-this.cardWidth, -this.cardHeight);
    }

    move(params: CardPosition): void {
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: GameConfig.animation.cardMoveDuration,
        });
    }

    open(): void {
        if (this.opened) return;
        this.opened = true;
        this.flip();
    }

    close(): void {
        if (!this.opened) return;
        this.opened = false;
        this.flip();
    }

    /**
     * Flip the card by scaling X to 0, swapping the texture, then scaling
     * back to the target X scale derived from the current card width.
     * The animation never touches scaleY, so card height stays constant.
     */
    private flip(): void {
        const targetTexture = this.opened ? `card-${this.value}` : 'card-back';

        // Phase 1: collapse horizontally.
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: GameConfig.animation.cardFlipDuration,
            onComplete: () => {
                // Swap texture while invisible. Re-apply size so X scale is
                // recomputed from the new texture's native width.
                this.setTexture(targetTexture);
                const targetScaleX = this.cardWidth / this.texture.getSourceImage().width;
                // Phase 2: expand back to target X scale.
                this.scene.tweens.add({
                    targets: this,
                    scaleX: targetScaleX,
                    ease: 'Linear',
                    duration: GameConfig.animation.cardFlipDuration,
                });
            },
        });
    }

    /**
     * Force display size to (cardWidth, cardHeight) using `setDisplaySize`.
     * This recomputes both scaleX and scaleY from the texture's native
     * dimensions, ensuring every card renders at exactly the same size
     * regardless of source texture aspect.
     */
    private applyDisplaySize(): void {
        this.setDisplaySize(this.cardWidth, this.cardHeight);
    }
}
