# Chapter 6. Animations and Tweens

Phaser has **two distinct kinds of animation**, and they often get mixed up:

1. **Animations** — frame-based, for spritesheets: a character walking, effects.
2. **Tweens** — smooth changes of properties (alpha, x, scale, rotation), general-purpose.

For slots you'll mostly want **Tweens** (reel motion, win pulses, number counters).

## Part 1. Tweens — smooth animations

### Basic syntax

```js
this.tweens.add({
  targets: gameObject,
  x: 800,
  y: 400,
  duration: 1000,        // ms
  ease: 'Power2'
});
```

### The full set of parameters

```js
this.tweens.add({
  targets: [obj1, obj2],     // one target or an array
  x: 800,                    // destination (absolute value)
  y: '+=100',                // relative (current + 100)
  alpha: { from: 0, to: 1 }, // with a fixed start
  scale: 2,
  rotation: Math.PI,
  duration: 1000,            // duration
  delay: 200,                // delay before starting
  hold: 0,                   // pause at the end before yoyo/repeat kicks in
  repeat: 3,                 // 3 repeats (4 plays total); -1 = infinite
  repeatDelay: 100,
  yoyo: true,                // return to the starting value
  ease: 'Sine.easeInOut',
  onStart:    () => console.log('start'),
  onUpdate:   (tween, target) => console.log(target.x),
  onComplete: () => console.log('done'),
  onYoyo:     () => console.log('yoyo'),
  onRepeat:   () => console.log('repeat'),
  paused: false              // create paused
});
```

### Easing — smoothing curves

The most common ones:

| Name | Behavior |
|---|---|
| `Linear` | No smoothing |
| `Power0..Power4` | Polynomial |
| `Sine.easeIn/Out/InOut` | Sine smoothing |
| `Quad.easeIn/Out/InOut` | Quadratic |
| `Cubic.easeIn/Out/InOut` | Cubic |
| `Back.easeIn/Out` | Overshoots and returns |
| `Bounce.easeOut` | Bounces (like a ball) |
| `Elastic.easeOut` | Rubber-band feel |
| `Expo.easeIn/Out` | Exponential — sharp start/finish |

**Rules of thumb:**
- `easeIn` — slow start, fast finish
- `easeOut` — fast start, slow finish (smooth landing)
- `easeInOut` — slow start AND finish

For slots:
- Reel start: `Cubic.easeIn` (gradual ramp-up)
- Reel stop: `Back.easeOut` (with a slight overshoot)
- Symbol pop-in: `Back.easeOut` or `Elastic.easeOut`
- Win pulse: `Sine.easeInOut` + `yoyo: true` + `repeat: -1`

### Controlling a tween instance

```js
const tween = this.tweens.add({ ... });

tween.pause();
tween.resume();
tween.stop();
tween.restart();
tween.complete();      // finish instantly
tween.seek(0.5);       // jump to 50%

tween.isPlaying();
tween.isPaused();

tween.setTimeScale(2); // 2x speed
```

### Chains — sequential tweens

```js
this.tweens.chain({
  targets: card,
  tweens: [
    { y: 100, duration: 300, ease: 'Power2' },
    { rotation: Math.PI, duration: 500 },
    { scale: 2, duration: 200, yoyo: true }
  ]
});
```

### Timeline — parallel + sequential

> ⚠️ In Phaser 3.60+ the old Timeline was removed — the new API uses `chain` plus parallel tweens. For complex sequences you're better off with [GSAP](https://greensock.com/gsap/) — it's the de-facto standard in the slot industry.

```js
// In parallel
this.tweens.add({ targets: card1, x: 100, duration: 500 });
this.tweens.add({ targets: card2, x: 200, duration: 500 });

// Sequentially — via onComplete or chain
```

### Per-property tweens with different easings

```js
this.tweens.add({
  targets: ball,
  props: {
    x: { value: 800, duration: 1000, ease: 'Linear' },
    y: { value: 400, duration: 1000, ease: 'Bounce.easeOut' }
  }
});
```

### Counter (animating a number) — for win counters

```js
let win = 0;
this.tweens.addCounter({
  from: 0,
  to: 1500,
  duration: 1500,
  ease: 'Cubic.easeOut',
  onUpdate: (tween) => {
    win = Math.floor(tween.getValue());
    this.winText.setText(`Win: ${win}`);
  }
});
```

This is **must-have** for slots — win counters are always done this way.

## Part 2. Animations — frame-by-frame

Used with **Sprite** (not Image!) and spritesheets/atlases.

### Creating an animation

```js
// In a scene's create()
this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
  frameRate: 10,        // frames per second
  repeat: -1            // -1 = infinite, 0 = once
});

this.anims.create({
  key: 'jump',
  frames: this.anims.generateFrameNames('player', {
    prefix: 'jump_',
    start: 1,
    end: 8,
    suffix: '.png',
    zeroPad: 2          // jump_01, jump_02, ...
  }),
  frameRate: 15,
  repeat: 0
});
```

### Playback

