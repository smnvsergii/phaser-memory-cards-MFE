# Глава 12. Фізика

Phaser підтримує **два фізичні рушії**:

1. **Arcade Physics** — простий, швидкий, AABB (axis-aligned bounding boxes). Тисячі об'єктів на екрані без проблем.
2. **Matter.js** — повноцінна фізика твердих тіл: обертання, складні форми, ланцюги, мотузки.

**Для слотів фізика зазвичай не потрібна.** Але знати основи корисно — знадобиться для інших проєктів і можна зробити "падаючі монети" при виграші.

У цій главі докладно — Arcade. Matter — оглядово.

## Увімкнення Arcade Physics

У config:

```js
const config = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },     // у пікселях/сек²
      debug: false             // відмалювання хітбоксів
    }
  }
};
```

## Створення фізичних об'єктів

```js
// Спрайт із фізикою
const player = this.physics.add.sprite(100, 100, 'player');

// Image з фізикою
const ball = this.physics.add.image(200, 200, 'ball');

// Існуючий об'єкт → додати фізику
const obj = this.add.image(0, 0, 'obj');
this.physics.add.existing(obj);

// Група фізичних об'єктів
const enemies = this.physics.add.group();
const e = enemies.create(300, 100, 'enemy');
```

## API фізичного тіла

Після створення в об'єкта з'являється властивість `body` — це його фізичне тіло:

```js
// Швидкість
player.body.setVelocity(100, 200);
player.body.setVelocityX(150);
player.body.setVelocityY(-300);

// Гравітація (своя для цього об'єкта)
player.body.setGravityY(500);
player.body.allowGravity = false;

// Уповільнення (drag)
player.body.setDrag(100, 100);

// Відскок
player.body.setBounce(0.8, 0.8);   // 0..1, 1 = ідеальний відскок

// Розмір хітбокса
player.body.setSize(32, 64);
player.body.setOffset(0, 0);
player.body.setCircle(20);          // круглий хітбокс

// Іммобілізація (об'єкт існує, але не рухається)
player.body.setImmovable(true);

// Межі світу — об'єкт не може за них вийти
player.body.setCollideWorldBounds(true);
```

## Межі світу (world bounds)

```js
// За замовчуванням = розмір гри
this.physics.world.setBounds(0, 0, 1280, 720);

// Об'єкт "відскакує" від меж
player.setCollideWorldBounds(true);
player.setBounce(1);

// Тільки певні сторони
this.physics.world.setBoundsCollision(true, true, true, false);
//                                    L     R     U     D
```

## Колізії та перетини

### `collide` — реальне зіткнення (з імпульсом)

```js
this.physics.add.collider(player, walls);

// З коллбеком
this.physics.add.collider(player, enemy, (p, e) => {
  console.log('Hit!');
  e.destroy();
});

// Група vs група
this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
  bullet.destroy();
  enemy.destroy();
});
```

Об'єкти після collider **відштовхуються** одне від одного, зупиняються.

### `overlap` — перетин (без фізики)

```js
this.physics.add.overlap(player, coins, (player, coin) => {
  coin.destroy();
  this.score += 10;
});
```

`overlap` не зупиняє об'єкти, просто детектує перетин. Використовуй для тригерів (зібрати монетку, увійти в зону).

### Окрема перевірка (без постійного collider)

```js
update() {
  if (this.physics.overlap(player, enemy)) {
    // Зараз перетинаються
  }
}
```

## Групи та фізика

```js
// Група динамічна (рухаються під фізикою)
const fruits = this.physics.add.group({
  key: 'apple',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 },
  bounceY: 0.6,
  collideWorldBounds: true
});

// Група статична (не рухається, для платформ)
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```

Динамічна vs статична:
- Динамічна — рухається, перевіряється кожен кадр
- Статична — ніколи не рухається, перевіряється як перешкода

## Повний приклад: маленький платформер

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

    // Платформи
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Гравець
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Анімації
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

    // Зірки
    this.stars = this.physics.add.group({
      key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate((c) => c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    // Колізії
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Керування
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

Це класичний туторіал Phaser — обов'язково збери його руками.

## Перевірка стану тіла

```js
player.body.touching.down       // торкається чогось знизу
player.body.touching.up
player.body.touching.left
player.body.touching.right

player.body.blocked.down        // упирся в межу світу
player.body.blocked.up

player.body.velocity.x          // поточна швидкість
player.body.velocity.y

player.body.onFloor()           // на землі
player.body.onWall()
```

## Дебаг

Увімкни `debug: true` у config:

```js
physics: {
  default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: true
  }
}
```

Побачиш хітбокси та вектори швидкостей. Незамінне при налагодженні.

Увімкнути/вимкнути на льоту:
```js
this.physics.world.drawDebug = true;
this.physics.world.debugGraphic.clear();   // очистити
```

## Matter.js — коротко

Коли потрібні обертання, реалістична фізика, ланцюги, шарніри — використовуй Matter.

```js
// config
physics: {
  default: 'matter',
  matter: {
    gravity: { y: 1 },
    debug: true
  }
}

// Створення
const ball = this.matter.add.image(400, 100, 'ball');
ball.setCircle();
ball.setBounce(0.9);
ball.setFriction(0.005);

// Constraints (з'єднання)
this.matter.add.constraint(ball1, ball2, 100);

// Композитні тіла (наприклад, машина)
const car = this.matter.add.fromVertices(x, y, 'car', vertices);
```

Matter важчий за Arcade, але красивіший.

## Чи можна використовувати фізику для слота

Прямо для барабанів — ні. Але **опосередковано корисно**:

- "Падаючі монети" при виграші (Arcade — десятки спрайтів із гравітацією)
- Бонус-ігри типу "Plinko" (Matter — кулька відскакує від штирів)
- "Crash"-механіки
- Drag-міні-ігри з фізикою

## Підводні камені

| Проблема | Рішення |
|---|---|
| Об'єкт застрягає в стіні | Зменш швидкість або використай `body.checkCollision` |
| Швидкість залежить від FPS | Phaser використовує deltaTime — фізика fps-independent |
| Хітбокс не збігається зі спрайтом | `body.setSize()` + `body.setOffset()` |
| Об'єкт "провалюється" вниз | Увімкни `setCollideWorldBounds` або постав підлогу |
| Багато колізій гальмують | Використовуй групи + spatial partitioning вбудовано в Arcade |
| Tunneling (швидкі об'єкти пролітають крізь) | Увімкни `physics.arcade.useTree = true` або встанови `ccd` для Matter |

---

## ✅ Вправа 12

1. Зроби "коробку" — статичні платформи по краях екрана і підлогу.
2. За кліком у будь-якій точці — створюй кульку (Image з фізикою), gravity вниз, bounce 0.8.
3. Кульки падають і відскакують від підлоги та стін.
4. Зроби 5 таких кульок одночасно (group). Між собою вони теж мають коллайдитися.
5. **Бонус:** додай падіння "монет" при натисненні пробілу — 50 монет з різною швидкістю, гравітацією. Це буде основа ефекту "виграш" для слота.

[Глава 13. Архітектура та оптимізація](./13-architecture.md)
