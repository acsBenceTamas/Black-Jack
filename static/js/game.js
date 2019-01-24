let currentPlayer = 1;
let gameSpace = document.getElementById('game-space');
const cards = JSON.parse(gameSpace.dataset.cards);
const imagePath = gameSpace.dataset.imagePath;
let gameActive = false;
let deck;
gameSpace.addEventListener('click', gameClick);
let activePlayers = getActivePlayers();
let betAmounts = [];
let playersOut = [];

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
    if (event.target.id.toString() === 'button-new-game') {
        startNewGame();
    } else if (gameActive && event.target.classList.contains('btn-primary')) {
        if (event.target.classList.contains('draw-card')) {
            drawCard(currentPlayer);
            advanceRound();
        } else if (event.target.classList.contains('stop-drawing')) {
            stopDrawing(currentPlayer);
            advanceRound();
        } else if (event.target.classList.contains('bet-btn')) {
            const player = Number(event.target.closest(".player-hand").dataset.player);
            const amount = Number(event.target.dataset.value);
            updateBetFieldForPlayer(player, amount);
        } else if (event.target.classList.contains('bet')) {
            addBetToPlayer(currentPlayer, getPlayerBetAmount(currentPlayer));
        }
    }
}

function addBetToPlayer( player, amount ) {
    if (activePlayers[player -1 ].chips >= amount) {
        activePlayers[player -1 ].chips -= amount;
        betAmounts[player - 1] += amount;
        updatePlayerChipsInLocalStorage( player, -amount);
        updateChipsFieldForPlayer( player, activePlayers[player -1 ].chips );
    } else {
        alert("You don't have enough chips to bet any more.");
    }
}

function updatePlayerChipsInLocalStorage( player, amount) {
    let name = activePlayers[player - 1].name;
    let allPlayers = JSON.parse(localStorage.getItem('players'));
    for ( let player of allPlayers) {
        if (player.name === name) {
            player.chips += amount;
            break;
        }
    }
    localStorage.setItem("players", JSON.stringify(allPlayers));
}

function updateBetFieldForPlayer( player, amount ) {
    document.querySelector(`#player-hand${player} .bet-box`).value = amount;
}

function updateChipsFieldForPlayer( player, amount ) {
    document.querySelector(`#player-hand${player} .chips-left`).innerText = amount.toString();
}

function createPlayerHand( index = "bank" ) {
    let playerHand = document.createElement('div');
    playerHand.id = isNaN(index) ? "player-hand0" : `player-hand${index+1}`;
    playerHand.classList.add("player-hand");
    playerHand.dataset.player = isNaN(index) ? "0" : (index+1).toString();
    playerHand.dataset.toggle = "tooltip";
    playerHand.title = "0";
    let buttons = isNaN(index) ? "" :
        `<img src="${imagePath}chips.png" width="60" height="60"><br>
        <span class="chips-left">${activePlayers[index].chips}</span><br>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} draw-card">Draw card</button>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} stop-drawing">Stop drawing</button>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} bet-btn" data-value="5"> 5</button>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} bet-btn" data-value="10"> 10</button>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} bet-btn" data-value="50"> 50</button>
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} bet-btn" data-value="100"> 100</button>
        <input type="text" class="bet-box" size="2" value="5">
        <button class="${index === 0 ? 'btn-primary' : 'btn-secondary'} bet" > BET</button>
        `;
    playerHand.innerHTML = buttons + `<strong>Name:</strong> ${isNaN(index) ? "Bank" : activePlayers[index].name}`;
    document.getElementById("player-hands").appendChild(playerHand);
    betAmounts.push(0);
}

function getPlayerBetAmount( player ) {
    return Number(document.querySelector(`#player-hand${player} .bet-box`).value);
}

function advanceRound() {
    toggleButtonsForPlayer(currentPlayer);
    currentPlayer = currentPlayer % activePlayers.length + 1;
    while (playersOut.includes(currentPlayer)) {
        currentPlayer = currentPlayer % activePlayers.length + 1;
    }
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
    gameActive = true;
    toggleButtonsForPlayer(currentPlayer);
    currentPlayer = 1;
    toggleButtonsForPlayer(currentPlayer);
    playersOut = [];
}

function countPoints(playerId) {
    const cards = document.querySelectorAll(`#player-hand${playerId} .game-card`);
    let pointCount = 0;
    for (let card of cards) {
        pointCount += Number(card.dataset.value);
    }
    document.getElementById(`player-hand${playerId}`).title = pointCount.toString();
    return document.getElementById(`player-hand${playerId}`).title = pointCount.toString();
}

function stopDrawing(player) {
    playersOut.push(player);
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
    gameActive = false;
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
    gameActive = false;
}

function generatePlayerHands() {
    createPlayerHand("bank");
    for (i = 0; i < activePlayers.length; i++) {
        createPlayerHand(i);
    }
}

function startingChips(currentPlayer) {
    let chips = {'player': currentPlayer, 'chips': 500};
    localStorage.setItem('countchips', JSON.stringify(chips));
}


function countingChips(currentPlayer) {
    let bet = document.getElementById('bet-box').value;
}

function countPlayerCards(player) {
    return document.getElementById(`player-hand${player}`).getElementsByTagName('img').length;
}

function playerWins(player) {
    alert('Player won!');
    gameActive = false;
}

generatePlayerHands();
startNewGame();