```js
const player = this.add.sprite(100, 100, 'player');
player.play('walk');
player.play('jump', true);  // true = ignore if the same one is already playing

player.anims.pause();
player.anims.resume();
player.anims.stop();
player.anims.stopAfterRepeat();

player.anims.timeScale = 2;  // 2x speed

// Stop and return to the first frame
player.anims.stop();
player.setFrame(0);
```

### Animation events

```js
player.on('animationstart', (anim) => console.log('start', anim.key));
player.on('animationupdate', (anim, frame) => console.log(frame.index));
player.on('animationcomplete', (anim) => console.log('done'));
player.on('animationrepeat', () => console.log('repeat'));

// Just for a specific animation
player.on('animationcomplete-jump', () => console.log('jump done'));
```

### Global vs scene-local animations

```js
// Global (available across all scenes)
this.anims.create({ key: 'walk', ... });

// Local (only in this scene)
this.anims.create({ key: 'walk', ... });
// Actually, all this.anims is the global AnimationManager — keys are shared.
```

⚠️ Animations are **global**. If you create `'walk'` in `GameScene`, it'll also be visible in other scenes. Use unique prefixes: `'player.walk'`, `'enemy.walk'`.

### Using an atlas

```js
this.anims.create({
  key: 'symbol-flash',
  frames: this.anims.generateFrameNames('symbols', {
    prefix: 'flash_',
    start: 1,
    end: 12,
    suffix: '.png'
  }),
  frameRate: 24,
  repeat: 0
});

// When a symbol wins
winningSymbol.play('symbol-flash');
```

## Comparison: when to use what

| Task | What to use |
|---|---|
| Move a symbol from A to B | Tween |
| Spin a reel | Tween (on `tilePositionY` or container `y`) |
| Symbol win animation (flash, pre-rendered frames) | Animation |
| Win text appearing | Tween (alpha + scale + Back.easeOut) |
| Win amount counter | Tween (`addCounter`) |
| Button pulsing | Tween (yoyo + repeat: -1) |
| Screen shake | Camera shake (see chapter 9) |
| Complex skeletal animation (boss, character) | Spine |

## Real-world example: animating a winning symbol

```js
function animateWinningSymbol(symbol) {
  // 1. Highlight via tint
  symbol.setTint(0xffff00);

  // 2. Pulsing (scale)
  this.tweens.add({
    targets: symbol,
    scale: { from: 1, to: 1.3 },
    duration: 400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 3. Wobble back and forth
  this.tweens.add({
    targets: symbol,
    angle: { from: -5, to: 5 },
    duration: 200,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });

  // 4. Optionally — a frame animation on top (if you have a "flash" atlas)
  // const flash = this.add.sprite(symbol.x, symbol.y, 'symbols', 'flash_01.png');
  // flash.play('symbol-flash');
}

function stopWinningAnimation(symbol) {
  this.tweens.killTweensOf(symbol);
  symbol.clearTint();
  symbol.setScale(1);
  symbol.setAngle(0);
}
```

## Real-world example: spinning a reel

```js
class Reel {
  spin() {
    // 1. Ramp-up
    this.tweens.add({
      targets: this.symbolsContainer,
      y: '+=200',
      duration: 300,
      ease: 'Cubic.easeIn'
    });

    // 2. Infinite scroll (via Phaser.Tweens with onUpdate)
    this.spinTween = this.tweens.add({
      targets: this,
      _spinValue: 1,    // dummy
      duration: 100,
      repeat: -1,
      onRepeat: () => {
        this.symbolsContainer.y += this.spinSpeed;
        if (this.symbolsContainer.y > this.cycleHeight) {
          this.symbolsContainer.y -= this.cycleHeight;
          this.recycleSymbols();
        }
      }
    });
  }

  stop(finalSymbols) {
    this.spinTween.stop();
    // Slow down with overshoot
    this.tweens.add({
      targets: this.symbolsContainer,
      y: this.targetY,
      duration: 800,
      ease: 'Back.easeOut'
    });
  }
}
```

## Useful helpers

```js
// Kill all tweens on an object
this.tweens.killTweensOf(obj);

// Is there an active tween on an object?
const exists = this.tweens.getTweensOf(obj).length > 0;

// Globally pause all tweens
this.tweens.pauseAll();
this.tweens.resumeAll();
```

---

## ✅ Exercise 6

1. Create 3 cards in a row. On clicking a card:
   - It "flips" (tween `scaleX: 1 → 0` over 0.25s, then swap the texture, then `scaleX: 0 → 1`)
   - **Hint:** use two sequential tweens via `onComplete` or `chain`.

2. Build a **score counter** with `tweens.addCounter`. On clicking each card, increase the score from its current value by `+100` over 800ms with `Cubic.easeOut`.

3. Build a **pulsing "PLAY" button** — text in the center, infinite scale 1↔1.1 tween with yoyo.

4. **Bonus:** load a spritesheet from any free source (or paint one yourself, 4 frames at 64×64), create the `'spin'` animation, play it on the sprite.

Done — [Chapter 7. Input](./07-input.md).
