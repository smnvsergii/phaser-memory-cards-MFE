# Chapter 8. Sound

Sound in Phaser is handled by the **Sound Manager** (`this.sound`). Two backends sit underneath:

- **WebAudio** — modern, recommended. Supports 3D, effects, precise timing.
- **HTML5 Audio** — fallback for older browsers and weak devices.

Phaser **picks WebAudio automatically** when it's available.

## Loading sound

```js
preload() {
  // A single file
  this.load.audio('click', 'assets/sounds/click.mp3');

  // Multiple formats (best supported one is chosen)
  this.load.audio('theme', [
    'assets/sounds/theme.ogg',
    'assets/sounds/theme.mp3',
    'assets/sounds/theme.m4a'
  ]);
}
```

### Which formats are supported

| Format | Support |
|---|---|
| **MP3** | All modern browsers |
| **OGG** | All except old Safari |
| **M4A/AAC** | Safari, Chrome |
| **WEBM** | Chrome, Firefox |
| **WAV** | All, but huge file size |

**Tip:** for short SFX (< 5 sec) use **MP3 96 kbps**, for music — **OGG/MP3 128 kbps**.

## Playback (the quick way)

```js
// Just play
this.sound.play('click');

// With options
this.sound.play('click', {
  volume: 0.5,
  rate: 1.5,        // playback speed
  detune: 100,      // detune in cents (-1200..1200)
  loop: false,
  delay: 0
});
```

This is convenient for short sounds, but it **doesn't return** an instance — you can't stop it.

## Playback via an instance (the right way)

```js
const music = this.sound.add('theme', { loop: true, volume: 0.3 });
music.play();

music.pause();
music.resume();
music.stop();

music.setVolume(0.5);
music.setRate(2);          // 2x speed
music.setDetune(-300);
music.setLoop(true);

music.isPlaying;
music.isPaused;

music.destroy();
```

## Sound events

```js
const sfx = this.sound.add('explosion');

sfx.on('play',     () => console.log('start'));
sfx.on('complete', () => console.log('done'));
sfx.on('stop',     () => console.log('stopped'));
sfx.on('looped',   () => console.log('loop iteration'));

sfx.play();
```

## Global settings

```js
// Volume for all sounds at once
this.sound.volume = 0.5;
this.sound.setVolume(0.5);

// Mute
this.sound.mute = true;
this.sound.setMute(true);

// Pause/resume all sounds
this.sound.pauseAll();
this.sound.resumeAll();
this.sound.stopAll();

// Stop a specific one by key
this.sound.stopByKey('theme');
```

## Audio Sprite — many sounds in one file

Perfect for short SFX in slots (clicks, spins, wins, button presses).

### Preparation

