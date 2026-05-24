# Глава 8. Звук

Звук в Phaser — через **Sound Manager** (`this.sound`). Под капотом два бэкенда:

- **WebAudio** — современный, рекомендуется. Поддерживает 3D, эффекты, точное время.
- **HTML5 Audio** — фолбэк для старых браузеров и слабых девайсов.

Phaser **сам выбирает** WebAudio, если он доступен.

## Загрузка звука

```js
preload() {
  // Простой файл
  this.load.audio('click', 'assets/sounds/click.mp3');

  // Несколько форматов (выбирается лучший поддерживаемый)
  this.load.audio('theme', [
    'assets/sounds/theme.ogg',
    'assets/sounds/theme.mp3',
    'assets/sounds/theme.m4a'
  ]);
}
```

### Какие форматы поддерживаются

| Формат | Поддержка |
|---|---|
| **MP3** | Все современные браузеры |
| **OGG** | Все, кроме старого Safari |
| **M4A/AAC** | Safari, Chrome |
| **WEBM** | Chrome, Firefox |
| **WAV** | Все, но огромный размер |

**Совет:** для коротких SFX (< 5 сек) используй **MP3 96 kbps**, для музыки — **OGG/MP3 128 kbps**.

## Воспроизведение (быстрый способ)

```js
// Просто проиграть
this.sound.play('click');

// С опциями
this.sound.play('click', {
  volume: 0.5,
  rate: 1.5,        // скорость
  detune: 100,      // расстройка в центах (-1200..1200)
  loop: false,
  delay: 0
});
```

Этот способ удобен для коротких звуков, но **не возвращает** объект — его нельзя остановить.

## Воспроизведение через инстанс (правильный способ)

```js
const music = this.sound.add('theme', { loop: true, volume: 0.3 });
music.play();

music.pause();
music.resume();
music.stop();

music.setVolume(0.5);
music.setRate(2);          // в 2 раза быстрее
music.setDetune(-300);
music.setLoop(true);

music.isPlaying;
music.isPaused;

music.destroy();
```

## События звука

```js
const sfx = this.sound.add('explosion');

sfx.on('play',     () => console.log('start'));
sfx.on('complete', () => console.log('done'));
sfx.on('stop',     () => console.log('stopped'));
sfx.on('looped',   () => console.log('loop iteration'));

sfx.play();
```

## Глобальные настройки

```js
// Громкость для всех звуков сразу
this.sound.volume = 0.5;
this.sound.setVolume(0.5);

// Mute
this.sound.mute = true;
this.sound.setMute(true);

// Пауза/возобновление всех звуков
this.sound.pauseAll();
this.sound.resumeAll();
this.sound.stopAll();

// Остановить конкретный по ключу
this.sound.stopByKey('theme');
```

## Audio Sprite — много звуков в одном файле

Идеально для коротких SFX в слотах (клик, спин, win, кнопки).

### Подготовка

Используй [audiosprite-tool](https://github.com/tonistiigi/audiosprite) или [ffmpeg](https://ffmpeg.org/). Получишь файл + JSON:

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

### Загрузка и использование

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

  // Через инстанс (с управлением)
  const winSound = this.sound.addAudioSprite('sfx');
  winSound.play('big-win');
}
```

**Преимущества:**
- Один HTTP-запрос
- Меньше задержки на старте
- На мобильных — обходит лимиты на количество одновременных Audio-объектов

## Громкость, fade, кросс-фейд

```js
// Плавное появление
const music = this.sound.add('theme', { volume: 0 });
music.play();
this.tweens.add({
  targets: music,
  volume: 0.5,
  duration: 2000
});

// Плавное исчезновение
this.tweens.add({
  targets: music,
  volume: 0,
  duration: 1500,
  onComplete: () => music.stop()
});

