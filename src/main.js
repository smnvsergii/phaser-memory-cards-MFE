/**
 * Точка входа. Создаёт инстанс игры, регистрирует все сцены
 * и стартует с BootScene.
 */
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    scene: [BootScene, PreloadScene, GameScene],
});
