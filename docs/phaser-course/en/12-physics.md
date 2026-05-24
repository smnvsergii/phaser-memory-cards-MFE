# Chapter 12. Physics

Phaser supports **two physics engines**:

1. **Arcade Physics** — simple, fast, AABB (axis-aligned bounding boxes). Thousands of objects on screen, no problem.
2. **Matter.js** — full rigid-body physics: rotation, complex shapes, chains, ropes.

**Slots usually don't need physics.** But knowing the basics is helpful — useful for other projects, and you can build "falling coins" for a win.

This chapter goes deep on Arcade. Matter — overview only.

## Enabling Arcade Physics

In the config:

```js
const config = {
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },     // pixels/sec²
      debug: false             // draw hitboxes
    }
  }
};
```

## Creating physics objects

```js
// Sprite with physics
const player = this.physics.add.sprite(100, 100, 'player');

// Image with physics
const ball = this.physics.add.image(200, 200, 'ball');

// Existing object → add physics
const obj = this.add.image(0, 0, 'obj');
this.physics.add.existing(obj);

// Group of physics objects
const enemies = this.physics.add.group();
const e = enemies.create(300, 100, 'enemy');
```

## Physics body API

After creation, the object has a `body` property — its physics body:

```js
// Velocity
player.body.setVelocity(100, 200);
player.body.setVelocityX(150);
player.body.setVelocityY(-300);

// Gravity (own gravity for this object)
player.body.setGravityY(500);
player.body.allowGravity = false;

// Drag (slow-down)
player.body.setDrag(100, 100);

// Bounce
player.body.setBounce(0.8, 0.8);   // 0..1, 1 = perfect bounce

// Hitbox size
player.body.setSize(32, 64);
player.body.setOffset(0, 0);
player.body.setCircle(20);          // circular hitbox

// Immovable (the object exists but doesn't move)
player.body.setImmovable(true);

// World bounds — the object can't leave them
player.body.setCollideWorldBounds(true);
```

## World bounds

```js
// By default = the game size
this.physics.world.setBounds(0, 0, 1280, 720);

// Object "bounces" off the bounds
player.setCollideWorldBounds(true);
player.setBounce(1);

// Only certain sides
this.physics.world.setBoundsCollision(true, true, true, false);
//                                    L     R     U     D
```

## Collisions and overlaps

### `collide` — actual collision (with impulse)

```js
this.physics.add.collider(player, walls);

// With a callback
this.physics.add.collider(player, enemy, (p, e) => {
  console.log('Hit!');
  e.destroy();
});

// Group vs group
this.physics.add.collider(bullets, enemies, (bullet, enemy) => {
  bullet.destroy();
  enemy.destroy();
});
```

After a collider, objects **push each other away** and stop.

### `overlap` — intersection (no physics response)

```js
this.physics.add.overlap(player, coins, (player, coin) => {
  coin.destroy();
  this.score += 10;
});
```

`overlap` doesn't stop objects, just detects intersection. Useful for triggers (collect a coin, enter a zone).

### One-off check (without a permanent collider)

```js
update() {
  if (this.physics.overlap(player, enemy)) {
    // Currently overlapping
  }
}
```

## Groups and physics

```js
// Dynamic group (moves under physics)
const fruits = this.physics.add.group({
  key: 'apple',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70 },
  bounceY: 0.6,
  collideWorldBounds: true
});

// Static group (doesn't move, for platforms)
const platforms = this.physics.add.staticGroup();
platforms.create(400, 568, 'ground').setScale(2).refreshBody();
```

Dynamic vs static:
- Dynamic — moves, checked every frame
- Static — never moves, treated as an obstacle

## Full example: a tiny platformer

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

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    // Player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Animations
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

    // Stars
    this.stars = this.physics.add.group({
      key: 'star', repeat: 11, setXY: { x: 12, y: 0, stepX: 70 }
    });
    this.stars.children.iterate((c) => c.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

    // Collisions
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    // Controls
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

This is the classic Phaser tutorial — make sure to build it by hand.

## Body state checks

```js
player.body.touching.down       // touching something below
player.body.touching.up
player.body.touching.left
player.body.touching.right

player.body.blocked.down        // hit a world boundary
player.body.blocked.up

player.body.velocity.x          // current velocity
player.body.velocity.y

player.body.onFloor()           // on the ground
player.body.onWall()
```

## Debug

Enable `debug: true` in the config:

```js
physics: {
  default: 'arcade',
  arcade: {
    gravity: { y: 300 },
    debug: true
  }
}
```

You'll see hitboxes and velocity vectors. Indispensable when debugging.

Toggling at runtime:
```js
this.physics.world.drawDebug = true;
this.physics.world.debugGraphic.clear();   // clear
```

## Matter.js — quick overview

When you need rotation, realistic physics, chains, or joints — use Matter.

```js
// config
physics: {
  default: 'matter',
  matter: {
    gravity: { y: 1 },
    debug: true
  }
}

// Creation
const ball = this.matter.add.image(400, 100, 'ball');
ball.setCircle();
ball.setBounce(0.9);
ball.setFriction(0.005);

// Constraints
this.matter.add.constraint(ball1, ball2, 100);

// Composite bodies (e.g., a car)
const car = this.matter.add.fromVertices(x, y, 'car', vertices);
```

Matter is heavier than Arcade, but prettier.

## Can physics be used for slots

Directly for the reels — no. But **indirectly useful**:

- "Falling coins" on a win (Arcade — dozens of sprites with gravity)
- Bonus games like "Plinko" (Matter — a ball bouncing off pegs)
- "Crash" mechanics
- Physics-based drag mini-games

## Pitfalls

| Issue | Fix |
|---|---|
| Object stuck in a wall | Lower the speed or use `body.checkCollision` |
| Speed depends on FPS | Phaser uses deltaTime — physics is FPS-independent |
| Hitbox doesn't match the sprite | `body.setSize()` + `body.setOffset()` |
| Object "falls through" downward | Enable `setCollideWorldBounds` or place a floor |
| Lots of collisions are slow | Use groups + Arcade has spatial partitioning built in |
| Tunneling (fast objects pass through) | Enable `physics.arcade.useTree = true` or use ccd in Matter |

---

## ✅ Exercise 12

1. Build a "box" — static platforms around the screen edges and a floor.
2. On a click anywhere — spawn a ball (Image with physics), gravity down, bounce 0.8.
3. The balls fall and bounce off the floor and walls.
4. Make 5 balls at the same time (group). They should also collide with each other.
5. **Bonus:** add "coin" rain on a Spacebar press — 50 coins with different speeds and gravity. This will be the basis of a "win" effect for a slot.

[Chapter 13. Architecture and optimization](./13-architecture.md)
