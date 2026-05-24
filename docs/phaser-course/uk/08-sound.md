# Глава 8. Звук

Звук у Phaser — через **Sound Manager** (`this.sound`). Під капотом два бекенди:

- **WebAudio** — сучасний, рекомендується. Підтримує 3D, ефекти, точний час.
- **HTML5 Audio** — фолбек для старих браузерів і слабких пристроїв.

Phaser **сам обирає** WebAudio, якщо він доступний.

## Завантаження звуку

```js
preload() {
  // Простий файл
  this.load.audio('click', 'assets/sounds/click.mp3');

  // Кілька форматів (обирається найкращий підтримуваний)
  this.load.audio('theme', [
    'assets/sounds/theme.ogg',
    'assets/sounds/theme.mp3',
    'assets/sounds/theme.m4a'
  ]);
}
```

### Які формати підтримуються

| Формат | Підтримка |
|---|---|
| **MP3** | Усі сучасні браузери |
| **OGG** | Усі, окрім старого Safari |
| **M4A/AAC** | Safari, Chrome |
| **WEBM** | Chrome, Firefox |
| **WAV** | Усі, але величезний розмір |

**Порада:** для коротких SFX (< 5 сек) використовуй **MP3 96 kbps**, для музики — **OGG/MP3 128 kbps**.

## Відтворення (швидкий спосіб)

```js
// Просто програти
this.sound.play('click');

// З опціями
this.sound.play('click', {
  volume: 0.5,
  rate: 1.5,        // швидкість
  detune: 100,      // розладнання в центах (-1200..1200)
  loop: false,
  delay: 0
});
```

Цей спосіб зручний для коротких звуків, але **не повертає** об'єкт — його не можна зупинити.

## Відтворення через інстанс (правильний спосіб)

```js
const music = this.sound.add('theme', { loop: true, volume: 0.3 });
music.play();

music.pause();
music.resume();
music.stop();

music.setVolume(0.5);
music.setRate(2);          // у 2 рази швидше
music.setDetune(-300);
music.setLoop(true);

music.isPlaying;
music.isPaused;

music.destroy();
```

## Події звуку

```js
const sfx = this.sound.add('explosion');

sfx.on('play',     () => console.log('start'));
sfx.on('complete', () => console.log('done'));
sfx.on('stop',     () => console.log('stopped'));
sfx.on('looped',   () => console.log('loop iteration'));

sfx.play();
```

## Глобальні налаштування

```js
// Гучність для всіх звуків одразу
this.sound.volume = 0.5;
this.sound.setVolume(0.5);

// Mute
this.sound.mute = true;
this.sound.setMute(true);

// Пауза/відновлення всіх звуків
this.sound.pauseAll();
this.sound.resumeAll();
this.sound.stopAll();

// Зупинити конкретний за ключем
this.sound.stopByKey('theme');
```

## Audio Sprite — багато звуків в одному файлі

Ідеально для коротких SFX у слотах (клік, спін, win, кнопки).

### Підготовка

