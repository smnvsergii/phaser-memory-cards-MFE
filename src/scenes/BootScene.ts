import Phaser from 'phaser';

/**
 * BootScene is the first scene. It waits for the web fonts to be ready,
 * then hands control to PreloadScene.
 *
 * Why wait for fonts here: Phaser renders text to a canvas immediately,
 * so if Cinzel hasn't loaded yet the HUD/popup would draw in a fallback
 * serif and never refresh. Awaiting `document.fonts` avoids that.
 */
export class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    create(): void {
        void this.waitForFonts().then(() => this.scene.start('Preload'));
    }

    private async waitForFonts(): Promise<void> {
        try {
            await Promise.all([
                document.fonts.load('700 16px "Cinzel"'),
                document.fonts.load('600 16px "Cinzel"'),
                document.fonts.load('700 16px "Cinzel Decorative"'),
            ]);
            await document.fonts.ready;
        } catch {
            // If the Font Loading API isn't available, proceed anyway —
            // text will fall back to a serif font.
        }
    }
}
