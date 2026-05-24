# Глава 4. Загрузка ассетов (Loader)

Без ассетов игра — это пустой канвас. В Phaser за загрузку отвечает **Loader** — `this.load`, доступный в каждой сцене.

## Где хранить ассеты

В Vite-проекте папка `public/` копируется в корень при сборке как есть. Поэтому:

```
public/
└── assets/
    ├── sprites/
    │   ├── background.webp
    │   ├── card.webp
    │   └── symbols.atlas.png
    ├── sounds/
    │   ├── spin.mp3
    │   └── win.mp3
    └── fonts/
        └── game-font.ttf
```

В коде путь будет `'assets/sprites/background.webp'` (без `public/`).

## Когда загружать

В методе `preload()` сцены:

```js
preload() {
  this.load.image('logo', 'assets/sprites/logo.png');
  this.load.audio('theme', 'assets/sounds/theme.mp3');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
}

create() {
  // здесь все ассеты уже доступны
  this.add.image(400, 300, 'logo');
}
```

Phaser **автоматически** запустит загрузку перед `create()` и подождёт.

## Типы ассетов

### 1. Изображение

```js
this.load.image('key', 'assets/sprites/file.png');
```

Использование:
```js
this.add.image(x, y, 'key');
this.add.sprite(x, y, 'key');
```

Поддержка форматов: PNG, JPG, WEBP, GIF (статичный), SVG.

**Совет:** используй WEBP — он в 2-3 раза легче PNG при том же качестве.

### 2. Спрайтшит (sprite sheet)

Один файл с равномерной сеткой кадров.

```js
this.load.spritesheet('player', 'assets/sprites/player.png', {
  frameWidth: 64,
  frameHeight: 64,
  startFrame: 0,
  endFrame: 15
});
```

Использование:
```js
this.add.sprite(x, y, 'player', 0);  // первый кадр
this.add.sprite(x, y, 'player', 5);  // шестой кадр
```

### 3. Texture Atlas (атлас) — **самый важный для слотов**

