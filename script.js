// nomes das imagens (adicione/renomeie conforme seus arquivos em img/)
const images = [
  'hello-kitty-1.png',
  'hello-kitty-2.png',
  'hello-kitty-3.png',
  'hello-kitty-4.png',
  'hello-kitty-5.png',
  'hello-kitty-6.png',
  'hello-kitty-7.png'
];

const card = document.getElementById('card');
const kitty = document.getElementById('kitty');
const thumbs = document.getElementById('thumbs');

let index = 0;
let animating = false;

// cria miniaturas
images.forEach((src, i) => {
  const btn = document.createElement('button');
  btn.className = 'thumb-btn';
  btn.setAttribute('aria-label', `Pose ${i+1}`);
  const img = document.createElement('img');
  img.src = src;
  btn.appendChild(img);
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setImage(i);
  });
  thumbs.appendChild(btn);
});

function updateActiveThumb() {
  const buttons = thumbs.querySelectorAll('.thumb-btn');
  buttons.forEach((b, i) => b.classList.toggle('active', i === index));
}

// troca de imagem com fade
function setImage(newIndex) {
  if (animating || newIndex === index) return;
  animating = true;

  // fade out
  kitty.style.opacity = 0;
  kitty.style.transform = 'scale(.98)';

  setTimeout(() => {
    kitty.src = images[newIndex];
    // small delay para garantir troca antes do fade in
    setTimeout(() => {
      kitty.style.opacity = 1;
      kitty.style.transform = 'scale(1)';
      index = newIndex;
      updateActiveThumb();
      setTimeout(() => animating = false, 360);
    }, 80);
  }, 220);
}

// clique no cartão: próxima pose (ciclo)
card.addEventListener('click', () => {
  let next = (index + 1) % images.length;
  setImage(next);
});

// suporte teclado: Enter / Espaço para trocar
card.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    let next = (index + 1) % images.length;
    setImage(next);
  }
});

// inicializa
updateActiveThumb();
