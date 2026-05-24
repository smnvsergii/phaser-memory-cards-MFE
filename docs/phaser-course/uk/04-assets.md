# Глава 4. Завантаження ассетів (Loader)

Без ассетів гра — це порожній канвас. У Phaser за завантаження відповідає **Loader** — `this.load`, доступний у кожній сцені.

## Де зберігати ассети

У Vite-проєкті папка `public/` копіюється в корінь під час збірки як є. Тому:

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

У коді шлях буде `'assets/sprites/background.webp'` (без `public/`).

## Коли завантажувати

У методі `preload()` сцени:

```js
preload() {
  this.load.image('logo', 'assets/sprites/logo.png');
  this.load.audio('theme', 'assets/sounds/theme.mp3');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
}

create() {
  // тут усі ассети вже доступні
  this.add.image(400, 300, 'logo');
}
```

Phaser **автоматично** запустить завантаження перед `create()` і зачекає.

## Типи ассетів

### 1. Зображення

```js
this.load.image('key', 'assets/sprites/file.png');
```

Використання:
```js
this.add.image(x, y, 'key');
this.add.sprite(x, y, 'key');
```

Підтримка форматів: PNG, JPG, WEBP, GIF (статичний), SVG.

**Порада:** використовуй WEBP — він у 2-3 рази легший за PNG за тієї ж якості.

### 2. Спрайтшит (sprite sheet)

Один файл із рівномірною сіткою кадрів.

```js
this.load.spritesheet('player', 'assets/sprites/player.png', {
  frameWidth: 64,
  frameHeight: 64,
  startFrame: 0,
  endFrame: 15
});
```

Використання:
```js
this.add.sprite(x, y, 'player', 0);  // перший кадр
this.add.sprite(x, y, 'player', 5);  // шостий кадр
```

### 3. Texture Atlas (атлас) — **найважливіший для слотів**

