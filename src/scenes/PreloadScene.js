/**
 * PreloadScene — отвечает за загрузку всех игровых ассетов и показывает
 * прогресс-бар. Геймплейные сцены не должны грузить ассеты сами,
 * чтобы старт игры был мгновенным.
 */
class PreloadScene extends Phaser.Scene {
    constructor() {
        super('Preload');
    }

    preload() {
        this.createProgressBar();

        // Спрайты
        this.load.image('bg', 'assets/sprites/background.webp');
        this.load.image('card', 'assets/sprites/card.webp');
        for (const value of GameConfig.cards) {
            this.load.image('card' + value, `assets/sprites/card${value}.webp`);
        }

        // Звуки
        this.load.audio('card', 'assets/sounds/card.mp3');
        this.load.audio('complete', 'assets/sounds/complete.mp3');
        this.load.audio('success', 'assets/sounds/success.mp3');
        this.load.audio('theme', 'assets/sounds/theme.mp3');
        this.load.audio('timeout', 'assets/sounds/timeout.mp3');
    }

    createProgressBar() {
        const { width, height } = this.sys.game.config;
        const barWidth = 400;
        const barHeight = 24;
        const x = (width - barWidth) / 2;
        const y = (height - barHeight) / 2;

        const frame = this.add.graphics();
        frame.lineStyle(2, 0xffffff, 1);
        frame.strokeRect(x, y, barWidth, barHeight);

        const fill = this.add.graphics();
        const label = this.add.text(width / 2, y - 30, 'Loading...', {
            font: '24px monospace',
            fill: '#ffffff',
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            fill.clear();
            fill.fillStyle(0xffffff, 1);
            fill.fillRect(x + 2, y + 2, (barWidth - 4) * value, barHeight - 4);
        });

        this.load.on('complete', () => {
            frame.destroy();
            fill.destroy();
            label.destroy();
        });
    }

    create() {
        this.scene.start('Game');
    }
}
