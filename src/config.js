/**
 * Игровая конфигурация и константы.
 * Все магические числа собраны здесь, чтобы менять их в одном месте.
 */
const GameConfig = {
    // Размер канваса
    width: 1280,
    height: 720,

    // Сетка карт
    rows: 2,
    cols: 5,
    cards: [1, 2, 3, 4, 5],

    // Размер одной карты при отображении
    cardWidth: 240,
    cardHeight: 140,
    cardGap: 20,

    // Отступы вокруг игрового поля
    paddingX: 40,
    paddingTop: 80,
    paddingBottom: 40,

    // Таймер раунда (секунды)
    timeout: 60,

    // UI
    ui: {
        timerColor: '#ffffff',
        bestTimeColor: '#ffd700',
        timerFont: '36px CurseCasual',
        timerY: 20,
        bestTimeOffsetX: 260,
    },

    // Хранилище
    storage: {
        bestTimeKey: 'memoryCards.bestTime',
    },

    // Анимации
    animation: {
        cardMoveDuration: 250,
        cardFlipDuration: 150,
        cardMoveStaggerDelay: 100,
    },

    // Громкость темы
    themeVolume: 0.1,
};