Атлас — это один большой PNG со множеством разноразмерных спрайтов + JSON с координатами. Создаётся в [TexturePacker](https://www.codeandweb.com/texturepacker) или [free-tex-packer](http://free-tex-packer.com/).

```js
this.load.atlas(
  'symbols',
  'assets/sprites/symbols.png',
  'assets/sprites/symbols.json'
);
```

JSON выглядит примерно так (формат TexturePacker JSON Hash):

```json
{
  "frames": {
    "ace.png":     { "frame": {"x":0,"y":0,"w":120,"h":120} },
    "king.png":    { "frame": {"x":120,"y":0,"w":120,"h":120} },
    "queen.png":   { "frame": {"x":240,"y":0,"w":120,"h":120} }
  },
  "meta": {
    "image": "symbols.png",
    "size": {"w":1024,"h":1024}
  }
}
```

Использование:
```js
this.add.image(x, y, 'symbols', 'ace.png');
this.add.image(x, y, 'symbols', 'king.png');
```

**Зачем нужен атлас:**
- Меньше HTTP-запросов
- Лучше использует GPU (один draw call вместо десятков)
- Меньше пустоты в текстурах
- **Обязателен** для оптимизации слотов

### 4. Аудио

```js
this.load.audio('spin', 'assets/sounds/spin.mp3');

// Несколько форматов для совместимости (Phaser выберет первый поддерживаемый)
this.load.audio('theme', [
  'assets/sounds/theme.ogg',
  'assets/sounds/theme.mp3'
]);
```

Использование:
```js
this.sound.play('spin');
const music = this.sound.add('theme', { loop: true, volume: 0.5 });
music.play();
```

### 5. Аудио-спрайт

Один файл с несколькими звуками + JSON с таймкодами. Удобно для коротких SFX.

```js
this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
  'assets/sounds/sfx.mp3',
  'assets/sounds/sfx.ogg'
]);

// Воспроизведение
this.sound.playAudioSprite('sfx', 'click');
this.sound.playAudioSprite('sfx', 'win');
```

JSON формат:
```json
{
  "resources": ["sfx.mp3"],
  "spritemap": {
    "click": { "start": 0, "end": 0.5, "loop": false },
    "win":   { "start": 1.0, "end": 2.5, "loop": false }
  }
}
```

### 6. JSON

```js
this.load.json('config', 'assets/config.json');
this.load.json('paytable', 'assets/paytable.json');

// Использование
const cfg = this.cache.json.get('config');
console.log(cfg.startBalance);
```

### 7. Bitmap Font

Готовый шрифт в виде атласа. Очень быстрый для динамических текстов (счётчики, балансы).

```js
this.load.bitmapFont(
  'gameFont',
  'assets/fonts/font.png',
  'assets/fonts/font.xml'
);

// Использование
this.add.bitmapText(x, y, 'gameFont', 'Score: 100', 32);
```

Шрифты создаются в [BMFont](https://www.angelcode.com/products/bmfont/) или [Hiero](https://libgdx.com/wiki/tools/hiero).

### 8. Web Font (TTF/WOFF)

Web-шрифт грузится **вне** Phaser-loader. Стандартный путь — через CSS:

```css
/* В index.html или CSS-файле */
@font-face {
  font-family: 'CurseCasual';
  src: url('assets/fonts/CurseCasual.ttf') format('truetype');
}
```

Затем используешь:
```js
this.add.text(x, y, 'Hello', { fontFamily: 'CurseCasual', fontSize: '32px' });
```

⚠️ **Подвох:** если попытаешься использовать шрифт раньше, чем браузер его загрузит — увидишь дефолтный. Лечится плагином [WebFont Loader](https://github.com/typekit/webfontloader) или промисом `document.fonts.ready`.

### 9. Spine (скелетная анимация)

Для слот-индустрии — критично. Через плагин:

```js
this.load.setPath('assets/spine/');
this.load.spine('hero', 'hero.json', ['hero.atlas']);

// Использование
const hero = this.add.spine(400, 300, 'hero', 'idle', true);
```

### 10. HTML / Video / Plugin

```js
this.load.html('form', 'assets/html/form.html');
this.load.video('intro', 'assets/video/intro.mp4');
this.load.plugin('rexUI', 'plugins/rex-ui.js', true);
```

## События загрузки

```js
preload() {
  this.load.on('start', () => console.log('Loading started'));
  this.load.on('progress', (value) => {
    // value: 0..1
    console.log(`Progress: ${(value * 100).toFixed(0)}%`);
  });
  this.load.on('fileprogress', (file) => {
    console.log(`Loading: ${file.key}`);
  });
  this.load.on('complete', () => console.log('All loaded'));
  this.load.on('loaderror', (file) => console.error(`Failed: ${file.key}`));

  // Сами загрузки
  this.load.image('bg', 'assets/bg.webp');
  // ...
}
```

## Прогресс-бар (полный пример)

```js
preload() {
  const { width, height } = this.scale;

  // Фон бара
  const box = this.add.rectangle(width/2, height/2, 320, 30, 0x222222);
  box.setStrokeStyle(2, 0xffffff);

  // Сам бар
  const bar = this.add.rectangle(width/2 - 150, height/2, 0, 16, 0xffffff)
    .setOrigin(0, 0.5);

  // Процент
  const percentText = this.add.text(width/2, height/2 + 40, '0%', {
    fontSize: '20px', color: '#fff'
  }).setOrigin(0.5);

  this.load.on('progress', (value) => {
    bar.width = 300 * value;
    percentText.setText(`${(value * 100).toFixed(0)}%`);
  });

  // Загружаем всё что нужно
  this.load.image('bg', 'assets/sprites/background.webp');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
  this.load.audio('spin', 'assets/sounds/spin.mp3');
  // и т.д.
}

create() {
  this.scene.start('GameScene');
}
```

## Динамическая загрузка (после `create`)

Иногда нужно догрузить ассеты **позже** (например, при переходе в бонус-игру):

```js
create() {
  // Догружаем ассеты бонуса
  this.load.image('bonusBg', 'assets/sprites/bonus-bg.webp');
  this.load.atlas('bonusSymbols', 'assets/atlases/bonus.png', 'assets/atlases/bonus.json');

  // Запускаем загрузку
  this.load.once('complete', () => {
    this.startBonusGame();
  });
  this.load.start();   // обязательно — иначе ничего не загрузится
}
```

## Cache — где хранятся загруженные ассеты

```js
this.cache.json.get('paytable');
this.cache.audio.get('spin');
this.textures.get('symbols');
this.textures.exists('logo');     // bool

// Удалить из кэша
this.textures.remove('logo');
this.cache.json.remove('paytable');
```

## Базовый путь (`setPath`)

Чтобы не повторять префиксы:

```js
this.load.setPath('assets/sprites/');
this.load.image('bg', 'background.webp');
this.load.image('card', 'card.webp');
this.load.image('symbol1', 'symbol1.webp');

this.load.setPath('assets/sounds/');
this.load.audio('spin', 'spin.mp3');
this.load.audio('win', 'win.mp3');
```

## Префикс ключей

```js
this.load.setPrefix('slot.');
this.load.image('bg', 'background.webp');  // ключ будет 'slot.bg'
this.load.setPrefix();  // сброс
```

## Манифест-файл (паттерн для больших игр)

Вместо разбрасывания `this.load.*` по сценам, держи список ассетов в одном файле:

```js
// src/core/AssetManifest.js
export const ASSETS = {
  images: [
    { key: 'background', url: 'assets/sprites/background.webp' },
    { key: 'logo',       url: 'assets/sprites/logo.webp' }
  ],
  atlases: [
    { key: 'symbols', tex: 'assets/atlases/symbols.png', json: 'assets/atlases/symbols.json' }
  ],
  sounds: [
    { key: 'spin', url: 'assets/sounds/spin.mp3' },
    { key: 'win',  url: 'assets/sounds/win.mp3' }
  ]
};
```

```js
// PreloadScene.js
import { ASSETS } from '../core/AssetManifest.js';

preload() {
  ASSETS.images.forEach(a => this.load.image(a.key, a.url));
  ASSETS.atlases.forEach(a => this.load.atlas(a.key, a.tex, a.json));
  ASSETS.sounds.forEach(a => this.load.audio(a.key, a.url));
}
```

## Нюансы и подводные камни

| Проблема | Решение |
|---|---|
| Ассет не находится | Проверь путь относительно `public/`, без `public/` в начале |
| CORS-ошибка | Запускай через `npm run dev`, не открывай HTML напрямую |
| Звук не играет на iOS | Нужен пользовательский tap для разблокировки WebAudio |
| Атлас не работает | Проверь, что JSON и PNG лежат рядом и формат совпадает (Hash или Array) |
| Шрифт показывается дефолтным | Жди `document.fonts.ready` перед использованием |

---

## ✅ Упражнение 4

Используя ассеты из этого репо (`assets/sprites/card1.webp` ... `card5.webp`):

1. В `PreloadScene` загрузи все 5 карт через цикл `for`.
2. Сделай прогресс-бар — фон + бар + процент.
3. Добавь искусственную задержку: после `complete` подожди 500мс через `this.time.delayedCall`, потом перейди в `GameScene`.
4. В `GameScene` выведи все 5 карт в ряд по центру.
5. **Бонус:** загрузи `assets/sounds/card.mp3`. По клику на карту проигрывай этот звук.

Готово — переходим к [Главе 5. Display Objects](./05-display-objects.md).
