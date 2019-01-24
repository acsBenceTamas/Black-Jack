let currentPlayer = 1;
let gameSpace = document.getElementById('game-space');
const cards = JSON.parse(gameSpace.dataset.cards);
const imagePath = gameSpace.dataset.imagePath;
let deck;
gameSpace.addEventListener('click', gameClick);
let activePlayers = getActivePlayers();

function getActivePlayers() {
    const allPlayers = JSON.parse(localStorage.getItem('players'));
    let activePlayers = [];
    for (let player of allPlayers) {
        if (Number(player.selected) === 1) {
            activePlayers.push(player);
        }
    }
    return activePlayers;
}

function gameClick(event) {
    if (event.target.classList.contains('btn-primary')) {
        if (event.target.classList.contains('draw-card')) {
            drawCard(currentPlayer);
            advanceRound();
        } else if (event.target.classList.contains('')) {
            stopDrawing(currentPlayer);
        }
    } else if (event.target.id.toString() === 'button-new-game') {
        startNewGame();
    } else if (event.target.classList.contains('bet-btn')) {
        document.getElementById('bet-box').setAttribute("value", event.target.dataset.value);
    } else if (event.target.classList.contains('bet')) {
        let retchips = JSON.parse(localStorage.getItem('countchips'));
        retchips['chips'] = retchips['chips'] - document.getElementById('bet-box').value;
        document.getElementById('chips-left').innerHTML = retchips['chips'];
    }
}

function advanceRound() {
    toggleButtonsForPlayer(currentPlayer);
    currentPlayer = currentPlayer % activePlayers.length + 1;
    toggleButtonsForPlayer(currentPlayer);
}

function toggleButtonsForPlayer(player) {
    for (let button of document.querySelectorAll(`#player-hand${currentPlayer} button`)) {
        button.classList.toggle("btn-primary");
        button.classList.toggle("btn-secondary");
    }
}

function drawCard(player) {
    const cardPosition = Math.floor(Math.random() * deck.length);
    const cardId = deck[cardPosition];
    deck.splice(cardPosition, 1);
    const card = getCardById(cardId);
    const img = document.createElement('img');
    img.classList.add('game-card');
    img.src = imagePath + card['image'] + '.png';
    img.dataset.value = card['value'];
    img.width = 69;
    img.height = 105;
    document.getElementById(`player-hand${player}`).appendChild(img);
    countPoints(player);
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
    for (let i = 0; i < 2 ; i++) {
        for (let j = -1; j < activePlayers.length; j++ ) {
            drawCard(j+1);
        }
    }
    startingChips(currentPlayer)
    let retchips = JSON.parse(localStorage.getItem('countchips'));
    document.getElementById('chips-left').innerHTML = retchips['chips'];
    console.log('retchips: ', retchips);
}

function countPoints(playerId) {
    const cards = document.querySelectorAll(`#player-hand${playerId} .game-card`);
    let pointCount = 0;
    for (let card of cards) {
        pointCount += Number(card.dataset.value);
    }
    document.getElementById(`player-hand${playerId}`).title = pointCount.toString();
}


function startingChips(currentPlayer) {
    let chips = {'player': currentPlayer, 'chips': 500};
    localStorage.setItem('countchips', JSON.stringify(chips));
}


function countingChips(currentPlayer) {
    let bet = document.getElementById('bet-box').value;


}



function generatePlayerHands() {
    createPlayerHand("bank");
    for (i = 0; i < activePlayers.length; i++) {
        createPlayerHand(i);
    }
}

function createPlayerHand( index = "bank" ) {
    let playerHand = document.createElement('div');
    playerHand.id = isNaN(index) ? "player-hand0" : `player-hand${index+1}`;
    playerHand.classList.add("player-hand");
    playerHand.dataset.player = isNaN(index) ? "0" : (index+1).toString();
    playerHand.dataset.toggle = "tooltip";
    playerHand.title = "0";
    let buttons = isNaN(index) ? "" :
        `<button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} draw-card">Draw card</button>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} stop-drawing">Stop drawing</button>
        `;
    playerHand.innerHTML = buttons + `<strong>Name:</strong> ${isNaN(index) ? "Bank" : activePlayers[index].name}`;
    document.getElementById("player-hands").appendChild(playerHand);
}

generatePlayerHands();
startNewGame();