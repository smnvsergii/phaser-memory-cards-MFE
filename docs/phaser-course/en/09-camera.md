# Chapter 9. Camera

The camera in Phaser is a **window into the game world**. It defines what part of the world the player sees, and it can scroll, zoom, shake, and fade.

Every scene has a **main camera** — `this.cameras.main`. You can create extra ones too.

## Basic API

```js
const cam = this.cameras.main;

// Scroll (world offset)
cam.scrollX = 100;
cam.scrollY = 200;
cam.setScroll(100, 200);

// Center — where the camera is looking
cam.centerOn(800, 600);

// Zoom
cam.zoom = 2;
cam.setZoom(2);

// Rotate the entire scene
cam.rotation = Math.PI / 4;
cam.setRotation(0.5);

// Angle in degrees
cam.setAngle(45);

// Background color (overrides config.backgroundColor)
cam.setBackgroundColor('#0f0f23');

// Viewport size (the on-screen area the camera occupies)
cam.setSize(800, 600);
cam.setPosition(0, 0);     // viewport position on screen
cam.setViewport(0, 0, 800, 600);
```

## Bounds — world boundaries

Limit where the camera can scroll:

```js
this.cameras.main.setBounds(0, 0, 2000, 1500);
```

The camera won't move outside this rectangle.

## Follow — tracking an object

A platformer classic:

```js
this.cameras.main.startFollow(player);

// With parameters
this.cameras.main.startFollow(player, true, 0.1, 0.1);
//                                     ^ smoothing ^lerpX ^lerpY (0..1)

// With offset
this.cameras.main.setFollowOffset(-100, 0);

// Stop
this.cameras.main.stopFollow();
```

**Lerp** (0..1) — how quickly the camera catches up to the target. 1 = instant (rigid), 0.05 = very smooth. Not used in slots.

## Camera effects

### Shake

```js
this.cameras.main.shake(
  500,    // duration ms
  0.01,   // intensity (0..1)
  false,  // force — restart if already shaking
  callback
);
```

Perfect for a **big-win feel** in a slot.

### Flash

```js
this.cameras.main.flash(500, 255, 255, 255);
//                  duration  R    G    B
```

Used for the flash effect on a mega-win.

### Fade

```js
this.cameras.main.fadeOut(1000, 0, 0, 0);  // to black
this.cameras.main.fadeIn(1000, 0, 0, 0);   // from black

// With a callback
this.cameras.main.fadeOut(500);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

### Zoom effects with tween

You can animate `camera.zoom` itself via a tween:

```js
this.tweens.add({
  targets: this.cameras.main,
  zoom: 1.5,
  duration: 1000,
  yoyo: true,
  ease: 'Sine.easeInOut'
});
```

Useful for zooming onto a winning line in a slot.

### Pan — moving toward a point

```js
this.cameras.main.pan(
  800, 400,    // where (x, y in world)
  2000,        // duration
  'Power2',    // ease
  false,       // force
  callback
);
```

## Multiple cameras

You can create several cameras. Each one sees its own region and can ignore certain objects.

```js
// An additional minimap in the corner
const minimap = this.cameras.add(10, 10, 200, 150);
minimap.setZoom(0.2);
minimap.setBackgroundColor('#000');
minimap.setBounds(0, 0, 2000, 1500);
minimap.startFollow(player);

// A UI camera that doesn't move with scroll
const uiCam = this.cameras.add(0, 0, 1280, 720);
uiCam.setScroll(0, 0);

// Specify which camera sees which objects
mainCamera.ignore(uiObjects);  // main camera doesn't see UI
uiCam.ignore(worldObjects);    // UI camera doesn't see the world
```

⚠️ **Important:** a UI scene (as a separate scene) is simpler than juggling two cameras. Use multiple cameras only when you genuinely need multiple viewports (minimap, split-screen).

## scrollFactor — parallax

`scrollFactor` defines how much an object moves with the camera scroll. It lets you do parallax (a background that moves slower than the foreground).

```js
const farBg = this.add.image(0, 0, 'far-bg').setScrollFactor(0.2);
const midBg = this.add.image(0, 0, 'mid-bg').setScrollFactor(0.5);
const player = this.add.sprite(0, 0, 'player');  // scrollFactor = 1 by default