Використовуй [audiosprite-tool](https://github.com/tonistiigi/audiosprite) або [ffmpeg](https://ffmpeg.org/). Отримаєш файл + JSON:

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

### Завантаження та використання

```js
preload() {
  this.load.audioSprite('sfx', 'assets/sounds/sfx.json', [
    'assets/sounds/sfx.mp3',
    'assets/sounds/sfx.ogg'
  ]);
}

create() {
  // Шорткат
  this.sound.playAudioSprite('sfx', 'click');
  this.sound.playAudioSprite('sfx', 'big-win', { volume: 0.7 });

  // Через інстанс (з керуванням)
  const winSound = this.sound.addAudioSprite('sfx');
  winSound.play('big-win');
}
```

**Переваги:**
- Один HTTP-запит
- Менше затримки на старті
- На мобільних — обходить ліміти на кількість одночасних Audio-об'єктів

## Гучність, fade, кросфейд

```js
// Плавна поява
const music = this.sound.add('theme', { volume: 0 });
music.play();
this.tweens.add({
  targets: music,
  volume: 0.5,
  duration: 2000
});

// Плавне зникнення
this.tweens.add({
  targets: music,
  volume: 0,
  duration: 1500,
  onComplete: () => music.stop()
});

// Кросфейд між двома треками
function crossfade(scene, oldMusic, newKey, duration = 2000) {
  const newMusic = scene.sound.add(newKey, { loop: true, volume: 0 });
  newMusic.play();

  scene.tweens.add({ targets: oldMusic, volume: 0, duration, onComplete: () => oldMusic.stop() });
  scene.tweens.add({ targets: newMusic, volume: 0.5, duration });

  return newMusic;
}
```

## Один звук багато разів одночасно

Якщо потрібен звук-спам (стрілянина, клацання), використовуй `play()` з одного об'єкта — він автоматично породжує копії:

```js
const click = this.sound.add('click');
click.play();
click.play();   // друга копія грає одночасно
click.play();   // і третя
```

Або, для гарантії, через short-form:

```js
this.sound.play('click');
this.sound.play('click');
```

## Автоплей та iOS — головний біль

iOS і сучасні браузери **забороняють** відтворення звуку без жесту користувача. Якщо звук має грати від самого початку — він почне грати лише після першого кліку/тапу.

### Рішення: контекст розблокується автоматично

Phaser сам розблокує WebAudio при першій взаємодії. Але **перший звук** до взаємодії не відтвориться.

### Патерн: "Tap to start"

```js
// Стартовий екран
const tapText = this.add.text(640, 360, 'Tap to start', { fontSize: '40px' }).setOrigin(0.5);
this.input.once('pointerdown', () => {
  // Тут WebAudio уже розблокований
  this.sound.play('theme');
  this.scene.start('GameScene');
});
```

### Перевірка стану

```js
if (this.sound.locked) {
  console.log('Аудіо заблоковано до взаємодії');
}

this.sound.once('unlocked', () => {
  console.log('Розблоковано');
  this.sound.play('theme');
});
```

## Звук у фоні (коли вкладка неактивна)

За замовчуванням Phaser призупиняє звук, коли вкладка неактивна. Керувати можна так:

```js
// У config:
audio: {
  disableWebAudio: false
},

// Або вручну в сцені:
this.sound.pauseOnBlur = false;  // продовжувати грати у фоні
```

## Spatial / 3D звук (WebAudio)

Можна ставити звук у 3D-просторі (для FPS, гонок). Для слотів майже не потрібно, але знати корисно:

```js
const sfx = this.sound.add('engine');
sfx.play();
sfx.setPan(-1);   // -1 = ліве вухо, 0 = центр, 1 = праве
```

## Звукова архітектура для слот-гри

Типовий слот має:

```
🎵 Background music — приглушує себе при big-win
🔊 Reel spin loop — грає поки крутяться барабани
🔊 Reel stop — на кожен стоп барабана
🔊 Symbol win — для кожного виграшного символа (або один спільний)
🔊 Counter ticks — поки цифри виграшу рахуються
🎉 Big win jingle — поверх музики
🔘 Button clicks — при натисненні кнопок
```

Приклад менеджера звуку:

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

Використання:
```js
this.audio = new AudioManager(this);
this.audio.playMusic('theme');
this.audio.sfx('click');

// При великому виграші
this.audio.duckMusic();
this.audio.sfx('big-win');
this.time.delayedCall(3000, () => this.audio.unduckMusic());
```

## Підводні камені

| Проблема | Рішення |
|---|---|
| Звук не грає на iOS | Потрібна взаємодія користувача перед першим програванням |
| Latency високий | Використовуй WebAudio (за замовчуванням). HTML5 — повільний |
| Забагато одночасних звуків | Обмеж кількість, використовуй pool |
| Музика перезапускається при зміні сцен | Створюй у `BootScene` і не знищуй: `music.persist = true` або зберігай глобально |
| Звук обрізається при `play()` | Встанови `'mp3'` із порожнім початком або використовуй WebAudio |

---

## ✅ Вправа 8

1. Завантаж `assets/sounds/theme.mp3` як фонову музику з `loop: true, volume: 0.3`. Запусти в `GameScene`.
2. Завантаж `assets/sounds/card.mp3`. За кліком на будь-яку карту — грай цей звук.
3. Зроби **кнопку Mute** у куті — перемикає `this.sound.mute`. Змінюй текстуру/іконку залежно від стану.
4. При наведенні на карту відтворюй короткий звук із `rate: 1.5` (вищим тоном).
5. **Бонус:** реалізуй "ducking" — коли граєш `complete.mp3` (виграш), фонова музика приглушується до 0.1, через 2 сек повертається до 0.3. Використовувати tween на властивості `volume`.

[Глава 9. Камера](./09-camera.md)
