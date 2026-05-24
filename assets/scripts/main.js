let config = {
    type: Phaser.AUTO, // webgl or canvas
    width: 1280,
    height: 720,
    rows: 2,
    cols: 5,
    cards: [1, 2, 3, 4, 5],
    cardWidth: 240,
    cardHeight: 140,
    paddingX: 40,
    paddingTop: 80,
    paddingBottom: 40,
    timeout: 60,
    scene: new GameScene()
};

let game = new Phaser.Game(config);