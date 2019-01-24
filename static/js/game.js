let currentPlayer = 1;
let gameSpace = document.getElementById('game-space');
const cards = JSON.parse(gameSpace.dataset.cards);
const imagePath = gameSpace.dataset.imagePath;
let deck;
gameSpace.addEventListener('click', gameClick);
gameSpace.addEventListener("mouseover", gameHover);

function gameClick(event) {
    if (event.target.classList.contains('btn-primary') && event.target.classList.contains('draw-card')) {
        drawCard(currentPlayer);
        if (playerLoseCheck(currentPlayer)) {
            playerLost(currentPlayer);
        }
    } else if (event.target.id == 'button-new-game') {
        startNewGame();
    } else if (event.target.classList.contains('btn-primary') && event.target.classList.contains('stop-drawing')) {
        stopDrawing();
        handleBank();
    }
}

function gameHover(event) {
    /*if (event.target.classList.contains("player-hand")) {
        event.target.title = countPoints(event.target.dataset.player);
    }*/
}

function drawCard(currentPlayer) {
    const cardPosition = Math.floor(Math.random() * deck.length);
    const cardId = deck[cardPosition];
    deck.splice(cardPosition, 1);
    // console.log(deck, cardId);
    const card = getCardById(cardId);
    const img = document.createElement('img');
    img.classList.add('game-card');
    img.src = imagePath + card['image'] + '.png';
    img.dataset.value = card['value'];
    img.width = 69;
    img.height = 105;
    document.getElementById('player-hand' + currentPlayer).appendChild(img);
    countPoints(currentPlayer);
}

function getCardById(id) {
    for (let card of cards) {
        if (card['id'] === id) {
            return card;
        }
    }
}

function startNewGame() {
    let cards = document.getElementsByClassName('game-card');
    for (let i = cards.length; i > 0; i--) {
        cards[i - 1].remove();
    }
    deck = JSON.parse(gameSpace.dataset.ids);
    drawCard(1);
    drawCard(0);
    drawCard(1);
    drawCard(0);
}

function countPoints(playerId) {
    const cards = document.querySelectorAll(`#player-hand${playerId} .game-card`);
    let pointCount = 0;
    for (let card of cards) {
        pointCount += Number(card.dataset.value);
    }
    // console.log(`#player-hand${playerId}`);
    return document.getElementById(`player-hand${playerId}`).title = pointCount.toString();
}

function stopDrawing() {
    let scoreCurrentPlayer = Number(countPoints(1));
    let scorePlayer0 = Number(countPoints(0));
}

function handleBank() {
    let highestPlayerScore = Number(countPoints(1));
    let bankScore = Number(countPoints(0));
    while (bankScore <= highestPlayerScore && bankScore !== 21) {
        drawCard(0);
        bankScore = Number(countPoints(0));
    }
    if (bankScore > 21) {
        playersWin();
    } else {
        checkWinners();
    }
}

function playersWin() {
    alert('Player wins');
}

function checkWinners() {
    let playerScore = Number(countPoints(1));
    let bankScore = Number(countPoints(0));
    if (bankScore < playerScore) {
        playerWins(1);
    } else if (bankScore === playerScore) {
        if (countPlayerCards(0) >= countPlayerCards(1)) {
            playerWins(1);
        } else {
            playerLost(1);
        }
    } else {
        playerLost(1);
    }
}

function playerLoseCheck(player) {
    return Number(countPoints(player)) > 21;
}

function playerLost(player) {
    alert('Player lost');
}

function countPlayerCards(player) {
    return document.getElementById(`player-hand${player}`).getElementsByTagName('img').length;
}

function playerWins(player) {
    alert('Player won!');
}
