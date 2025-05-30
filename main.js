// Helper: Random Blob Shape
function getRandomBlobShape() {
  const radius1 = Math.floor(Math.random() * 50 + 50);
  const radius2 = Math.floor(Math.random() * 50 + 50);
  const radius3 = Math.floor(Math.random() * 50 + 50);
  const radius4 = Math.floor(Math.random() * 50 + 50);
  return `${radius1}% ${100 - radius1}% ${radius2}% ${100 - radius2}% / ${radius3}% ${radius4}% ${100 - radius4}% ${100 - radius3}%`;
}

// Feed logic
function feedMicrobe() {
  const microbe = document.getElementById('microbe');
  const pickedColor = document.getElementById('colorPicker').value;
  microbe.style.background = pickedColor;
  microbe.style.borderRadius = getRandomBlobShape();

  // Wiggle animation
  microbe.style.animation = 'wiggle 0.6s ease';
  setTimeout(() => {
    microbe.style.animation = 'swim 6s ease-in-out infinite';
  }, 600);

  showHeart();
  document.getElementById('feedback').innerText = 'You fed your microbe! 🍓';
  new Audio('assets/sound/feed.mp3').play();
}

// Floating heart
function showHeart() {
  const heart = document.getElementById('heart');
  const microbe = document.getElementById('microbe');
  const rect = microbe.getBoundingClientRect();

  heart.style.left = rect.left + 20 + 'px';
  heart.style.top = rect.top - 10 + 'px';
  heart.style.opacity = 1;
  heart.style.animation = 'floatUp 1s ease forwards';

  setTimeout(() => {
    heart.style.opacity = 0;
    heart.style.animation = '';
  }, 1000);
}

// Color picker behavior
document.getElementById('colorPicker').addEventListener('input', (e) => {
  document.getElementById('microbe').style.background = e.target.value;
});

// Save & display name
function setName() {
  const name = document.getElementById('nameInput').value;
  localStorage.setItem('microbeName', name);
  document.getElementById('nameDisplay').innerText = `Hi, I'm ${name}!`;
}

// Load name on start
window.onload = () => {
  const savedName = localStorage.getItem('microbeName');
  if (savedName) {
    document.getElementById('nameDisplay').innerText = `Hi, I'm ${savedName}!`;
  }
};
let petScale = 1;
const maxScale = 2.5; // Max growth limit

document.getElementById('feedButton').addEventListener('click', () => {
  const pet = document.getElementById('microbe');
  const heart = document.createElement('div');
  heart.classList.add('heart');
  pet.appendChild(heart);

  // Trigger heart animation
  setTimeout(() => {
    pet.removeChild(heart);
  }, 1000);

  // GROWTH LOGIC
  if (petScale < maxScale) {
    petScale += 0.05;
    pet.style.transform = `scale(${petScale})`;
  }
});

