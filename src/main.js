/**
 * Entry point. Creates a game instance and registers all scenes.
 * and starts from BootScene.
 */
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    scene: [BootScene, PreloadScene, GameScene],
});
