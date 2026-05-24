# Глава 9. Камера

Камера у Phaser — це **вікно в ігровий світ**. Вона визначає, яку частину світу бачить гравець, і може скролити, зумити, трястися, фейдити.

У кожній сцені є **головна камера** — `this.cameras.main`. Можна створювати додаткові.

## Базовий API

```js
const cam = this.cameras.main;

// Скрол (зміщення світу)
cam.scrollX = 100;
cam.scrollY = 200;
cam.setScroll(100, 200);

// Центр — куди дивиться камера
cam.centerOn(800, 600);

// Зум
cam.zoom = 2;
cam.setZoom(2);

// Поворот усієї сцени
cam.rotation = Math.PI / 4;
cam.setRotation(0.5);

// Кут у градусах
cam.setAngle(45);

// Колір фону (буває поверх config.backgroundColor)
cam.setBackgroundColor('#0f0f23');

// Розмір в'юпорта (область, яку камера займає на екрані)
cam.setSize(800, 600);
cam.setPosition(0, 0);     // позиція в'юпорта на екрані
cam.setViewport(0, 0, 800, 600);
```

## Bounds — межі світу

Обмежує, куди камера може скролити:

```js
this.cameras.main.setBounds(0, 0, 2000, 1500);
```

Камера не вийде за цей прямокутник.

## Follow — стеження за об'єктом

Класика для платформерів:

```js
this.cameras.main.startFollow(player);

// З параметрами
this.cameras.main.startFollow(player, true, 0.1, 0.1);
//                                     ^ згладжування ^lerpX ^lerpY (0..1)

// З відступом
this.cameras.main.setFollowOffset(-100, 0);

// Припинити
this.cameras.main.stopFollow();
```

**Lerp** (0..1) — наскільки швидко камера наздоганяє об'єкт. 1 = миттєво (жорстко), 0.05 = дуже плавно. Для слотів не використовується.

## Ефекти камери

### Shake — тряска

```js
this.cameras.main.shake(
  500,    // duration мс
  0.01,   // intensity (0..1)
  false,  // force — перезапустити якщо вже трясеться
  callback
);
```

Ідеально для **відчуття великого виграшу** в слоті.

### Flash — спалах

```js
this.cameras.main.flash(500, 255, 255, 255);
//                  duration  R    G    B
```

Використовується для ефекту спалаху при mega-win.

### Fade — затемнення

```js
this.cameras.main.fadeOut(1000, 0, 0, 0);  // у чорний
this.cameras.main.fadeIn(1000, 0, 0, 0);   // із чорного

// З коллбеком
this.cameras.main.fadeOut(500);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

### Zoom-ефекти з tween

Сам camera.zoom можна анімувати через tween:

```js
this.tweens.add({
  targets: this.cameras.main,
  zoom: 1.5,
  duration: 1000,
  yoyo: true,
  ease: 'Sine.easeInOut'
});
```

Корисно для зуму на виграшній лінії в слоті.

### Pan — переміщення до точки

```js
this.cameras.main.pan(
  800, 400,    // куди (x, y у світі)
  2000,        // тривалість
  'Power2',    // ease
  false,       // force
  callback
);
```

## Кілька камер

Можна створити кілька камер. Кожна бачить свою область, може ігнорувати якісь об'єкти.

```js
// Додаткова мінікарта в куті
const minimap = this.cameras.add(10, 10, 200, 150);
minimap.setZoom(0.2);
minimap.setBackgroundColor('#000');
minimap.setBounds(0, 0, 2000, 1500);
minimap.startFollow(player);

// UI-камера, не рухається зі скролом
const uiCam = this.cameras.add(0, 0, 1280, 720);
uiCam.setScroll(0, 0);

