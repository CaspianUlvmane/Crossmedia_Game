function popupLose() {
    let popup_lose = document.createElement("div");
    popup_lose.id = "popup_lose";
    document.querySelector("body").append(popup_lose);
    popup_lose.style.display = "block";

    let lose_container = document.createElement("div");
    lose_container.id = "lose_container";
    popup_lose.append(lose_container);

    let lose_text = document.createElement("p");
    lose_text.classList.add("lose_text");
    lose_text.innerHTML = `Du dog`
    lose_text.style.position = "absolute";
    lose_container.append(lose_text)
    decrease_intervals.forEach(i => clearInterval(i))
}

function popupWin() {
    let popup_win = document.createElement("div");
    popup_win.id = "popup_win";
    document.querySelector("body").append(popup_win);


    let win_container = document.createElement("div");
    win_container.id = "win_container";
    popup_win.append(win_container);

    let win_text = document.createElement("p");
    win_text.classList.add("win_text");
    win_text.innerHTML = `DU ÄR VINNARE AV SKÖRDEN!!!`
    win_text.style.position = "absolute";
    win_container.append(win_text)
    decrease_intervals.forEach(i => clearInterval(i))
}



function checkIfOnePlayerLeft() {
    let players_in_use = [];

    console.log("check if one player is left")

    fetch("./DB/players.JSON")
        .then((r) => r.json())
        .then((players) => {

            players.forEach((p) => {
                if (p.in_use == true) {
                    players_in_use.push(p);
                }
            });


            let players_alive = [];
            players_in_use.forEach((play) => {
                if (play.alive == true) {
                    players_alive.push(play);
                }
            });
            player = JSON.parse(localStorage.getItem('playerId'))
            if (players_alive.length == 1 && players_alive[0].id == player) {
                console.log("You win!");
                popupWin()
            } else if(players_alive.some(p => p.id == player)) {
                setTimeout(() => checkIfOnePlayerLeft(), 10000)
            }
        });
}

// checkIfOnePlayerLeft()