// Кроссфейд между двумя треками
function crossfade(scene, oldMusic, newKey, duration = 2000) {
  const newMusic = scene.sound.add(newKey, { loop: true, volume: 0 });
  newMusic.play();

  scene.tweens.add({ targets: oldMusic, volume: 0, duration, onComplete: () => oldMusic.stop() });
  scene.tweens.add({ targets: newMusic, volume: 0.5, duration });

  return newMusic;
}
```

## Один звук много раз одновременно

Если нужен звук-спам (стрельба, щелчки), используй `play()` с одного объекта — он автоматически порождает копии:

```js
const click = this.sound.add('click');
click.play();
click.play();   // вторая копия играет одновременно
click.play();   // и третья
```

Или, для гарантии, через short-form:

```js
this.sound.play('click');
this.sound.play('click');
```

## Автоплей и iOS — главная боль

iOS и современные браузеры **запрещают** воспроизведение звука без жеста пользователя. Если звук должен играть с самого начала — он начнёт играть только после первого клика/тапа.

### Решение: контекст разблокируется автоматически

Phaser сам разблокирует WebAudio при первом взаимодействии. Но **первый звук** до взаимодействия не воспроизведётся.

### Паттерн: "Tap to start"

```js
// Стартовый экран
const tapText = this.add.text(640, 360, 'Tap to start', { fontSize: '40px' }).setOrigin(0.5);
this.input.once('pointerdown', () => {
  // Здесь WebAudio уже разблокирован
  this.sound.play('theme');
  this.scene.start('GameScene');
});
```

### Проверка состояния

```js
if (this.sound.locked) {
  console.log('Аудио заблокировано до взаимодействия');
}

this.sound.once('unlocked', () => {
  console.log('Разблокировано');
  this.sound.play('theme');
});
```

## Звук в фоне (когда вкладка неактивна)

По умолчанию Phaser приостанавливает звук, когда вкладка неактивна. Управлять можно так:

```js
// В config:
audio: {
  disableWebAudio: false
},

// Или вручную в сцене:
this.sound.pauseOnBlur = false;  // продолжать играть в фоне
```

## Spatial / 3D звук (WebAudio)

Можно ставить звук в 3D-пространстве (для FPS, гонок). Для слотов почти не нужно, но знать полезно:

```js
const sfx = this.sound.add('engine');
sfx.play();
sfx.setPan(-1);   // -1 = левое ухо, 0 = центр, 1 = правое
```

## Звуковая архитектура для слот-игры

Типичный слот имеет:

```
🎵 Background music — заглушает себя при big-win
🔊 Reel spin loop — играет пока крутятся барабаны
🔊 Reel stop — на каждый стоп барабана
🔊 Symbol win — для каждого выигрышного символа (или один общий)
🔊 Counter ticks — пока цифры выигрыша считаются
🎉 Big win jingle — поверх музыки
🔘 Button clicks — при нажатии кнопок
```

Пример менеджера звука:

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

Использование:
```js
this.audio = new AudioManager(this);
this.audio.playMusic('theme');
this.audio.sfx('click');

// При большом выигрыше
this.audio.duckMusic();
this.audio.sfx('big-win');
this.time.delayedCall(3000, () => this.audio.unduckMusic());
```

## Подводные камни

| Проблема | Решение |
|---|---|
| Звук не играет на iOS | Нужно взаимодействие пользователя перед первым проигрыванием |
| Latency высокий | Используй WebAudio (по умолчанию). HTML5 — медленный |
| Слишком много одновременных звуков | Ограничь количество, используй pool |
| Музыка перезапускается при смене сцен | Создавай в `BootScene` и не уничтожай: `music.persist = true` или храни глобально |
| Звук обрезается при `play()` | Установи `'mp3'` с пустым началом или используй WebAudio |

---

## ✅ Упражнение 8

1. Загрузи `assets/sounds/theme.mp3` как фоновую музыку с `loop: true, volume: 0.3`. Запусти в `GameScene`.
2. Загрузи `assets/sounds/card.mp3`. По клику на любую карту — играй этот звук.
3. Сделай **кнопку Mute** в углу — переключает `this.sound.mute`. Меняй текстуру/иконку в зависимости от состояния.
4. При наведении на карту воспроизводи короткий звук с `rate: 1.5` (повыше тоном).
5. **Бонус:** реализуй "ducking" — когда играешь `complete.mp3` (выигрыш), фоновая музыка приглушается до 0.1, через 2 сек возвращается к 0.3. Использовать tween на свойстве `volume`.

[Глава 9. Камера](./09-camera.md)