// Указати яка камера які об'єкти бачить
mainCamera.ignore(uiObjects);  // головна не бачить UI
uiCam.ignore(worldObjects);    // UI-камера не бачить світ
```

⚠️ **Важливо:** UI-сцена (окремою сценою) простіша, ніж гра з двома камерами. Використовуй кілька камер тільки коли реально потрібні кілька вікон (мінікарта, розділений екран).

## scrollFactor — паралакс

`scrollFactor` визначає, наскільки сильно об'єкт рухається зі скролом камери. Дозволяє робити паралакс (фон рухається повільніше за передній план).

```js
const farBg = this.add.image(0, 0, 'far-bg').setScrollFactor(0.2);
const midBg = this.add.image(0, 0, 'mid-bg').setScrollFactor(0.5);
const player = this.add.sprite(0, 0, 'player');  // scrollFactor = 1 за замовчуванням

// UI — не рухається
const score = this.add.text(0, 0, 'Score').setScrollFactor(0);
```

## Камера для слот-гри — реальні сценарії

### Сценарій 1. Shake при big-win

```js
function onBigWin() {
  this.cameras.main.shake(800, 0.005);
  this.cameras.main.flash(300, 255, 255, 200);
  this.audio.sfx('big-win');
}
```

### Сценарій 2. Fade-перехід у бонус-гру

```js
function enterBonus() {
  this.cameras.main.fadeOut(800, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('BonusScene');
  });
}
```

### Сценарій 3. Zoom на виграшній лінії

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

### Сценарій 4. Mega-win — серія ефектів

```js
function megaWinSequence() {
  const cam = this.cameras.main;

  // 1. Зум-в
  this.tweens.add({ targets: cam, zoom: 1.2, duration: 500, yoyo: true });

  // 2. Flash
  cam.flash(400, 255, 215, 0); // золотий спалах

  // 3. Shake
  this.time.delayedCall(500, () => cam.shake(1500, 0.008));
}
```

## Події камери

```js
const cam = this.cameras.main;
cam.on('camerafadeincomplete', () => console.log('faded in'));
cam.on('camerafadeoutcomplete', () => console.log('faded out'));
cam.on('cameraflashcomplete', () => console.log('flash done'));
cam.on('camerashakecomplete', () => console.log('shake done'));
cam.on('camerapancomplete', () => console.log('pan done'));
cam.on('camerazoomcomplete', () => console.log('zoom done'));
```

## Координати: світ vs екран

```js
// Перевести екранні координати у світові
const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

// pointer.worldX, pointer.worldY — те саме
```

## RoundPixels — піксельна різкість

При зумі можуть виникати субпіксельні артефакти. Якщо гра в піксель-арті:

```js
this.cameras.main.roundPixels = true;
```

Або в config:
```js
render: { roundPixels: true, pixelArt: true }
```

## Підводні камені

| Проблема | Рішення |
|---|---|
| Об'єкт не видно після `setBounds` | Об'єкт за межами bounds, перевір координати |
| UI скролиться з камерою | `setScrollFactor(0)` на UI-об'єктах |
| Shake "застрягає" | Після `shake` завжди скидається стан, але якщо викликаєш повторно — передай `force=true` |
| Зум обрізає краї | Камера зумить із центру в'юпорта, перевір `setBounds` |
| Камера сіпається при follow | Зменши lerp до 0.05–0.1 для згладжування |

---

## ✅ Вправа 9

1. Завантаж `assets/sprites/background.webp` на весь екран. Розмісти по центру 5 карт.
2. За натисненням **пробілу** — `cameras.main.shake(500, 0.01)`.
3. За натисненням **F** — `cameras.main.flash(300, 255, 255, 0)` (жовтий спалах).
4. За натисненням **Z** — анімуй `zoom` від 1 до 1.5 і назад через tween (yoyo).
5. **Бонус:** при кліку на карту:
   - Камера плавно паниться до цієї карти (через `pan`)
   - Зум до 1.3
   - Через 1 сек — повернення до 1 і центру

[Глава 10. Scale Manager](./10-scale-manager.md)
