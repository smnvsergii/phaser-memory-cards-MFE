const GameConfig = {
    // Canvas
    width: 1280,
    height: 720,

    // Grid of cards
    rows: 2,
    cols: 5,
    cards: [1, 2, 3, 4, 5],

    // one card size
    cardWidth: 240,
    cardHeight: 140,
    cardGap: 20,

    // game space
    paddingX: 40,
    paddingTop: 80,
    paddingBottom: 40,

    // round timer sec
    timeout: 60,

    // UI
    ui: {
        timerColor: '#ffffff',
        bestTimeColor: '#ffd700',
        timerFont: '36px CurseCasual',
        timerY: 20,
        bestTimeOffsetX: 260,
    },

    storage: {
        bestTimeKey: 'memoryCards.bestTime',
    },

    animation: {
        cardMoveDuration: 250,
        cardFlipDuration: 150,
        cardMoveStaggerDelay: 100,
    },

    themeVolume: 0.1,

    // MFE / shell integration
    mfe: {
        id: 'memory-cards',
        protocolVersion: 1,
        // Whitelist of shell origins. Empty = accept any (dev only).
        // Example for production: ['https://shell.example.com']
        allowedShellOrigins: [],
    },
};
