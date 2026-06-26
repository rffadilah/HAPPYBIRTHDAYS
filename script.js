window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const card = document.querySelector('.card');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    card.classList.add('show');
  }, 2400);
});
