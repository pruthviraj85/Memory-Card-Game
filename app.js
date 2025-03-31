const emojis = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🎪', '🎯'];
const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const winModal = document.getElementById('winModal');

let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let timer = 0;
let timerInterval;

function createCards() {
    const cardPairs = [...emojis, ...emojis];
    cardPairs.sort(() => Math.random() - 0.5);

    cardPairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <div class="card-front">${emoji}</div>
            <div class="card-back">?</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(this)) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }

    if (moves === 1) {
        startTimer();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const emoji1 = card1.querySelector('.card-front').textContent;
    const emoji2 = card2.querySelector('.card-front').textContent;

    if (emoji1 === emoji2) {
        matches++;
        flippedCards = [];
        if (matches === emojis.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timeDisplay.textContent = timer;
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = timer;
    winModal.style.display = 'flex';
}

function resetGame() {
    gameBoard.innerHTML = '';
    cards = [];
    flippedCards = [];
    moves = 0;
    matches = 0;
    timer = 0;
    movesDisplay.textContent = '0';
    timeDisplay.textContent = '0';
    clearInterval(timerInterval);
    winModal.style.display = 'none';
    createCards();
}

createCards();