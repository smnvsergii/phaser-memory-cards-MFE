# Глава 9. Камера

Камера в Phaser — это **окно в игровой мир**. Она определяет, какую часть мира видит игрок, и может скроллить, зумить, трястись, фейдить.

В каждой сцене есть **главная камера** — `this.cameras.main`. Можно создавать дополнительные.

## Базовое API

```js
const cam = this.cameras.main;

// Скролл (смещение мира)
cam.scrollX = 100;
cam.scrollY = 200;
cam.setScroll(100, 200);

// Центр — куда смотрит камера
cam.centerOn(800, 600);

// Зум
cam.zoom = 2;
cam.setZoom(2);

// Поворот всей сцены
cam.rotation = Math.PI / 4;
cam.setRotation(0.5);

// Угол в градусах
cam.setAngle(45);

// Цвет фона (бывает поверх config.backgroundColor)
cam.setBackgroundColor('#0f0f23');

// Размер вьюпорта (область, которую камера занимает на экране)
cam.setSize(800, 600);
cam.setPosition(0, 0);     // позиция вьюпорта на экране
cam.setViewport(0, 0, 800, 600);
```

## Bounds — границы мира

Ограничивает, куда камера может скроллить:

```js
this.cameras.main.setBounds(0, 0, 2000, 1500);
```

Камера не выйдет за этот прямоугольник.

## Follow — слежение за объектом

Классика для платформеров:

```js
this.cameras.main.startFollow(player);

// С параметрами
this.cameras.main.startFollow(player, true, 0.1, 0.1);
//                                     ^ сглаживание ^lerpX ^lerpY (0..1)

// С отступом
this.cameras.main.setFollowOffset(-100, 0);

// Прекратить
this.cameras.main.stopFollow();
```

**Lerp** (0..1) — насколько быстро камера догоняет объект. 1 = мгновенно (жёстко), 0.05 = очень плавно. Для слотов не используется.

## Эффекты камеры

### Shake — тряска

```js
this.cameras.main.shake(
  500,    // duration мс
  0.01,   // intensity (0..1)
  false,  // force — перезапустить если уже трясётся
  callback
);
```

Идеально для **ощущения большого выигрыша** в слоте.

### Flash — вспышка

```js
this.cameras.main.flash(500, 255, 255, 255);
//                  duration  R    G    B
```

Используется для эффекта вспышки при mega-win.

### Fade — затемнение

```js
this.cameras.main.fadeOut(1000, 0, 0, 0);  // в чёрный
this.cameras.main.fadeIn(1000, 0, 0, 0);   // из чёрного

// С коллбеком
this.cameras.main.fadeOut(500);
this.cameras.main.once('camerafadeoutcomplete', () => {
  this.scene.start('NextScene');
});
```

### Zoom-эффекты с tween

Сам camera.zoom можно анимировать через tween:

```js
this.tweens.add({
  targets: this.cameras.main,
  zoom: 1.5,
  duration: 1000,
  yoyo: true,
  ease: 'Sine.easeInOut'
});
```

Полезно для зума на выигрышной линии в слоте.

### Pan — перемещение к точке

```js
this.cameras.main.pan(
  800, 400,    // куда (x, y в мире)
  2000,        // длительность
  'Power2',    // ease
  false,       // force
  callback
);
```

## Несколько камер

Можно создать несколько камер. Каждая видит свою область, может игнорировать какие-то объекты.

```js
// Дополнительная мини-карта в углу
const minimap = this.cameras.add(10, 10, 200, 150);
minimap.setZoom(0.2);
minimap.setBackgroundColor('#000');
minimap.setBounds(0, 0, 2000, 1500);
minimap.startFollow(player);

// UI-камера, не двигается со скроллом
const uiCam = this.cameras.add(0, 0, 1280, 720);
uiCam.setScroll(0, 0);

// Указать какая камера какие объекты видит
mainCamera.ignore(uiObjects);  // главная не видит UI
uiCam.ignore(worldObjects);    // UI-камера не видит мир
```

