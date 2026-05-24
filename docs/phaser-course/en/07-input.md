# Chapter 7. Input

In Phaser, input is handled through the **Input Plugin** — `this.input` in every scene. Mouse, touch, keyboard, and gamepad are all supported. On mobile, touches automatically behave like pointer events — you don't need to write separate code.

## Pointer events — the foundation

`Pointer` unifies mouse and touch. A scene-wide event is caught like this:

```js
// Any click/tap on the scene
this.input.on('pointerdown', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Movement
this.input.on('pointermove', (pointer) => {
  console.log(pointer.x, pointer.y);
});

// Release
this.input.on('pointerup', (pointer) => { /* ... */ });
```

The `pointer` object contains:
- `pointer.x`, `pointer.y` — scene coordinates (with scale applied)
- `pointer.worldX`, `pointer.worldY` — world coordinates (with the camera applied)
- `pointer.isDown` — whether it's pressed right now
- `pointer.button` — which mouse button (0 = left, 2 = right)
- `pointer.event` — the original DOM event

## Interactive Game Objects

To let a specific object react to clicks, mark it interactive:

```js
const card = this.add.image(400, 300, 'card');
card.setInteractive();

card.on('pointerdown', () => console.log('Clicked the card'));
card.on('pointerup',   () => console.log('Released'));
card.on('pointerover', () => card.setTint(0xff0000));    // hover-in
card.on('pointerout',  () => card.clearTint());          // hover-out
card.on('pointermove', (pointer) => console.log(pointer.x));
```

### setInteractive() options

```js
card.setInteractive({
  cursor: 'pointer',         // CSS cursor
  pixelPerfect: false,       // alpha pixel test (slow)
  alphaTolerance: 1,         // alpha threshold for pixelPerfect
  draggable: true,           // enable drag&drop
  useHandCursor: true,       // shorthand for cursor: 'pointer'
  hitArea: hitArea,          // custom shape
  hitAreaCallback: callback
});
```

### Custom hit area (click shape)

By default Phaser uses a rectangle around the texture. You can specify a circle, polygon, or any shape:

```js
// Circular click area
const hitArea = new Phaser.Geom.Circle(0, 0, 50);
card.setInteractive(hitArea, Phaser.Geom.Circle.Contains);

// Polygon
const points = [
  new Phaser.Geom.Point(0, 0),
  new Phaser.Geom.Point(100, 0),
  new Phaser.Geom.Point(50, 100)
];
const polygon = new Phaser.Geom.Polygon(points);
sprite.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
```

### Pixel-perfect testing (for "cut-out" sprites)

```js
card.setInteractive({ pixelPerfect: true });
```

⚠️ Expensive — don't use it on lots of objects. Almost never needed for slots.

## Button from a sprite (pattern)

```js
function makeButton(scene, x, y, key, callback) {
  const btn = scene.add.image(x, y, key)
    .setInteractive({ useHandCursor: true });

  btn.on('pointerover', () => btn.setScale(1.05));
  btn.on('pointerout',  () => btn.setScale(1));
  btn.on('pointerdown', () => btn.setScale(0.95));
  btn.on('pointerup',   () => {
    btn.setScale(1.05);
    callback();
  });

  return btn;
}

// Usage
makeButton(this, 640, 600, 'spinBtn', () => this.startSpin());
```

## Drag & Drop

```js
const item = this.add.image(100, 100, 'gem');
item.setInteractive({ draggable: true });

this.input.on('dragstart', (pointer, gameObject) => {
  gameObject.setTint(0x00ff00);
});

this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
  gameObject.x = dragX;
  gameObject.y = dragY;
});

this.input.on('dragend', (pointer, gameObject) => {
  gameObject.clearTint();
});
```

### Drop zones

A region you can "drop" an object into:

```js
const zone = this.add.zone(640, 360, 200, 200).setRectangleDropZone(200, 200);

this.input.on('drop', (pointer, gameObject, dropZone) => {
  console.log('Dropped in the zone');
  gameObject.x = dropZone.x;
  gameObject.y = dropZone.y;
});

this.input.on('dragenter', (pointer, gameObject, dropZone) => {
  // Object entered the zone
});

this.input.on('dragleave', (pointer, gameObject, dropZone) => {
  // Left it
});
```

## Keyboard

### Basic tracking

```js
// Creating keys
this.keyW = this.input.keyboard.addKey('W');
this.keyA = this.input.keyboard.addKey('A');
this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

// In update()
update() {
  if (this.keyW.isDown) this.player.y -= 5;
  if (this.keyA.isDown) this.player.x -= 5;
  if (this.keySpace.isDown) this.shoot();
}
```

### Cursor keys (a ready-made object)

