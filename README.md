# Memory Cards

My first Phaser project. A small memory match game built as a stepping stone toward more complex games (slots being the goal). Coming from a React / front-end background, I used this project to learn the Phaser scene lifecycle, asset loading, sprite animation, and audio.

## Stack

- [Phaser 3.90](https://phaser.io/) — loaded via CDN
- Vanilla JS (no build step yet)
- LocalStorage for best-time persistence

## How to run

No bundler, no `npm install`. Any static server works.

```bash
# Python (preinstalled on macOS)
python3 -m http.server 8000

# or via Node
npx http-server -p 8000
```

Open `http://localhost:8000`.

> WebStorm users can right-click `index.html` → Open in Browser to use the built-in static server.

## Project structure

```
MemoryCards/
├── src/
│   ├── main.js              # entry point, registers scenes
│   ├── config.js            # game-wide constants
│   ├── objects/
│   │   └── Card.js          # Sprite subclass with flip/move animations
│   └── scenes/
│       ├── BootScene.js     # bootstrap
│       ├── PreloadScene.js  # asset loading + progress bar
│       └── GameScene.js     # gameplay
├── assets/
│   ├── fonts/
│   ├── sounds/
│   └── sprites/
└── index.html
```

The three-scene split (`Boot → Preload → Game`) is the same pattern used in larger Phaser projects, including slots. Keeping it tiny here as a template.

## Gameplay

- 5 pairs, 60-second timer
- Match all pairs to win - best time is saved to `localStorage` and shown next to the running timer

## What I learned

- Phaser's scene lifecycle: `preload` / `create` / `update` and how to delegate loading to a dedicated scene
- Sprite scaling via `setDisplaySize` so the same code handles textures of different sizes
- Tween-based animation (move, flip) and how `scaleX: 0 → 1` produces a card flip
- Browser autoplay policy and why an audio context can't start before a user gesture
- Cache busting and how Phaser handles missing texture files silently (one of the trickier bugs to debug)

## Roadmap

- [x] Wrap as a microfrontend embedded into a shell app via iframe + `postMessage`
- [ ] Migrate to Vite + ES modules
- [ ] Add TypeScript
- [ ] Replace globals with `import` / `export`
- [ ] Move on to a slot prototype using the same architecture

## MFE / shell integration

The game can run standalone (open `index.html` directly) or embedded in a
shell application via `<iframe>`. Communication uses `window.postMessage`
through a thin wrapper, `MFEBridge` (`src/mfe/bridge.js`).

### Message envelope

```js
const message = {
  source:  'memory-cards', // sender id
  target:  'memory-cards', // optional; used by shell to address one MFE
  version: 1,              // protocol version
  type:    'win',          // event/command name
  payload: { time: 42 },
};
```

`target` is optional. The shell omits it for broadcasts and sets it to a
specific MFE id when addressing one game.

### Commands (shell → MFE)

| type        | payload               | effect                          |
|-------------|-----------------------|---------------------------------|
| `pause`     | —                     | pauses the active scene & theme |
| `resume`    | —                     | resumes the active scene        |
| `restart`   | —                     | restarts the round              |
| `mute`      | `{ muted: boolean }`  | toggles all sounds              |
| `setVolume` | `{ volume: 0..1 }`    | sets master volume              |

### Events (MFE → shell)

| type              | payload                                      |
|-------------------|----------------------------------------------|
| `ready`           | `{ mfeId, version, bestTime, timeout }`      |
| `gameStart`       | `{ timeout }`                                |
| `match`           | `{ value, matched, total }`                  |
| `mismatch`        | `{ values: [a, b] }`                         |
| `win`             | `{ time }`                                   |
| `timeout`         | —                                            |
| `bestTimeUpdated` | `{ bestTime }`                               |
| `paused`          | —                                            |
| `resumed`         | —                                            |
| `muteChanged`     | `{ muted }`                                  |
| `volumeChanged`   | `{ volume }`                                 |

### Origin policy

Configure allowed shell origins in `src/config.js` under `mfe.allowedShellOrigins`.
An empty list (the default) accepts any origin and logs a warning — convenient
for local dev, never for production.

## Notes

`assets/scripts/phaser.js` was originally vendored locally (~7.5 MB) which made `git push` fail with HTTP 400. Switched to CDN and added `.gitignore` to keep the repo clean.
