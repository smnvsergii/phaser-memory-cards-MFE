# Chapter 11. Particle System — particles and effects

Particles are lots of small sprites that move, change color, and fade away. They're used for:
- Fire, smoke, sparks
- Confetti on a win in a slot
- Magic effects
- Snow, rain
- Explosions and impacts

In Phaser 3.60+ the particle API was **completely rewritten**. The old `createEmitter` is deprecated.

## Basic example

```js
// 1. Load a texture (any small picture)
this.load.image('spark', 'assets/sprites/spark.png');

// 2. Create an emitter
const emitter = this.add.particles(400, 300, 'spark', {
  speed: 100,
  lifespan: 1000,
  scale: { start: 0.5, end: 0 },
  blendMode: 'ADD',
  frequency: 50
});
```

`this.add.particles(x, y, textureKey, config)` — a ready-to-use emitter on the scene.

## Configuration — all the main parameters

```js
this.add.particles(x, y, 'particle', {
  // === Lifetime ===
  lifespan: 1000,                    // ms per particle
  lifespan: { min: 500, max: 1500 },

  // === Spawn rate ===
  frequency: 100,                    // ms between particles; -1 = explode only
  quantity: 1,                       // particles per emit

  // === Movement speed ===
  speed: 100,                        // fixed
  speed: { min: 50, max: 150 },      // random
  speedX: { min: -50, max: 50 },     // per axis
  speedY: -200,

  // === Launch angle ===
  angle: { min: 0, max: 360 },       // in all directions
  angle: { min: -100, max: -80 },    // up with a spread

  // === Gravity ===
  gravityY: 200,
  gravityX: 0,

  // === Size ===
  scale: 1,
  scale: { start: 1, end: 0 },                  // from 1 to 0
  scale: { start: 1, end: 0, ease: 'Power2' },
  scale: { min: 0.5, max: 1 },                  // random

  // === Opacity ===
  alpha: { start: 1, end: 0 },

  // === Color (tint) ===
  tint: 0xff0000,
  tint: [0xff0000, 0x00ff00, 0x0000ff],         // random from list

  // === Rotation ===
  rotate: { start: 0, end: 360 },
  rotate: { min: 0, max: 360 },

  // === Blend mode ===
  blendMode: 'ADD',                  // 'NORMAL', 'ADD', 'MULTIPLY', 'SCREEN'

  // === Spawn zone ===
  emitZone: {
    type: 'edge',
    source: new Phaser.Geom.Rectangle(0, 0, 100, 100),
    quantity: 32
  },

  // === Death zone (particles disappear when crossing it) ===
  deathZone: {
    type: 'onLeave',
    source: new Phaser.Geom.Rectangle(-100, -100, 200, 200)
  },

  // === Frame (when using an atlas) ===
  frame: 'spark.png',
  frame: ['spark.png', 'star.png'],

  // === Start emitting immediately or not ===
  emitting: true                      // false = emitter created but silent
});
```

## Controlling the emitter

```js
const emitter = this.add.particles(0, 0, 'spark', { ... });

// Start/stop
emitter.start();
emitter.stop();
emitter.pause();
emitter.resume();

// One burst of N particles (instead of a continuous stream)
emitter.explode(50);            // 50 particles
emitter.explode(50, x, y);      // at the given point

// Move the emitter
emitter.setPosition(x, y);

// Change parameters on the fly
emitter.setSpeed(200);
emitter.setLifespan(500);
emitter.setScale(2);

// Destroy
emitter.destroy();
```

## Following an object

```js
const player = this.add.sprite(100, 100, 'player');

const emitter = this.add.particles(0, 0, 'spark', {
  follow: player,                // particles spawn at player's position
  followOffset: { x: 0, y: -20 },
  ...
});
```

Perfect for a trail behind a magic symbol, a rocket, a bonus object.

## Spawn zones (emitZone)

### Edge — particles spawn along the outline

```js
emitZone: {
  type: 'edge',
  source: new Phaser.Geom.Circle(0, 0, 100),
  quantity: 64
}
```

You get a "ring" of particles.

### Random — anywhere inside a shape

```js
emitZone: {
  type: 'random',
  source: new Phaser.Geom.Rectangle(-50, -50, 100, 100)
}
```

