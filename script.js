let players = [];

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}
function openEditPanel() {
    toggleSidebar(); // Fecha o menu antes de abrir a aba de edição
    document.getElementById("editPanel").style.display = "flex";
}

function closeEditPanel() {
    document.getElementById("editPanel").style.display = "none";
}
function savePlayer() {
    const name = document.getElementById("playerName").value.trim();
    const team = document.getElementById("playerTeam").value.trim();
    const copas = parseInt(document.getElementById("playerCopas").value) || 0;
    const ligas = parseInt(document.getElementById("playerLigas").value) || 0;

    if (name === "" || team === "") return;

    players.push({ name, team, copas, ligas });

    document.getElementById("playerName").value = "";
    document.getElementById("playerTeam").value = "";
    document.getElementById("playerCopas").value = "";
    document.getElementById("playerLigas").value = "";

    renderPlayers();
    closeEditPanel(); // Fecha a aba de edição sem reabrir o menu
}
function savePlayer() {
    const name = document.getElementById("playerName").value.trim();
    const team = document.getElementById("playerTeam").value.trim();
    const copas = parseInt(document.getElementById("playerCopas").value) || 0;
    const ligas = parseInt(document.getElementById("playerLigas").value) || 0;

    if (name === "" || team === "") return;

    players.push({ name, team, copas, ligas });

    document.getElementById("playerName").value = "";
    document.getElementById("playerTeam").value = "";
    document.getElementById("playerCopas").value = "";
    document.getElementById("playerLigas").value = "";

    renderPlayers();
    closeEditPanel();
    toggleSidebar(); // Fecha o menu lateral automaticamente após salvar o jogador
}


function deletePlayer(index) {
    players.splice(index, 1);
    renderPlayers();
}

function openScoreOptions(index) {
    const playerCard = document.getElementById(`player-${index}`);
    const menu = document.createElement("div");
    menu.classList.add("score-menu");
    menu.innerHTML = `
        <button onclick="updateScore(${index}, 'copas')">🏆 +1 Copa</button>
        <button onclick="updateScore(${index}, 'ligas')">🥇 +1 Liga</button>
        <button onclick="updateScore(${index}, 'vices')">🥈 +1 Vice</button>
    `;
    
    closeAllMenus(); // Fecha outros menus antes de abrir um novo
    playerCard.appendChild(menu);
}

function updateScore(index, type) {
    if (type === 'copas') players[index].copas += 1;
    if (type === 'ligas') players[index].ligas += 1;
    if (type === 'vices') players[index].vices = (players[index].vices || 0) + 1;

    renderPlayers();
}

function closeAllMenus() {
    document.querySelectorAll(".score-menu").forEach(menu => menu.remove());
}

function renderPlayers() {
    const list = document.getElementById("playersList");
    list.innerHTML = "";

    players.forEach((player, index) => {
        list.innerHTML += `
            <div class="player-card" id="player-${index}" onclick="openScoreOptions(${index})">
                <button class="delete-btn" onclick="deletePlayer(${index}); event.stopPropagation();">🗑</button>
                <h3>${player.name} - ${player.team}</h3>
                <p>🏆 Copas: ${player.copas} | 🏅 Ligas: ${player.ligas} | 🥈 Vices: ${player.vices || 0}</p>
            </div>
        `;
    });
}
