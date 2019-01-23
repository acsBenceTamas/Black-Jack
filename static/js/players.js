const STARTING_CHIPS = 100;
let playerCards = document.getElementById("player-cards");
playerCards.addEventListener('click', clickCardList);

function clickCardList(event) {
    if (event.target.classList.contains("delete-player")) {
        deletePlayer( event.target.closest(".player-card").dataset.name );
    } else if (event.target.classList.contains("select-player")) {
        togglePlayerSelection( event.target.closest(".player-card").dataset.name );
        event.target.innerText = event.target.innerText === "SELECT" ? "DESELECT" : "SELECT";
        event.target.classList.toggle("btn-primary");
        event.target.classList.toggle("btn-secondary");
    }
}

function addNewPlayer() {
    let playersInfo = JSON.parse(localStorage.getItem("players"));
    if (!playersInfo) {playersInfo = []}
    let newPlayerName = document.getElementById("new-player-name").value;
    if (!checkIfPlayerExists(newPlayerName, playersInfo)) {
        const newPlayer = {name: newPlayerName, chips: STARTING_CHIPS, selected: 0};
        playersInfo.push(newPlayer);
        localStorage.setItem("players", JSON.stringify(playersInfo));
        drawPlayerCard(newPlayer);
    } else {
        alert(`Player with name ${newPlayerName} already exists.`);
    }
    document.getElementById("new-player-name").value = "";
}

function checkIfPlayerExists( playerName, playerInfo ) {
    for (let player of playerInfo) {
        if (player.name.toString() === playerName) {
            return true;
        }
    }
    return false;
}

function displayPlayerCards() {
    const players = JSON.parse(localStorage.getItem("players"));
    for (let player of players) {
        drawPlayerCard( player );
    }
}

function drawPlayerCard( player ) {
    let newPlayerCard = document.createElement("div");
    newPlayerCard.classList.add("player-card");
    newPlayerCard.id = `player-name-${player.name}`;
    newPlayerCard.dataset.name = player.name;
    newPlayerCard.innerHTML =
`
<table>
    <tr>
        <th>Name:</th><td>${player.name}</td><th>Chips:</th><td>${player.chips}</td>
        <td>
            <button class="btn-danger delete-player">DELETE</button>
            <button class="${Number(player.selected) === 0 ? 'btn-secondary' : 'btn-primary'} select-player">${Number(player.selected) === 0 ? 'DESELECT' : 'SELECT'}</button>
        </td>
    </tr>
</table>
`;
    document.getElementById("player-cards").appendChild(newPlayerCard);
}

function deletePlayer( playerName ) {
    document.getElementById(`player-name-${playerName}`).remove();
    let playersInfo = JSON.parse(localStorage.getItem("players"));
    for (let i=0; i<playersInfo.length; i++) {
        console.log(playersInfo[i].name.toString() === playerName.toString());
        if (playersInfo[i].name.toString() === playerName.toString()) {
            playersInfo.splice(i, 1);
            localStorage.setItem("players", JSON.stringify(playersInfo));
            return;
        }
    }
}

function togglePlayerSelection( playerName ) {
    let playersInfo = JSON.parse(localStorage.getItem("players"));
    for (let player of playersInfo) {
        if (player.name.toString() === playerName.toString()) {
            player.selected = Number(player.selected) === 0 ? 1 : 0;
            localStorage.setItem("players", JSON.stringify(playersInfo));
            return;
        }
    }

}

displayPlayerCards();