Атлас — це один великий PNG із багатьма різнорозмірними спрайтами + JSON із координатами. Створюється в [TexturePacker](https://www.codeandweb.com/texturepacker) або [free-tex-packer](http://free-tex-packer.com/).

```js
this.load.atlas(
  'symbols',
  'assets/sprites/symbols.png',
  'assets/sprites/symbols.json'
);
```

JSON виглядає приблизно так (формат TexturePacker JSON Hash):

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

Використання:
```js
this.add.image(x, y, 'symbols', 'ace.png');
this.add.image(x, y, 'symbols', 'king.png');
```

**Навіщо потрібен атлас:**
- Менше HTTP-запитів
- Краще використовує GPU (один draw call замість десятків)
- Менше порожнечі в текстурах
- **Обов'язковий** для оптимізації слотів

### 4. Аудіо

```js
this.load.audio('spin', 'assets/sounds/spin.mp3');

// Кілька форматів для сумісності (Phaser обере перший підтримуваний)
this.load.audio('theme', [
  'assets/sounds/theme.ogg',
  'assets/sounds/theme.mp3'
]);
```

Використання:
```js
this.sound.play('spin');
const music = this.sound.add('theme', { loop: true, volume: 0.5 });
music.play();
```

### 5. Аудіо-спрайт

Один файл із кількома звуками + JSON із таймкодами. Зручно для коротких SFX.

```js
this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
  'assets/sounds/sfx.mp3',
  'assets/sounds/sfx.ogg'
]);

// Відтворення
this.sound.playAudioSprite('sfx', 'click');
this.sound.playAudioSprite('sfx', 'win');
```

JSON-формат:
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

// Використання
const cfg = this.cache.json.get('config');
console.log(cfg.startBalance);
```

### 7. Bitmap Font

Готовий шрифт у вигляді атласа. Дуже швидкий для динамічних текстів (лічильники, баланси).

```js
this.load.bitmapFont(
  'gameFont',
  'assets/fonts/font.png',
  'assets/fonts/font.xml'
);

// Використання
this.add.bitmapText(x, y, 'gameFont', 'Score: 100', 32);
```

Шрифти створюються в [BMFont](https://www.angelcode.com/products/bmfont/) або [Hiero](https://libgdx.com/wiki/tools/hiero).

### 8. Web Font (TTF/WOFF)

Web-шрифт вантажиться **поза** Phaser-loader. Стандартний шлях — через CSS:

```css
/* В index.html або CSS-файлі */
@font-face {
  font-family: 'CurseCasual';
  src: url('assets/fonts/CurseCasual.ttf') format('truetype');
}
```

Потім використовуєш:
```js
this.add.text(x, y, 'Hello', { fontFamily: 'CurseCasual', fontSize: '32px' });
```

⚠️ **Підступ:** якщо спробуєш використати шрифт раніше, ніж браузер його завантажить — побачиш дефолтний. Лікується плагіном [WebFont Loader](https://github.com/typekit/webfontloader) або promise'ом `document.fonts.ready`.

### 9. Spine (скелетна анімація)

Для слот-індустрії — критично. Через плагін:

```js
this.load.setPath('assets/spine/');
this.load.spine('hero', 'hero.json', ['hero.atlas']);

// Використання
const hero = this.add.spine(400, 300, 'hero', 'idle', true);
```

### 10. HTML / Video / Plugin

```js
this.load.html('form', 'assets/html/form.html');
this.load.video('intro', 'assets/video/intro.mp4');
this.load.plugin('rexUI', 'plugins/rex-ui.js', true);
```

## Події завантаження

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

  // Самі завантаження
  this.load.image('bg', 'assets/bg.webp');
  // ...
}
```

## Прогрес-бар (повний приклад)

```js
preload() {
  const { width, height } = this.scale;

  // Фон бара
  const box = this.add.rectangle(width/2, height/2, 320, 30, 0x222222);
  box.setStrokeStyle(2, 0xffffff);

  // Сам бар
  const bar = this.add.rectangle(width/2 - 150, height/2, 0, 16, 0xffffff)
    .setOrigin(0, 0.5);

  // Відсоток
  const percentText = this.add.text(width/2, height/2 + 40, '0%', {
    fontSize: '20px', color: '#fff'
  }).setOrigin(0.5);

  this.load.on('progress', (value) => {
    bar.width = 300 * value;
    percentText.setText(`${(value * 100).toFixed(0)}%`);
  });

  // Завантажуємо все, що потрібно
  this.load.image('bg', 'assets/sprites/background.webp');
  this.load.atlas('symbols', 'assets/sprites/symbols.png', 'assets/sprites/symbols.json');
  this.load.audio('spin', 'assets/sounds/spin.mp3');
  // тощо
}

create() {
  this.scene.start('GameScene');
}
```

## Динамічне завантаження (після `create`)

Інколи треба довантажити ассети **пізніше** (наприклад, при переході в бонус-гру):

```js
create() {
  // Довантажуємо ассети бонусу
  this.load.image('bonusBg', 'assets/sprites/bonus-bg.webp');
  this.load.atlas('bonusSymbols', 'assets/atlases/bonus.png', 'assets/atlases/bonus.json');

  // Запускаємо завантаження
  this.load.once('complete', () => {
    this.startBonusGame();
  });
  this.load.start();   // обов'язково — інакше нічого не завантажиться
}
```

## Cache — де зберігаються завантажені ассети

```js
this.cache.json.get('paytable');
this.cache.audio.get('spin');
this.textures.get('symbols');
this.textures.exists('logo');     // bool

// Видалити з кешу
this.textures.remove('logo');
this.cache.json.remove('paytable');
```

## Базовий шлях (`setPath`)

Щоб не повторювати префікси:

```js
this.load.setPath('assets/sprites/');
this.load.image('bg', 'background.webp');
this.load.image('card', 'card.webp');
this.load.image('symbol1', 'symbol1.webp');

this.load.setPath('assets/sounds/');
this.load.audio('spin', 'spin.mp3');
this.load.audio('win', 'win.mp3');
```

## Префікс ключів

```js
this.load.setPrefix('slot.');
this.load.image('bg', 'background.webp');  // ключ буде 'slot.bg'
this.load.setPrefix();  // скидання
```

## Маніфест-файл (патерн для великих ігор)

Замість того щоб розкидати `this.load.*` по сценах, тримай список ассетів в одному файлі:

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

## Нюанси та підводні камені

| Проблема | Рішення |
|---|---|
| Ассет не знаходиться | Перевір шлях відносно `public/`, без `public/` на початку |
| CORS-помилка | Запускай через `npm run dev`, не відкривай HTML напряму |
| Звук не грає на iOS | Потрібен користувацький tap для розблокування WebAudio |
| Атлас не працює | Перевір, що JSON і PNG лежать поруч і формат збігається (Hash або Array) |
| Шрифт показується дефолтним | Чекай `document.fonts.ready` перед використанням |

---

## ✅ Вправа 4

Використовуючи ассети з цього репо (`assets/sprites/card1.webp` ... `card5.webp`):

1. У `PreloadScene` завантаж усі 5 карт через цикл `for`.
2. Зроби прогрес-бар — фон + бар + відсоток.
3. Додай штучну затримку: після `complete` зачекай 500мс через `this.time.delayedCall`, потім перейди в `GameScene`.
4. У `GameScene` виведи всі 5 карт у ряд по центру.
5. **Бонус:** завантаж `assets/sounds/card.mp3`. За кліком на карту програвай цей звук.

Готово — переходимо до [Глави 5. Display Objects](./05-display-objects.md).
