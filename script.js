const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => gameState.every(cell => cell !== '');



const handleCellClick = (e) => {
    const cellIndex = e.target.dataset.index;

    if (gameState[cellIndex] || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    updateStatus();
};

const restartGame = () => {
    gameState.fill('');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => (cell.textContent = ''));
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);




const boomContainer = document.getElementById('boom-container');

const createBoomEffect = () => {
    boomContainer.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const angle = Math.random() * 2 * Math.PI; 
        const distance = Math.random() * 200 + 50; 
        const dx = Math.cos(angle) * distance; 
        const dy = Math.sin(angle) * distance; 

        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);

        particle.style.backgroundColor = randomColor();

        boomContainer.appendChild(particle);
    }

    setTimeout(() => {
        boomContainer.innerHTML = '';
    }, 1000);
};

const randomColor = () => {
    const colors = ['#FFD700', '#FF4500', '#4A90E2', '#9013FE', '#50E3C2'];
    return colors[Math.floor(Math.random() * colors.length)];
};

const updateStatus = () => {
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        createBoomEffect(); 
        gameActive = false;
    } else if (checkDraw()) {
        statusText.textContent = "It's a draw! 🤝";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
};
