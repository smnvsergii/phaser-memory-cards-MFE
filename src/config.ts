/**
 * Game-wide configuration. Plain object literal, no class needed.
 *
 * The game is built around a "design resolution" of 1280x720. The
 * scale manager runs in RESIZE mode — the scene listens for resize
 * events and re-lays out the grid for the current viewport. The
 * design size only fixes the coordinate system, not the canvas.
 */

export const CARD_KEYS = ['diamond', 'crown', 'jackpot', 'cherry'] as const;
export type CardKey = (typeof CARD_KEYS)[number];

export const GameConfig = {
    // Design resolution — used as a reference; actual viewport adapts.
    width: 1280,
    height: 720,

    // 4 pairs = 8 cards laid out in a 2x4 grid on desktop. The actual
    // column count is computed at runtime based on viewport width.
    cards: CARD_KEYS,
    pairs: CARD_KEYS.length,

    // Card aspect (vertical). We don't fix pixel size — at runtime
    // each card is sized to fit a cell of the responsive grid.
    cardAspect: 2 / 3, // width / height
    cardGap: 16,

    // Layout regions. Top/HUD reserves are ratios of viewport height so
    // they track the background logo (which scales with the viewport).
    layout: {
        topReserveRatio: 0.28, // space for the MEMORY FORTUNE logo
        hudReserveRatio: 0.16, // bottom HUD: matches / moves / timer
        hudBarHeight: 110, // HUD bar visual height (clamped)
        sidePadding: 24,
        verticalPadding: 12,
    },

    // Responsive breakpoints (viewport width → number of columns).
    // Always 4 columns; the cards just shrink on narrow viewports.
    grid: {
        breakpoints: [{ minWidth: 0, cols: 4 }],
    },

    // round timer (sec)
    timeout: 90,

    // Brand palette (shared with styles.css).
    colors: {
        gold1: '#fff4b8',
        gold2: '#ffcf5c',
        gold3: '#b86b00',
        purple1: '#8f2cff',
        purple2: '#5a0fb7',
        purple3: '#2b063f',
        whiteWarm: '#fff7df',
    },

    ui: {
        hudFont: '700 28px "Cinzel", serif',
        hudLabelFont: '600 15px "Cinzel", serif',
        hudColor: '#ffcf5c',
        hudLabelColor: '#fff7df',
        popupTitleFont: '700 44px "Cinzel Decorative", "Cinzel", serif',
        popupSubtitleFont: '600 22px "Cinzel", serif',
    },

    storage: {
        bestTimeKey: 'memoryCards.bestTime',
    },

    animation: {
        cardMoveDuration: 250,
        cardFlipDuration: 150,
        cardMoveStaggerDelay: 70,
        winPopupDuration: 320,
    },

    themeVolume: 0.1,

    // MFE / shell integration
    mfe: {
        id: 'memory-cards',
        protocolVersion: 1,
        allowedShellOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    },
} as const;
