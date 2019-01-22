let currentPlayer = 1;
let gameSpace = document.getElementById('game-space');
const cards = JSON.parse(gameSpace.dataset.cards);
const imagePath = gameSpace.dataset.imagePath;
let deck = JSON.parse(gameSpace.dataset.ids);
gameSpace.addEventListener('click', gameClick);

function gameClick(event) {
    if (event.target.classList.contains('btn-primary') && event.target.classList.contains('draw-card')) {
        drawCard(currentPlayer);
    }
}

function drawCard(currentPlayer) {
    const cardPosition = Math.floor(Math.random() * deck.length);
    const cardId = deck[cardPosition];
    deck.splice(cardPosition, 1);
    console.log(deck, cardId);
    const card = getCardById(cardId);
    const img = document.createElement('img');
    img.src = imagePath + card['image'] + '.png';
    img.dataset.value = card['value'];
    img.width = 69;
    img.height = 105;
    document.getElementById('player-hand' + currentPlayer).appendChild(img);
}

function getCardById(id) {
    for (let card of cards) {
        if (card['id'] === id) {
            return card;
        }
    }

}