## Real-world examples

### Win confetti

```js
function showWinConfetti(scene, x, y) {
  scene.add.particles(x, y, 'particle', {
    speed: { min: 200, max: 400 },
    angle: { min: 240, max: 300 },         // up with a spread
    scale: { start: 1, end: 0 },
    rotate: { start: 0, end: 360 },
    lifespan: 2000,
    gravityY: 300,
    quantity: 5,
    frequency: 50,
    duration: 1500,                        // emitter lives for 1.5s
    tint: [0xff0080, 0x00ff80, 0x80ff00, 0xffff00, 0x80ffff]
  });
}
```

### Twinkles/stars across the background

```js
this.add.particles(0, 0, 'star', {
  x: { min: 0, max: 1280 },
  y: { min: 0, max: 720 },
  scale: { start: 0, end: 1, ease: 'Sine.easeOut' },
  alpha: { start: 0, end: 1, yoyo: true },
  lifespan: 3000,
  frequency: 200,
  blendMode: 'ADD'
});
```

### Star burst on mega-win

```js
function megaWinExplode(scene, x, y) {
  scene.add.particles(x, y, 'star', {
    speed: { min: 300, max: 600 },
    angle: { min: 0, max: 360 },
    scale: { start: 1.5, end: 0 },
    rotate: { min: 0, max: 360 },
    lifespan: 1500,
    blendMode: 'ADD',
    tint: 0xffd700,
    emitting: false
  }).explode(80);
}
```

### Engine smoke

```js
const smoke = this.add.particles(0, 0, 'smoke', {
  follow: rocket,
  followOffset: { x: 0, y: 30 },
  speedY: { min: 50, max: 100 },
  speedX: { min: -20, max: 20 },
  scale: { start: 0.5, end: 2 },
  alpha: { start: 0.8, end: 0 },
  lifespan: 800,
  frequency: 20,
  blendMode: 'NORMAL'
});
```

### A trail along a winning line

```js
function trailAlongLine(scene, points) {
  // points = [{x:100,y:200}, {x:200,y:200}, ...]
  let i = 0;
  scene.time.addEvent({
    delay: 100,
    repeat: points.length - 1,
    callback: () => {
      const p = points[i++];
      scene.add.particles(p.x, p.y, 'spark', {
        speed: 30,
        scale: { start: 0.6, end: 0 },
        lifespan: 600,
        blendMode: 'ADD',
        emitting: false
      }).explode(8);
    }
  });
}
```

## Performance

Particles are **lots of objects**. Overdo it and the FPS will drop even on desktop.

### Rules:

1. **No more than 200-300 particles at once** on mid-low devices.
2. Use **small** textures (16×16, 32×32).
3. **`blendMode: 'ADD'`** is pretty, but the texture must have a transparent background.
4. One emitter with a high `quantity` is better than 10 emitters with low ones.
5. **Don't create emitters in `update()`** — only in response to events.
6. Use `duration` so the emitter stops itself.
7. For static particles (background stars) — a single `RenderTexture` is better.

## Particles in the slot industry

Pragmatic Play, NetEnt, Push Gaming use particles heavily:
- Confetti on big-win
- Light rings around a wild symbol
- Sparks when a reel stops on a bonus symbol
- A "rain" of coins on a super-win
- Magic trails when free spins trigger

Most of these effects are done with **particles + Spine**, sometimes with prefab pre-rendered animations.

## Important: one emitter — many particles

This is **batch rendering**. All particles from the same emitter are drawn in a single draw call (if the texture is one). So 100 particles from one emitter ≠ 100 separate Sprite objects in performance — particles are much cheaper.

---

## ✅ Exercise 11

1. Load a small image (32×32) — a star, a spark, a dot.
2. On a click anywhere — burst 30 particles in all directions (`explode`), gold colored.
3. Build a continuous stream of particles from the bottom of the screen upward (like rising bubbles).
4. Build a mouse-cursor trail: an emitter with `follow: pointer` and a low `frequency`.
5. **Bonus:** on a click — set off a "confetti salute": 5 emitters in different spots with different colors, each doing explode(50). After a second they all disappear.

[Chapter 12. Physics](./12-physics.md)
