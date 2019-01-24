let currentPlayer = 1;
let gameSpace = document.getElementById('game-space');
const cards = JSON.parse(gameSpace.dataset.cards);
const imagePath = gameSpace.dataset.imagePath;
let activePlayers = getActivePlayers();
if (localStorage.getItem("game-active") == null) {localStorage.setItem("game-active", "false")}
if (localStorage.getItem("game-state") == null) {generateDefaultGameState()}
let deck = JSON.parse(gameSpace.dataset.ids);
gameSpace.addEventListener('click', gameClick);
let betAmounts = [];

function generateDefaultGameState() {
    let defaultPlayerHands = [[]];
    let defaultBetAmounts = [];
    for (let player of activePlayers) {defaultPlayerHands.push([]); defaultBetAmounts.push(0);}
    localStorage.setItem("game-state", JSON.stringify(
        {
            playerHands: defaultPlayerHands,
            betAmounts: defaultBetAmounts,
            currentPlayer: 1,
            playersOut: [],
            winners: [],
            gameOver: false}
        )
    )
}

function getGameState() {
    return JSON.parse(localStorage.getItem("game-state"));
}

function setGameState(gameState) {
    localStorage.setItem("game-state", JSON.stringify(gameState));
}

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

function endCurrentGame() {
    localStorage.setItem("game-active", "false");
    clearAllCards();
    generateDefaultGameState();
}

