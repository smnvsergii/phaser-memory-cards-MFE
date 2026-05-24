/**
 * GameScene — основная игровая сцена. Отвечает за геймплей:
 * раскладка карт, обработка кликов, таймер, рекорды.
 *
 * Загрузка ассетов вынесена в PreloadScene, поэтому здесь — только логика.
 */
class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.timeout = GameConfig.timeout;
        this.createSounds();
        this.createTimer();
        this.createBackground();
        this.createText();
        this.createCards();
        this.start();
    }

    // --- Setup ---

    createBackground() {
        this.add.sprite(0, 0, 'bg')
            .setOrigin(0, 0)
            .setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
    }

    createText() {
        const { ui, paddingX } = GameConfig;
        this.timeoutText = this.add.text(paddingX, ui.timerY, '', {
            font: ui.timerFont,
            fill: ui.timerColor,
        });
        this.bestTimeText = this.add.text(paddingX + ui.bestTimeOffsetX, ui.timerY, '', {
            font: ui.timerFont,
            fill: ui.bestTimeColor,
        });
        this.updateBestTimeText();
    }

    createSounds() {
        this.sounds = {
            card: this.sound.add('card'),
            complete: this.sound.add('complete'),
            success: this.sound.add('success'),
            theme: this.sound.add('theme'),
            timeout: this.sound.add('timeout'),
        };
        this.sounds.theme.play({ volume: GameConfig.themeVolume });
    }

    createTimer() {
        this.time.addEvent({
            delay: 1000,
            callback: this.onTimerTick,
            callbackScope: this,
            loop: true,
        });
    }

    createCards() {
        this.cards = [];
        for (const value of GameConfig.cards) {
            for (let i = 0; i < 2; i++) {
                this.cards.push(new Card(this, value));
            }
        }
        this.input.on('gameobjectdown', this.onCardClicked, this);
    }

    // --- Game flow ---

    start() {
        this.timeout = GameConfig.timeout;
        this.openedCard = null;
        this.openedCardsCount = 0;
        this.initCards();
        this.showCards();
    }

    initCards() {
        const positions = this.getCardsPositions();
        this.cards.forEach((card) => card.init(positions.pop()));
    }

    showCards() {
        this.cards.forEach((card) => {
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay,
            });
        });
    }

    onCardClicked(pointer, card) {
        if (card.opened) {
            return false;
        }

        this.sounds.card.play();

        if (this.openedCard) {
            if (this.openedCard.value === card.value) {
                // совпадение
                this.sounds.success.play();
                this.openedCard = null;
                ++this.openedCardsCount;
            } else {
                // не совпало — закрываем предыдущую
                this.openedCard.close();
                this.openedCard = card;
            }
        } else {
            this.openedCard = card;
        }

        card.open();

        if (this.openedCardsCount === this.cards.length / 2) {
            this.sounds.complete.play();
            const elapsed = GameConfig.timeout - this.timeout;
            this.saveBestTime(elapsed);
            this.start();
        }
    }

    onTimerTick() {
        this.timeoutText.setText('Time: ' + this.timeout);
        if (this.timeout <= 0) {
            this.sounds.timeout.play();
            this.start();
        } else {
            --this.timeout;
        }
    }

    // --- Layout ---

    getCardsPositions() {
        const positions = [];
        const cellWidth = GameConfig.cardWidth + GameConfig.cardGap;
        const cellHeight = GameConfig.cardHeight + GameConfig.cardGap;
        const availableWidth = this.sys.game.config.width - 2 * GameConfig.paddingX;
        const availableHeight =
            this.sys.game.config.height - GameConfig.paddingTop - GameConfig.paddingBottom;
        const offsetX =
            GameConfig.paddingX + (availableWidth - cellWidth * GameConfig.cols) / 2 + cellWidth / 2;
        const offsetY =
            GameConfig.paddingTop + (availableHeight - cellHeight * GameConfig.rows) / 2 + cellHeight / 2;

        let id = 0;
        for (let row = 0; row < GameConfig.rows; row++) {
            for (let col = 0; col < GameConfig.cols; col++) {
                ++id;
                positions.push({
                    delay: id * GameConfig.animation.cardMoveStaggerDelay,
                    x: offsetX + col * cellWidth,
                    y: offsetY + row * cellHeight,
                });
            }
        }
        return Phaser.Utils.Array.Shuffle(positions);
    }

    // --- Best time persistence ---

    getBestTime() {
        const value = localStorage.getItem(GameConfig.storage.bestTimeKey);
        return value === null ? null : parseInt(value, 10);
    }

    saveBestTime(seconds) {
        const best = this.getBestTime();
        if (best === null || seconds < best) {
            localStorage.setItem(GameConfig.storage.bestTimeKey, String(seconds));
            this.updateBestTimeText();
        }
    }

    updateBestTimeText() {
        const best = this.getBestTime();
        this.bestTimeText.setText(best !== null ? `Best: ${best}s` : 'Best: -');
    }
}
