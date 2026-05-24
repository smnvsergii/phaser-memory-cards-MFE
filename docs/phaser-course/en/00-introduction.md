# Chapter 0. Introduction to Phaser

## What Phaser is

**Phaser** is an HTML5 framework for building 2D games in the browser. It's written in JavaScript/TypeScript and uses **WebGL** under the hood (with a Canvas fallback).

Phaser is a **complete game engine** that already ships with:
- A 2D graphics renderer (WebGL/Canvas)
- A scene system and game loop
- An asset loader
- Animations (sprite + tweens)
- Input (mouse, touch, keyboard, gamepad)
- An audio manager
- Physics engines (Arcade, Matter.js)
- Camera, particles, text, masks
- Responsiveness (Scale Manager)

In other words, Phaser gives you **everything you need out of the box**, unlike Pixi.js (renderer only) or raw WebGL.

## Phaser versions

- **Phaser 2 (CE)** — legacy, ES5, don't use it for new projects
- **Phaser 3** — current, ES6+, fully reworked architecture
- **Phaser 4** — in development (as of 2026), not released yet

This course uses **Phaser 3.80+**.

## Where Phaser is used

- Casual / hyper-casual games (Match-3, runners, puzzles)
- Educational games
- Ad games (playable ads)
- **Slots and casual casino games** (though the industry more often picks Pixi)
- Prototypes that get ported later

## Phaser vs Pixi vs Unity (just to put things in perspective)

| | Phaser | Pixi.js | Unity |
|---|---|---|---|
| Type | Framework | Renderer only | Full engine |
| Language | JS/TS | JS/TS | C# |
| Platform | Browser | Browser | Everywhere |
| Learning curve | Low | Low (but you write a lot yourself) | High |
| Out-of-the-box readiness | High | Low | Very high |
| Performance | Medium | High | Very high |
| Good for slots | Yes (for prototypes) | Yes (production standard) | Rarely |

**Bottom line:** Phaser is ideal for learning and quick prototypes. Once you've mastered it, the move to Pixi will be easy.

## Architecture of a Phaser game

```
┌─────────────────────────────────┐
│           Phaser.Game           │  ← the root object
│  ┌───────────────────────────┐  │
│  │      Scene Manager        │  │  ← manages scenes
│  │  ┌─────────────────────┐  │  │
│  │  │   BootScene         │  │  │  ← quick init
│  │  │   PreloadScene      │  │  │  ← asset loading
│  │  │   MenuScene         │  │  │  ← menu
│  │  │   GameScene         │  │  │  ← gameplay
│  │  │   UIScene           │  │  │  ← UI on top of the game
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │  Loader / Cache / Sound   │  │
│  │  Input / Physics / Tweens │  │
│  │  Renderer / Camera        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

## Key concepts (quick glossary)

| Term | Meaning |
|---|---|
| **Game** | The root object, an instance of Phaser.Game |
| **Scene** | A self-contained game module (menu, level, UI) |
| **GameObject** | Anything on a scene (Sprite, Text, Graphics) |
| **Texture** | An image loaded into GPU memory |
| **Atlas** | One file with many sprites + a JSON with their coordinates |
| **Tween** | A smooth animation of properties (alpha, x, scale, ...) |
| **Animation** | Frame-by-frame animation based on a spritesheet |
| **Cache** | Storage for loaded assets |
| **Loader** | The asset-loading manager |

## What you need to get started

1. **Node.js 18+** and npm
2. Any editor (VS Code, WebStorm)
3. A modern browser (Chrome/Firefox)
4. Basic JavaScript (ES6+, classes, promises, modules)

## What you **don't** need to know (Phaser hides it for you)

- WebGL and shaders (at the start)
- Matrix math (at the start)
- Low-level Canvas API work

---

## ✅ Exercise 0

There's no code in this chapter. Instead:

1. Open [phaser.io/examples](https://phaser.io/examples) and **browse for about 15 minutes**. Get a feel for what Phaser can do.
2. Find the "Tweens" → "Yoyo" section — you'll need this for pulsing slot symbols.
3. Find the "Masks" section — you'll need this for slot reels.

When you're ready — head over to [Chapter 1. Project setup](./01-setup.md).