⚠️ **Важно:** UI-сцена (отдельной сценой) проще, чем играть с двумя камерами. Используй несколько камер только когда реально нужны несколько окон (мини-карта, разделённый экран).

## scrollFactor — параллакс

`scrollFactor` определяет, как сильно объект двигается со скроллом камеры. Позволяет делать параллакс (фон двигается медленнее переднего плана).

```js
const farBg = this.add.image(0, 0, 'far-bg').setScrollFactor(0.2);
const midBg = this.add.image(0, 0, 'mid-bg').setScrollFactor(0.5);
const player = this.add.sprite(0, 0, 'player');  // scrollFactor = 1 по умолчанию

// UI — не двигается
const score = this.add.text(0, 0, 'Score').setScrollFactor(0);
```

## Камера для слот-игры — реальные сценарии

### Сценарий 1. Shake при big-win

```js
function onBigWin() {
  this.cameras.main.shake(800, 0.005);
  this.cameras.main.flash(300, 255, 255, 200);
  this.audio.sfx('big-win');
}
```

### Сценарий 2. Fade-переход в бонус-игру

```js
function enterBonus() {
  this.cameras.main.fadeOut(800, 0, 0, 0);
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.scene.start('BonusScene');
  });
}
```

### Сценарий 3. Zoom на выигрышной линии

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

### Сценарий 4. Mega-win — серия эффектов

```js
function megaWinSequence() {
  const cam = this.cameras.main;

  // 1. Зум-в
  this.tweens.add({ targets: cam, zoom: 1.2, duration: 500, yoyo: true });

  // 2. Flash
  cam.flash(400, 255, 215, 0); // золотая вспышка

  // 3. Shake
  this.time.delayedCall(500, () => cam.shake(1500, 0.008));
}
```

## События камеры

```js
const cam = this.cameras.main;
cam.on('camerafadeincomplete', () => console.log('faded in'));
cam.on('camerafadeoutcomplete', () => console.log('faded out'));
cam.on('cameraflashcomplete', () => console.log('flash done'));
cam.on('camerashakecomplete', () => console.log('shake done'));
cam.on('camerapancomplete', () => console.log('pan done'));
cam.on('camerazoomcomplete', () => console.log('zoom done'));
```

## Координаты: мир vs экран

```js
// Перевести экранные координаты в мировые
const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

// pointer.worldX, pointer.worldY — то же самое
```

## RoundPixels — пиксельная резкость

При зуме могут возникать сабпиксельные артефакты. Если игра в пиксель-арте:

```js
this.cameras.main.roundPixels = true;
```

Или в config:
```js
render: { roundPixels: true, pixelArt: true }
```

## Подводные камни

| Проблема | Решение |
|---|---|
| Объект не виден после `setBounds` | Объект за пределами bounds, проверь координаты |
| UI скроллится с камерой | `setScrollFactor(0)` на UI-объектах |
| Shake "застревает" | После `shake` всегда сбрасывается состояние, но если зовёшь повторно — передай `force=true` |
| Зум обрезает края | Камера зумит из центра вьюпорта, проверь `setBounds` |
| Камера дёргается при follow | Уменьши lerp до 0.05–0.1 для сглаживания |

---

## ✅ Упражнение 9

1. Загрузи `assets/sprites/background.webp` на весь экран. Размести по центру 5 карт.
2. По нажатию **пробела** — `cameras.main.shake(500, 0.01)`.
3. По нажатию **F** — `cameras.main.flash(300, 255, 255, 0)` (жёлтая вспышка).
4. По нажатию **Z** — анимируй `zoom` от 1 до 1.5 и обратно через tween (yoyo).
5. **Бонус:** при клике на карту:
   - Камера плавно панится к этой карте (через `pan`)
   - Зум до 1.3
   - Через 1 сек — возврат к 1 и центру

[Глава 10. Scale Manager](./10-scale-manager.md)