function gameClick(event) {
    if (event.target.id.toString() === 'button-new-game') {
        startNewGame();
    } else if (localStorage.getItem("game-active") === "true" && event.target.classList.contains('btn-primary')) {
        if (event.target.classList.contains('draw-card')) {
            drawCard(currentPlayer);
            if (playerLoseCheck(currentPlayer)) {
                stopDrawing(currentPlayer);
            }
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
    let name = activePlayers[player].name;
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
    let playersOut = getGameState().playersOut;
    if (playersOut.length < activePlayers.length) {
        toggleButtonsForPlayer(currentPlayer);
        currentPlayer = currentPlayer % activePlayers.length + 1;
        while (playersOut.includes(currentPlayer)) {
            currentPlayer = currentPlayer % activePlayers.length + 1;
        }
        toggleButtonsForPlayer(currentPlayer);
    } else {
        handleBank();
        setGameOverState(true);
        gameOver();
    }
}

function gameOver() {
    givePrizesForWinners();
    let modal = $('#game-over-modal');
    document.querySelector("#game-over-modal .game-over-text").remove();
    document.querySelector('#game-over-modal .modal-body').appendChild(generateGameOverText());
    modal.modal({backdrop: "static"});
    localStorage.setItem("game-active", "false");
}

function generateGameOverText() {
    let gameOverText = document.createElement('div');
    gameOverText.classList.add("game-over-text");
    const gameState = getGameState();
    let bankScore = document.createElement('p');
    bankScore.innerText = `Bank score: ${countPoints(0)}`;
    gameOverText.appendChild(bankScore);
    for (let i=0; i < activePlayers.length; i++) {
        let paragraph = document.createElement('p');
        paragraph.innerText = `${activePlayers[i].name} ${gameState.winners.includes(i+1) ? "won " + (gameState.betAmounts[i] * 2).toString() : "lost " + (gameState.betAmounts[i]).toString()} chips. Score: ${countPoints(i+1)}`;
        gameOverText.appendChild(paragraph);
    }
    return gameOverText;
}

function checkGameOver() {
    const gameState = getGameState();
    if (gameState.gameOver) {
        gameOver();
    }
}

function setGameOverState( state ) {
    let gameState = getGameState();
    gameState.gameOver = state;
    setGameState(gameState)
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
    let gameState = getGameState();
    gameState.playerHands[player].push(cardId);
    setGameState(gameState);
    card = createCard(cardId);
    document.getElementById(`player-hand${player}`).appendChild(card);
    countPoints(player);
}

function createCard( id ) {
    const card = getCardById(id);
    const img = document.createElement('img');
    img.classList.add('game-card');
    img.src = imagePath + card['image'] + '.png';
    img.dataset.value = card['value'];
    img.width = 69;
    img.height = 105;
    return img;
}

function getCardById(id) {
    for (let card of cards) {
        if (card['id'] === id) {
            return card;
        }
    }
}

function startNewGame() {
    if (activePlayers.length > 0) {
        clearAllCards();
        generateDefaultGameState();
        deck = JSON.parse(gameSpace.dataset.ids);
        if (localStorage.getItem("game-active") === "false") {
            for (let i = 0; i < 2 ; i++) {
                for (let j = -1; j < activePlayers.length; j++ ) {
                    drawCard(j+1);
                }
            }
            localStorage.setItem("game-active", "true");
            toggleButtonsForPlayer(currentPlayer);
            currentPlayer = 1;
            toggleButtonsForPlayer(currentPlayer);
        } else {
            alert("You must end the current game first!");
        }
    } else {
        alert("Can not start a new game without players!");
    }
}

function clearAllCards() {
    let cards = document.getElementsByClassName('game-card');
    for (let i = cards.length; i > 0; i--) {
        cards[i - 1].remove();
    }
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
    let gameState = getGameState();
    gameState.playersOut.push(player);
    setGameState(gameState)
}

function handleBank() {
    let highestPlayerScore = getHighestPlayerScore();
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

function getHighestPlayerScore() {
    let highestScore = 0;
    let playerHands = document.getElementsByClassName("player-hand");
    for (let i = 1; i < playerHands.length ; i++) {
        let playerScore = Number(playerHands[i].title);
        if (playerScore <= 21 && playerScore > highestScore) {
            highestScore = playerScore;
        }
    }
    return highestScore;
}

function playersWin() {
    let gameState = getGameState();
    for (let i = 1; i <= activePlayers.length ; i++) {
        if (countPoints(i) <= 21) {
            gameState.winners.push(i);
        }
    }
    setGameState(gameState)
}

function checkWinners() {
    let bankScore = Number(countPoints(0));
    for (let i = 1; i < activePlayers.length; i++) {
        let playerScore = Number(countPoints(i));
        if (bankScore < playerScore) {
            playerWins(1);
        } else if (bankScore === playerScore) {
            if (countPlayerCards(0) >= countPlayerCards(i)) {
                playerWins(i);
            } else {
                playerLost(i);
            }
        } else {
            playerLost(i);
        }
    }
}

function givePrizesForWinners() {
    let gameState = getGameState();
    for (let winnerId in gameState.winners ) {
        updatePlayerChipsInLocalStorage( winnerId, 2*gameState.betAmounts[winnerId]);
        activePlayers[winnerId].chips += 2*gameState.betAmounts[winnerId];
        updateChipsFieldForPlayer( Number(winnerId+1), activePlayers[winnerId].chips );
    }
}

function playerLoseCheck(player) {
    return Number(countPoints(player)) > 21;
}

function playerLost(player) {
    let gameState = getGameState();
    gameState.playersOut.push(player);
    setGameState(gameState);
}

function generatePlayerHands() {
    createPlayerHand("bank");
    for (i = 0; i < activePlayers.length; i++) {
        createPlayerHand(i);
    }
}

function countPlayerCards(player) {
    return document.getElementById(`player-hand${player}`).getElementsByTagName('img').length;
}

function playerWins(player) {
    let gameState = getGameState();
    gameState.winners.push(player);
    setGameState(gameState);
}

function fillHandsFromGameState() {
    let playerHands = getGameState().playerHands;
    for (let i = 0; i < playerHands.length; i++ ) {
        for (let cardId of playerHands[i]) {
            document.getElementById(`player-hand${i}`).appendChild(createCard(cardId));
            removeIdFromDeck(cardId);
        }
        countPoints(i);
    }
}

function removeIdFromDeck(id) {
    var index = deck.indexOf(id);
    if (index > -1) {
      deck.splice(index, 1);
    }
}

generatePlayerHands();
fillHandsFromGameState();
checkGameOver();
