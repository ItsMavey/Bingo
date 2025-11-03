import './style.css';
import { generateUniqueRandomNumber, resetUsedNumbers } from './numberGenerator.js';

// Inject UI
document.querySelector('#app').innerHTML = `
  <h1>BINGO DDV</h1>
  <h2>2025</h2>
  <pre id="numbers">00</pre>
  <div class="buttons">
    <button id="start">Nouveau nombre</button>
    <button id="verify">Vérification</button>
    <button id="reset">Réinitialiser</button>
  </div>

  <!-- Modal -->
  <div id="verifyModal" class="modal hidden">
    <div class="modal-content">
      <h3>Vérifier vos numéros</h3>
      <form id="verifyForm">
        <div class="inputs">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
          <input type="number" min="0" max="99" placeholder="00">
        </div>
        <div class="modal-buttons">
          <button type="submit">Vérifier</button>
          <button type="button" id="closeModal">Fermer</button>
        </div>
      </form>
    </div>
  </div>
`;

let usedNumbers = new Set();
const numberDisplay = document.getElementById('numbers');
const startButton = document.getElementById('start');
const verifyButton = document.getElementById('verify');
const resetButton = document.getElementById('reset');
const modal = document.getElementById('verifyModal');
const closeModal = document.getElementById('closeModal');
const verifyForm = document.getElementById('verifyForm');

// Events
startButton.addEventListener('click', () => {
    try {
        const random = generateUniqueRandomNumber(0, 99);

        // Store it logically first
        usedNumbers.add(random);

        // Animate the display (visual only)
        numberDisplay.classList.remove('spin');
        void numberDisplay.offsetWidth;
        numberDisplay.classList.add('spin');

        // Update text after animation start
        setTimeout(() => {
            numberDisplay.textContent = random.toString().padStart(2, '0');
        }, 150); // adjust timing if needed
    } catch {
        numberDisplay.textContent = '🎉 FIN';
    }
});

resetButton.addEventListener('click', () => {
    resetUsedNumbers();
    usedNumbers.clear();
    numberDisplay.textContent = '00';
});

// Show modal
verifyButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Handle verification
verifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = verifyForm.querySelectorAll('input');
    inputs.forEach(input => {
        const num = parseInt(input.value, 10);
        if (isNaN(num)) {
            input.style.border = '2px solid gray';
        } else if (usedNumbers.has(num)) {
            input.style.border = '2px solid #4CAF50'; // green
            input.style.background = 'rgba(76, 175, 80, 0.15)';
        } else {
            input.style.border = '2px solid #E53935'; // red
            input.style.background = 'rgba(229, 57, 53, 0.15)';
        }
    });
});


modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});