```js
this.cursors = this.input.keyboard.createCursorKeys();

update() {
  if (this.cursors.left.isDown)  this.player.x -= 5;
  if (this.cursors.right.isDown) this.player.x += 5;
  if (this.cursors.up.isDown)    this.player.y -= 5;
  if (this.cursors.down.isDown)  this.player.y += 5;
  if (this.cursors.space.isDown) this.shoot();
}
```

### Key events (single press)

```js
this.input.keyboard.on('keydown-SPACE', () => {
  this.startSpin();
});

this.input.keyboard.on('keyup-ESC', () => {
  this.openMenu();
});

// JustDown — fires once per press, even if held
if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
  this.spin();
}
```

### Key combos

```js
this.input.keyboard.createCombo('CHEAT', { resetOnMatch: true });
this.input.keyboard.on('keycombomatch', (combo) => {
  console.log('Cheat enabled!');
});
```

## Gamepad (optional)

Enable it in the config:
```js
input: { gamepad: true }
```

```js
this.input.gamepad.once('connected', (pad) => {
  console.log('Pad connected:', pad.id);
});

update() {
  const pad = this.input.gamepad.getPad(0);
  if (!pad) return;
  if (pad.left)  this.player.x -= 5;
  if (pad.right) this.player.x += 5;
  if (pad.A)     this.shoot();
  // Analog stick
  this.player.x += pad.leftStick.x * 5;
}
```

## Global input settings

```js
// Always pick the topmost object on click (default false)
this.input.topOnly = true;

// Enable multi-touch (how many fingers at once)
this.input.addPointer(2);  // total 3 pointers (1 default + 2)

// Disable input for the whole scene
this.input.enabled = false;

// Disable on a single object
card.disableInteractive();
card.setInteractive();    // re-enable
```

## Coordinates: screen vs world

```js
this.input.on('pointerdown', (pointer) => {
  // Coordinates in the scene's frame (with scale applied)
  console.log(pointer.x, pointer.y);

  // Coordinates in the "world" (with camera scroll applied)
  console.log(pointer.worldX, pointer.worldY);
});
```

If your camera is static — `x` and `worldX` are the same. When the camera scrolls — they differ.

## Useful patterns for slots

### A SPIN button with states

```js
class SpinButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.bg = scene.add.image(0, 0, 'btn-spin');
    this.label = scene.add.text(0, 0, 'SPIN', { fontSize: '32px' }).setOrigin(0.5);
    this.add([this.bg, this.label]);

    scene.add.existing(this);

    this.bg.setInteractive({ useHandCursor: true });
    this.bg.on('pointerdown', () => this.handlePress());
  }

  setEnabled(enabled) {
    this.bg.input.enabled = enabled;
    this.alpha = enabled ? 1 : 0.5;
  }

  setSpinning(spinning) {
    this.label.setText(spinning ? 'STOP' : 'SPIN');
  }

  handlePress() {
    this.scene.events.emit('spin-button-pressed');
  }
}
```

### Double-click protection

```js
let spinning = false;

spinBtn.on('pointerdown', () => {
  if (spinning) return;
  spinning = true;
  this.startSpin();
});

// On completion
this.events.once('spin-complete', () => {
  spinning = false;
});
```

### Spacebar = SPIN

```js
this.input.keyboard.on('keydown-SPACE', () => {
  if (!this.spinning) this.startSpin();
});
```

## Pitfalls

| Issue | Fix |
|---|---|
| Container clicks don't work | Containers aren't interactive by default — call `setInteractive(new Phaser.Geom.Rectangle(...), Phaser.Geom.Rectangle.Contains)` or make the children interactive instead |
| Clicks "fall through" the UI | Set `this.input.topOnly = true` or use depth |
| Click fires multiple times | `pointerdown` + `pointerup` can run together — use `pointerup` instead |
| Drag jitters | On some browsers you need `event.preventDefault()` — Phaser does this itself, but check the CSS `touch-action: none` |
| Click doesn't work on iOS Safari | Make sure the click area is at least 44×44px (Apple guideline) |

---

## ✅ Exercise 7

1. Create 5 cards in a row. For each one:
   - On hover — `setTint(0xffff00)` + tween scale 1 → 1.1
   - On hover-out — clearTint + scale 1
   - On click — the card flies upward and disappears (tween y -= 200, alpha → 0)

2. Build **drag & drop**: one big card you can drag around the screen.

3. Build a **drop zone** (a 200×200 rectangle in the bottom-right corner). When the card is dropped in the zone — the card stays at the drop point AND a counter increases by 1.

4. Pressing **space** — all the cards return to their starting positions (via tween).

5. **Bonus:** implement a secret code `S-L-O-T` via the keyboard. When the player types it — print "Cheat activated" to the console.

[Chapter 8. Sound](./08-sound.md)
