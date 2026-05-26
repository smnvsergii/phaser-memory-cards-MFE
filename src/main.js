/**
 * Entry point. Creates the MFE bridge, the Phaser game instance, and
 * registers all scenes. The bridge is shared via game.registry so any
 * scene can call `this.registry.get('mfeBridge')`.
 */
const mfeBridge = new MFEBridge({
    mfeId: GameConfig.mfe.id,
    allowedShellOrigins: GameConfig.mfe.allowedShellOrigins,
    protocolVersion: GameConfig.mfe.protocolVersion,
});
mfeBridge.init();

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    // FIT keeps the design resolution and scales to the parent (iframe or window).
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GameConfig.width,
        height: GameConfig.height,
    },
    scene: [BootScene, PreloadScene, GameScene],
});

game.registry.set('mfeBridge', mfeBridge);