// UI — doesn't move
const score = this.add.text(0, 0, 'Score').setScrollFactor(0);
```

## Camera in a slot game — real-world scenarios

### Scenario 1. Shake on big-win

```js
function onBigWin() {
  this.cameras.main.shake(800, 0.005);
  this.cameras.main.flash(300, 255, 255, 200);
  this.audio.sfx('big-win');
}
```

### Scenario 2. Fade transition into a bonus game

```js
function enterBonus() {
  this.cameras.main.fadeOut(800, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('BonusScene');
  });
}
```

### Scenario 3. Zoom on a win line

```js
function focusOnWinLine(centerX, centerY) {
  this.tweens.add({
    targets: this.cameras.main,
    zoom: 1.4,
    scrollX: centerX - this.scale.width / 2,
    scrollY: centerY - this.scale.height / 2,
    duration: 600,
    ease: 'Cubic.easeInOut'
  });

  this.time.delayedCall(2500, () => {
    this.tweens.add({
      targets: this.cameras.main,
      zoom: 1,
      scrollX: 0,
      scrollY: 0,
      duration: 600
    });
  });
}
```

### Scenario 4. Mega-win — a chain of effects

```js
function megaWinSequence() {
  const cam = this.cameras.main;

  // 1. Zoom-in
  this.tweens.add({ targets: cam, zoom: 1.2, duration: 500, yoyo: true });

  // 2. Flash
  cam.flash(400, 255, 215, 0); // golden flash

  // 3. Shake
  this.time.delayedCall(500, () => cam.shake(1500, 0.008));
}
```

## Camera events

```js
const cam = this.cameras.main;
cam.on('camerafadeincomplete', () => console.log('faded in'));
cam.on('camerafadeoutcomplete', () => console.log('faded out'));
cam.on('cameraflashcomplete', () => console.log('flash done'));
cam.on('camerashakecomplete', () => console.log('shake done'));
cam.on('camerapancomplete', () => console.log('pan done'));
cam.on('camerazoomcomplete', () => console.log('zoom done'));
```

## Coordinates: world vs screen

```js
// Convert screen coordinates to world coordinates
const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

// pointer.worldX, pointer.worldY — same thing
```

## RoundPixels — pixel sharpness

When zooming you can get sub-pixel artifacts. If the game is pixel art:

```js
this.cameras.main.roundPixels = true;
```

Or in the config:
```js
render: { roundPixels: true, pixelArt: true }
```

## Pitfalls

| Issue | Fix |
|---|---|
| Object not visible after `setBounds` | The object is outside the bounds — check the coordinates |
| UI scrolls with the camera | `setScrollFactor(0)` on UI objects |
| Shake gets "stuck" | After `shake` the state always resets, but if you call it again — pass `force=true` |
| Zoom clips the edges | The camera zooms from the viewport center — check `setBounds` |
| Camera jitters when following | Lower lerp to 0.05–0.1 for smoothing |

---

## ✅ Exercise 9

1. Load `assets/sprites/background.webp` full-screen. Place 5 cards in the center.
2. Pressing **space** — `cameras.main.shake(500, 0.01)`.
3. Pressing **F** — `cameras.main.flash(300, 255, 255, 0)` (yellow flash).
4. Pressing **Z** — animate `zoom` from 1 to 1.5 and back via a tween (yoyo).
5. **Bonus:** on clicking a card:
   - The camera smoothly pans to that card (via `pan`)
   - Zooms to 1.3
   - After 1 sec — returns to 1 and the center

[Chapter 10. Scale Manager](./10-scale-manager.md)
