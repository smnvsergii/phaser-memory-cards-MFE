# Глава 12. Физика

Phaser поддерживает **два физических движка**:

1. **Arcade Physics** — простой, быстрый, AABB (axis-aligned bounding boxes). Тысячи объектов на экране без проблем.
2. **Matter.js** — полноценная физика твёрдых тел: вращение, сложные формы, цепи, верёвки.

**Для слотов физика обычно не нужна.** Но знать основы полезно — пригодится для других проектов и можно сделать "падающие монеты" при выигрыше.

В этой главе подробно — Arcade. Matter — обзорно.

## Включение Arcade Physics

В config:

```js
const config = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },     // в пикселях/сек²
      debug: false             // отрисовка хитбоксов
    }
  }
};
```

## Создание физических объектов

```js
// Спрайт с физикой
const player = this.physics.add.sprite(100, 100, 'player');

// Image с физикой
const ball = this.physics.add.image(200, 200, 'ball');

// Существующий объект → добавить физику
const obj = this.add.image(0, 0, 'obj');
this.physics.add.existing(obj);

// Группа физических объектов
const enemies = this.physics.add.group();
const e = enemies.create(300, 100, 'enemy');
```

## API физического тела

После создания у объекта появляется свойство `body` — это его физическое тело:

```js
// Скорость
player.body.setVelocity(100, 200);
player.body.setVelocityX(150);
player.body.setVelocityY(-300);

// Гравитация (своя для этого объекта)
player.body.setGravityY(500);
player.body.allowGravity = false;

// Замедление (drag)
player.body.setDrag(100, 100);

// Отскок
player.body.setBounce(0.8, 0.8);   // 0..1, 1 = идеальный отскок

// Размер хитбокса
player.body.setSize(32, 64);
player.body.setOffset(0, 0);
player.body.setCircle(20);          // круглый хитбокс

// Иммобилизация (объект существует, но не двигается)
player.body.setImmovable(true);

// Границы мира — объект не может за них выйти
player.body.setCollideWorldBounds(true);
```

## Границы мира (world bounds)

```js
// По умолчанию = размер игры
this.physics.world.setBounds(0, 0, 1280, 720);

// Объект "отскакивает" от границ
player.setCollideWorldBounds(true);
player.setBounce(1);

// Только определённые стороны
this.physics.world.setBoundsCollision(true, true, true, false);
//                                    L     R     U     D
```

## Коллизии и пересечения

### `collide` — реальное столкновение (с импульсом)

```js
this.physics.add.collider(player, walls);

// С коллбеком
this.physics.add.collider(player, enemy, (p, e) => {
  console.log('Hit!');
  e.destroy();
});

// Группа vs группа
this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
  bullet.destroy();
  enemy.destroy();
});
```

Объекты после collider **отталкиваются** друг от друга, останавливаются.

### `overlap` — пересечение (без физики)

```js
this.physics.add.overlap(player, coins, (player, coin) => {
  coin.destroy();
  this.score += 10;
});
```

`overlap` не останавливает объекты, просто детектирует пересечение. Использует для триггеров (собрать монетку, войти в зону).

### Отдельная проверка (без постоянного collider)

```js
update() {
  if (this.physics.overlap(player, enemy)) {
    // Сейчас пересекаются
  }
}
```

## Группы и физика

```js
// Группа динамическая (двигаются под физикой)
const fruits = this.physics.add.group({
  key: 'apple',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 },
  bounceY: 0.6,
  collideWorldBounds: true
});

// Группа статическая (не двигается, для платформ)
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```

Динамическая vs статическая:
- Динамическая — двигается, проверяется каждый кадр
- Статическая — никогда не двигается, проверяется как препятствие

## Полный пример: маленький платформер

```js
class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    // Платформы
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Игрок
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Анимации
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10, repeat: -1
    });
    this.anims.create({ key: 'turn', frames: [{ key: 'dude', frame: 4 }], frameRate: 20 });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10, repeat: -1
    });

    // Звёзды
    this.stars = this.physics.add.group({
      key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate((c) => c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    // Коллизии
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Управление
    this.cursors = this.input.keyboard.createCursorKeys();

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', color: '#000' });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }
}
```

Это классический туториал Phaser — обязательно собери его руками.

## Проверка состояния тела

```js
player.body.touching.down       // касается чего-то снизу
player.body.touching.up
player.body.touching.left
player.body.touching.right

player.body.blocked.down        // упёрся в границу мира
player.body.blocked.up

player.body.velocity.x          // текущая скорость
player.body.velocity.y

player.body.onFloor()           // на земле
player.body.onWall()
```

## Дебаг

Включи `debug: true` в config:

```js
physics: {
  default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: true
  }
}
```

Увидишь хитбоксы и векторы скоростей. Незаменимо при отладке.

Включить/выключить на лету:
```js
this.physics.world.drawDebug = true;
this.physics.world.debugGraphic.clear();   // очистить
```

## Matter.js — кратко

Когда нужны вращение, реалистичная физика, цепи, шарниры — используй Matter.

```js
// config
physics: {
  default: 'matter',
  matter: {
    gravity: { y: 1 },
    debug: true
  }
}

// Создание
const ball = this.matter.add.image(400, 100, 'ball');
ball.setCircle();
ball.setBounce(0.9);
ball.setFriction(0.005);

// Constraints (соединения)
this.matter.add.constraint(ball1, ball2, 100);

// Композитные тела (например, машина)
const car = this.matter.add.fromVertices(x, y, 'car', vertices);
```

Matter тяжелее Arcade, но красивее.

## Можно ли использовать физику для слота

Прямо для барабанов — нет. Но **косвенно полезно**:

- "Падающие монеты" при выигрыше (Arcade — десятки спрайтов с гравитацией)
- Бонус-игры типа "Plinko" (Matter — шарик отскакивает от штырей)
- "Crash"-механики
- Драговые мини-игры с физикой

## Подводные камни

| Проблема | Решение |
|---|---|
| Объект застревает в стене | Уменьши скорость или используй `body.checkCollision` |
| Скорость зависит от FPS | Phaser использует deltaTime — физика fps-independent |
| Хитбокс не совпадает с спрайтом | `body.setSize()` + `body.setOffset()` |
| Объект "проваливается" вниз | Включи `setCollideWorldBounds` или поставь пол |
| Много коллизий тормозят | Используй группы + spatial partitioning встроен в Arcade |
| Tunneling (быстрые объекты пролетают сквозь) | Включи `physics.arcade.useTree = true` или ставь `ccd` для Matter |

---

## ✅ Упражнение 12

1. Сделай "коробку" — статичные платформы по краям экрана и пол.
2. По клику в любой точке — создавай шарик (Image с физикой), gravity вниз, bounce 0.8.
3. Шарики падают и отскакивают от пола и стен.
4. Сделай 5 таких шариков одновременно (group). Между собой они тоже должны коллайдиться.
5. **Бонус:** добавь падение "монет" при нажатии пробела — 50 монет с разной скоростью, гравитацией. Это будет основа эффекта "выигрыш" для слота.

[Глава 13. Архитектура и оптимизация](./13-architecture.md)
