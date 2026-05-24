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
- Match all pairs to win — best time is saved to `localStorage` and shown next to the running timer

## What I learned

- Phaser's scene lifecycle: `preload` / `create` / `update` and how to delegate loading to a dedicated scene
- Sprite scaling via `setDisplaySize` so the same code handles textures of different sizes
- Tween-based animation (move, flip) and how `scaleX: 0 → 1` produces a card flip
- Browser autoplay policy and why an audio context can't start before a user gesture
- Cache busting and how Phaser handles missing texture files silently (one of the trickier bugs to debug)

## Roadmap

- [ ] Migrate to Vite + ES modules
- [ ] Add TypeScript
- [ ] Replace globals with `import` / `export`
- [ ] Wrap as a microfrontend embedded into a shell app via iframe + `postMessage`
- [ ] Move on to a slot prototype using the same architecture

## Notes

`assets/scripts/phaser.js` was originally vendored locally (~7.5 MB) which made `git push` fail with HTTP 400. Switched to CDN and added `.gitignore` to keep the repo clean.