Use [audiosprite-tool](https://github.com/tonistiigi/audiosprite) or [ffmpeg](https://ffmpeg.org/). You'll get a file plus a JSON:

```json
{
  "resources": ["sfx.mp3"],
  "spritemap": {
    "click":      { "start": 0,    "end": 0.5 },
    "spin-start": { "start": 1.0,  "end": 2.5 },
    "reel-stop":  { "start": 3.0,  "end": 3.4 },
    "small-win":  { "start": 4.0,  "end": 5.0 },
    "big-win":    { "start": 6.0,  "end": 9.0 }
  }
}
```

### Loading and using

```js
preload() {
  this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
    'assets/sounds/sfx.mp3',
    'assets/sounds/sfx.ogg'
  ]);
}

create() {
  // Shorthand
  this.sound.playAudioSprite('sfx', 'click');
  this.sound.playAudioSprite('sfx', 'big-win', { volume: 0.7 });

  // Via an instance (with control)
  const winSound = this.sound.addAudioSprite('sfx');
  winSound.play('big-win');
}
```

**Benefits:**
- One HTTP request
- Less startup latency
- On mobile — works around the limit on simultaneous Audio objects

## Volume, fade, crossfade

```js
// Fade in
const music = this.sound.add('theme', { volume: 0 });
music.play();
this.tweens.add({
  targets: music,
  volume: 0.5,
  duration: 2000
});

// Fade out
this.tweens.add({
  targets: music,
  volume: 0,
  duration: 1500,
  onComplete: () => music.stop()
});

// Crossfade between two tracks
function crossfade(scene, oldMusic, newKey, duration = 2000) {
  const newMusic = scene.sound.add(newKey, { loop: true, volume: 0 });
  newMusic.play();

  scene.tweens.add({ targets: oldMusic, volume: 0, duration, onComplete: () => oldMusic.stop() });
  scene.tweens.add({ targets: newMusic, volume: 0.5, duration });

  return newMusic;
}
```

## One sound played many times in parallel

If you need rapid-fire (gunfire, clicks), call `play()` on the same instance — copies are spawned automatically:

```js
const click = this.sound.add('click');
click.play();
click.play();   // a second copy plays at the same time
click.play();   // and a third
```

Or, to be safe, the short form:

```js
this.sound.play('click');
this.sound.play('click');
```

## Autoplay and iOS — the main pain point

iOS and modern browsers **forbid** sound playback without a user gesture. If a sound is supposed to play from the start — it'll only start after the first click/tap.

### Solution: the context unlocks itself

Phaser unlocks WebAudio on its own at the first interaction. But **the very first sound** before that interaction won't play.

### Pattern: "Tap to start"

```js
// Splash screen
const tapText = this.add.text(640, 360, 'Tap to start', { fontSize: '40px' }).setOrigin(0.5);
this.input.once('pointerdown', () => {
  // WebAudio is now unlocked
  this.sound.play('theme');
  this.scene.start('GameScene');
});
```

### Checking the state

```js
if (this.sound.locked) {
  console.log('Audio is locked until the user interacts');
}

this.sound.once('unlocked', () => {
  console.log('Unlocked');
  this.sound.play('theme');
});
```

## Sound in the background (when the tab is inactive)

By default Phaser pauses sound when the tab loses focus. You can control this:

```js
// In config:
audio: {
  disableWebAudio: false
},

// Or manually in a scene:
this.sound.pauseOnBlur = false;  // keep playing in the background
```

## Spatial / 3D sound (WebAudio)

You can place a sound in 3D space (for FPS, racing). Almost never needed for slots, but good to know:

```js
const sfx = this.sound.add('engine');
sfx.play();
sfx.setPan(-1);   // -1 = left ear, 0 = center, 1 = right
```

## Sound architecture for a slot game

A typical slot has:

```
🎵 Background music — ducks itself on big-win
🔊 Reel spin loop — plays while reels are spinning
🔊 Reel stop — on each reel landing
🔊 Symbol win — for each winning symbol (or one shared)
🔊 Counter ticks — while win amounts count up
🎉 Big win jingle — over the music
🔘 Button clicks — on button presses
```

A sound manager example:

```js
// src/core/AudioManager.js
export class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.music = null;
    this.muted = false;
  }

  playMusic(key) {
    if (this.music) this.music.stop();
    this.music = this.scene.sound.add(key, { loop: true, volume: 0.3 });
    this.music.play();
  }

  duckMusic(volume = 0.1, duration = 200) {
    this.scene.tweens.add({ targets: this.music, volume, duration });
  }

  unduckMusic(duration = 500) {
    this.scene.tweens.add({ targets: this.music, volume: 0.3, duration });
  }

  sfx(spriteName, options = {}) {
    if (this.muted) return;
    this.scene.sound.playAudioSprite('sfx', spriteName, options);
  }

  toggleMute() {
    this.muted = !this.muted;
    this.scene.sound.mute = this.muted;
  }
}
```

Usage:
```js
this.audio = new AudioManager(this);
this.audio.playMusic('theme');
this.audio.sfx('click');

// On a big win
this.audio.duckMusic();
this.audio.sfx('big-win');
this.time.delayedCall(3000, () => this.audio.unduckMusic());
```

## Pitfalls

| Issue | Fix |
|---|---|
| Sound doesn't play on iOS | A user interaction is required before the first playback |
| High latency | Use WebAudio (the default). HTML5 audio is slow |
| Too many simultaneous sounds | Cap the count, use a pool |
| Music restarts when scenes change | Create it in `BootScene` and don't destroy it: `music.persist = true` or store it globally |
| Sound clipped at the start of `play()` | Use `'mp3'` with leading silence or stick with WebAudio |

---

## ✅ Exercise 8

1. Load `assets/sounds/theme.mp3` as background music with `loop: true, volume: 0.3`. Start it in `GameScene`.
2. Load `assets/sounds/card.mp3`. On a click on any card — play this sound.
3. Build a **Mute button** in a corner — toggles `this.sound.mute`. Change the texture/icon based on state.
4. On hover over a card, play a short sound with `rate: 1.5` (a pitched-up tone).
5. **Bonus:** implement "ducking" — when you play `complete.mp3` (a win), the background music drops to 0.1, and 2 sec later returns to 0.3. Use a tween on the `volume` property.

[Chapter 9. Camera](./09-camera.md)
