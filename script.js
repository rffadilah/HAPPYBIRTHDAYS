window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const card = document.querySelector('.card');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    card.classList.add('show');
  }, 2400);
});

const musicToggle = document.getElementById('musicToggle');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseBox = document.getElementById('surpriseBox');
const confettiLayer = document.getElementById('confettiLayer');

const audioState = {
  context: null,
  gainNode: null,
  playing: false,
  timer: null,
};

function initAudio() {
  if (audioState.context) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  audioState.context = new AudioContext();
  audioState.gainNode = audioState.context.createGain();
  audioState.gainNode.gain.value = 0.04;
  audioState.gainNode.connect(audioState.context.destination);
}

function playTone(freq, duration, type = 'sine', time = audioState.context.currentTime, gain = 0.03) {
  const oscillator = audioState.context.createOscillator();
  const gainNode = audioState.context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, time);
  gainNode.gain.setValueAtTime(gain, time);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioState.gainNode);

  oscillator.start(time);
  oscillator.stop(time + duration);
}

function playSequence() {
  const melody = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66];
  melody.forEach((note, index) => {
    const time = audioState.context.currentTime + index * 0.24;
    const type = index % 2 === 0 ? 'triangle' : 'sine';
    playTone(note, 0.2, type, time, 0.025);
  });
}

function startMusic() {
  initAudio();
  if (audioState.context.state === 'suspended') {
    audioState.context.resume();
  }

  if (audioState.playing) return;

  audioState.playing = true;
  musicToggle.textContent = '🔇 Stop Musik';

  playSequence();
  audioState.timer = window.setInterval(() => {
    playSequence();
  }, 1800);
}

function stopMusic() {
  if (!audioState.playing) return;

  window.clearInterval(audioState.timer);
  audioState.playing = false;
  musicToggle.textContent = '🎵 Putar Musik';
}

function burstConfetti() {
  const colors = ['#ffd166', '#ff5fa2', '#ffffff', '#ff7aa2', '#ffe180'];

  for (let i = 0; i < 45; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 220}px`);
    piece.style.animationDuration = `${2.2 + Math.random() * 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.15}s`;
    confettiLayer.appendChild(piece);

    window.setTimeout(() => piece.remove(), 4200);
  }
}

musicToggle.addEventListener('click', () => {
  if (audioState.playing) {
    stopMusic();
  } else {
    startMusic();
  }
});

surpriseBtn.addEventListener('click', () => {
  surpriseBox.hidden = false;
  burstConfetti();
  if (!audioState.playing) {
    startMusic();
  }
});
