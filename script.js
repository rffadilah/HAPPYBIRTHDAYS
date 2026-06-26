window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const card = document.querySelector('.card');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    card.classList.add('show');
  }, 2400);

  startMusic();
  burstConfetti();
});

const surpriseBox = document.getElementById('surpriseBox');
const confettiLayer = document.getElementById('confettiLayer');

const audioState = {
  context: null,
  gainNode: null,
  playing: false,
  timer: null,
  audioElement: null,
};

function initAudio() {
  if (audioState.audioElement) return;

  audioState.audioElement = document.createElement('audio');
  audioState.audioElement.src = 'https://cdn.pixabay.com/audio/2022/07/29/audio_124bfa6c1b.mp3';
  audioState.audioElement.loop = true;
  audioState.audioElement.preload = 'auto';
  audioState.audioElement.volume = 0.25;
  document.body.appendChild(audioState.audioElement);
}

function startMusic() {
  initAudio();

  if (!audioState.audioElement) return;

  const playPromise = audioState.audioElement.play();
  if (playPromise && typeof playPromise.then === 'function') {
    playPromise.catch(() => {
      window.addEventListener('pointerdown', () => {
        audioState.audioElement.play().catch(() => {});
      }, { once: true });
    });
  }

  audioState.playing = true;
}

function stopMusic() {
  if (!audioState.audioElement) return;
  audioState.audioElement.pause();
  audioState.playing = false;
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

surpriseBox.hidden = false;
