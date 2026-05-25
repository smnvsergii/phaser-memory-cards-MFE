/**
 * BootScene is the first scene. Loads the minimum required for the loader.
 * (for example, progress bar assets), and immediately transfers control to PreloadScene.
 *
 * In real games this is usually: loading asset manifest, initialization
 * analytics, requesting configuration from the server.
 */
class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        // Here you can upload the loader logo/background, if any.
        // Now we can do without separate loader assets.
    }

    create() {
        this.scene.start('Preload');
    }
}
