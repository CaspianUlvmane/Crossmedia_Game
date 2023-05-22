let district_array
let player = 0;


function render() {
    let popup = document.createElement("div");
    popup.id = "popup";


    let background_img = document.createElement("img");
    background_img.src = "./IMG/background.png";
    background_img.classList.add("background_img")
    background_img.alt = "Background Image";

    let logga_img = document.createElement("img");
    logga_img.src = "./IMG/Logga_black.png";
    logga_img.alt = "Logga Image";
    logga_img.classList.add("logga");
    logga_img.style.width = "350px";
    logga_img.style.position = "absolute";
    logga_img.style.height = "300px";

    let start_game = document.createElement("button");
    start_game.innerHTML = "SPELA"
    start_game.classList.add("start_game")
    start_game.style.position = "absolute";


    document.body.appendChild(popup);
    popup.appendChild(background_img);
    popup.appendChild(logga_img)
    popup.appendChild(start_game)

    start_game.addEventListener("click", function() {
        getLetter(popup, logga_img, start_game)
            // joinGame()
            // Call fetchPlayerInfo() and then call getPlayerLetter(player) with the updated value
        fetchPlayerInfo()
            // .then((player) => getPlayerLetter(player))
            // .catch((error) => console.log(error));
    })
};

setTimeout(() => {
    if (getPlayerInfo() != null && start_game()) {
        console.log("getPlayer");
        getPlayer(localStorage.getItem('playerId'))
    } else {
        render()
    }
}, 2)


function getLetter(popup, logga_img, start_game) {

    logga_img.style.display = "none";
    start_game.style.display = "none";



    let open_letter = document.createElement("p");
    open_letter.innerText = "ÖPPNA BREVET";
    open_letter.classList.add("open_letter");
    popup.appendChild(open_letter);

    let letter_img = document.createElement("img");
    letter_img.id = "letter";
    letter_img.src = "./IMG/letter.png";
    letter_img.alt = "Letter Image";
    letter_img.style.width = "320px";
    letter_img.style.height = "300px";
    popup.appendChild(letter_img);



    letter_img.addEventListener("click", function() {
        openLetter(letter_img, open_letter, popup)
    })
}

// function joinGame() {
//     // Send an AJAX request to the server to join the game
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', './DB/playerId.php', true);
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send();

//     // Handle the response from the server
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             var response = JSON.parse(xhr.responseText);

//         }
//     };
// }

function savePlayerInfo(playerId) {
    localStorage.setItem('playerId', playerId);
}

// Function to retrieve player information from Local Storage
function getPlayerInfo() {
    return localStorage.getItem('playerId');
}

//NOTE: To clear the local storage when the game is over
// function clearPlayerInfo() {
//     localStorage.removeItem('playerId');
//   }

function fetchPlayerInfo() {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './DB/playerId.php?getPlayerInfo=true', true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr);
                    var playerInfo = JSON.parse(xhr.responseText);
                    player = playerInfo.id;
                    savePlayerInfo(player); // Save player information to Local Storage
                    resolve(player);
                } else {
                    reject(xhr.status);
                }
            }
        };
    });
}



function getFormattedDate() {
    var today = new Date();
    var year = today.getFullYear().toString();
    var month = ("0" + (today.getMonth() + 1)).slice(-2);
    var day = ("0" + today.getDate()).slice(-2);
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
}

function openLetter(letter_img, open_letter, popup) {

    letter_img.style.display = "none";
    open_letter.style.display = "none";

    let letter_container = document.createElement("div");
    letter_container.classList.add("letter_container");

    let letter_img2 = document.createElement("img");
    letter_img2.id = "letter_2";
    letter_img2.src = "./IMG/letter2.png";
    letter_img2.alt = "Letter Image";
    letter_img2.style.width = "90%";
    letter_img2.style.height = "80vh";

    popup.appendChild(letter_container);
    letter_container.appendChild(letter_img2);

    let logga_img_container = document.createElement("div");
    logga_img_container.classList.add("logga_img_container");

    let logga_img = document.createElement("img");
    logga_img.src = "./IMG/Logga_black.png";
    logga_img.alt = "Logga Image";
    logga_img.classList.add("logga_img");
    logga_img.style.width = "100px";
    logga_img.style.position = "absolute";
    logga_img.style.height = "80px";

    letter_container.appendChild(logga_img);

    let signature = document.createElement("img");
    signature.src = "./IMG/autograph.png";
    signature.alt = "Signature image";
    signature.classList.add("signature");
    signature.style.width = "100px";
    signature.style.height = "80px";
    signature.style.position = "absolute";

    letter_container.appendChild(signature);

    let date = document.createElement("p");
    date.classList.add("date");
    var formattedDate = getFormattedDate();
    date.innerText = formattedDate;
    date.style.position = "absolute";

    letter_container.appendChild(date);

    let clr = document.createElement("p");
    clr.classList.add("clr");
    clr.innerText = "President CLR";
    clr.style.position = "absolute";

    letter_container.appendChild(clr);

    let question = document.createElement("p");
    question.classList.add("question");
    question.innerText = "ANTAR DU UTMANINGEN?";
    question.style.position = "absolute";

    letter_container.appendChild(question);

    let answer = document.createElement("p");
    answer.classList.add("answer");
    answer.innerText = "JA";
    answer.style.position = "absolute";

    letter_container.appendChild(answer);

    let next = document.createElement("img");
    next.src = "./IMG/next.png";
    next.alt = "Next image";
    next.classList.add("next");
    next.style.width = "62px";
    next.style.height = "48px";
    next.style.position = "absolute";

    letter_container.appendChild(next);

    // Create checkbox container div
    var checkboxContainer = document.createElement("div");
    checkboxContainer.id = "checkboxContainer";

    // Create checkbox input
    var checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.id = "myCheckbox";

    // Create label for checkbox
    var checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", "myCheckbox");

    // Append input and label to the checkbox container
    checkboxContainer.appendChild(checkboxInput);
    checkboxContainer.appendChild(checkboxLabel);


    letter_container.appendChild(checkboxContainer);


    var checkbox = document.getElementById("myCheckbox");

    let checked = false;

    // Add event listener to handle checkbox state changes
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            checked = true;
            checkbox.disabled = true; // Disable the checkbox when checked
            
            next.addEventListener("click", function() {
                acceptedLetter(popup, letter_container);
                start_game();
            });
        }
    });

    document.body.appendChild(popup);
    getPlayerLetter(player);
}
//get the player depending on id
function getPlayerLetter(player) {

    var storedPlayerId = getPlayerInfo();

    fetch(new Request("./DB/players.JSON"))
        .then(r => r.json())
        .then(rsc => {
            let players_list = rsc;
            players_list.forEach(p => {
                if (p.id == storedPlayerId) {
                    checkDistrictLetter(p);
                }
            });
        });
}

function checkDistrictLetter(player) {

    fetch(new Request("./DB/districts.JSON"))
        .then(r => r.json())
        .then(rsc => {
            let districts_list = rsc;

            districts_list.forEach(d => {
                if (d.district_number == player.district_id) {
                    district_array = d
                    district = d.district;
                    district_backstory = d.backstory
                    buildPlayerLetter(player, district, district_backstory);
                } else {
                    // buildPlayerLetter(player)
                }
            });
        });

}

function buildPlayerLetter(player, district, district_backstory) {
    let player_img = document.createElement("img");
    player_img.src = `${player.image}`;
    player_img.alt = "player image";
    player_img.classList.add("player_img");
    player_img.style.width = "50px";
    player_img.style.height = "50px";
    player_img.style.position = "absolute";

    let district_place = document.createElement("p");
    district_place.classList.add("district_place");
    district_place.innerHTML = district;
    district_place.style.position = "absolute";

    let district_name = document.createElement("p");
    district_name.classList.add("district_name");
    district_name.innerHTML = player.name;
    district_name.style.position = "absolute";

    let information = document.createElement("p");
    information.classList.add("information");
    information.innerHTML =
        "Kära tribut! <br> Det är med stolthet och ödmjukhet jag skriver till dig idag, som en representant för Malmö och hela vårt enade land. Du har blivit vald för att representera ditt distrikt i den årliga Skörden. Vi har skapat Skörden, en chans för dig att visa din styrka och beslutsamhet genom att slåss för ditt distrikts överlevnad. Som du vet är Skörden inte en enkel uppgift, men jag är övertygad om att du är tillräckligt stark och beslutsam för att överleva. Jag önskar dig all lycka och framgång i din resa genom Skörden, och jag kommer att följa dina framsteg med stolthet och spänning. Må den största framgången vänta på dig vid slutet av denna utmaning.";

    information.style.position = "absolute";

    let letter_container = document.querySelector(".letter_container");

    letter_container.appendChild(player_img);
    letter_container.appendChild(district_place);
    letter_container.appendChild(district_name);
    letter_container.appendChild(information);
}

function acceptedLetter(popup, letter_container) {

    letter_container.style.display = "none";


    let hourglas_container = document.createElement("div");
    hourglas_container.classList.add("hourglas_container");

    let wait_text = document.createElement("p");
    wait_text.classList.add("wait_text");
    wait_text.innerHTML = "VAR VÄNLIG VÄNTA, LEDAREN KOMMER SNART SLÄPPA IN DIG"
    wait_text.style.position = "absolute";

    let hourglas = document.createElement("img");
    hourglas.classList.add("hourglas");
    hourglas.src = "./IMG/hourglas.png";
    hourglas.alt = "Hourglas Image";
    hourglas.style.width = "15vh";
    hourglas.style.height = "15vh";

    let pst_text = document.createElement("p");
    pst_text.classList.add("pst_text");
    pst_text.innerHTML = `Pssst...<br>Passa på att läsa om ditt distrikt medans du väntar`
    pst_text.style.position = "absolute";

    let info_container = document.createElement("div");
    info_container.classList.add("info_container");


    let down = document.createElement("img");
    down.classList.add("down");
    down.src = "./IMG/Down.png";
    down.alt = "down Image";
    down.style.width = "40px";
    down.style.height = "40px";
    down.style.position = "absolute";

    let proffesion = district_array.profession
    let number = district_array.district_number

    let district_info = document.createElement("p");
    district_info.classList.add("district_info");
    district_info.innerHTML = proffesion.toUpperCase() + " - DISTRIKT  " + number
    district_info.style.position = "absolute";


    popup.appendChild(hourglas_container);
    hourglas_container.appendChild(wait_text);
    hourglas_container.appendChild(hourglas);
    hourglas_container.appendChild(pst_text);
    hourglas_container.appendChild(info_container);
    info_container.append(down)
    info_container.append(district_info)

    let is_down = false;


    let district_text = document.createElement("p");
    district_text.classList.add("district_text");
    info_container.append(district_text)

    info_container.addEventListener("click", function() {
        if (is_down == false) {
            info_container.style.height = "20vh"
            district_text.innerHTML = district_array.backstory
            district_text.style.position = "absolute";


            is_down = true;
        } else {
            info_container.style.height = "5vh"
            district_text.innerHTML = ""
            is_down = false
        }
    })
    startGame()
}

//NOTE:FLYTTA TILL ADMIN SIDAN

function startGame() {
    let container = document.querySelector(".hourglas_container");

    //Button for starting the game
    let start_button = document.createElement("button");
    start_button.innerHTML = "STARTA SPEL TEST"
    start_button.classList.add("start_button")
    container.appendChild(start_button)

    start_button.addEventListener('click', function() {
        // // Send an AJAX request to the server to start the game
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', './DB/gameStatus.php', true);
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.send();
        // checkGameStatus();

        // // Optionally, handle the response from the server
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        //         // Handle the response from the server if needed
        //     }
        // };
        document.querySelector("#popup").style.display = "none";
        getPlayer(player);
    });
}

// function checkGameStatus() {
//     // Send an AJAX request to the server to check the game status
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', './DB/gameStatus.php', true);
//     xhr.send();

//     // Handle the response from the server
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             var response = JSON.parse(xhr.responseText);

//             if (response.gameStarted) {
//                 // Game has started, update the page 
//                 document.querySelector("#popup").style.display = "none";
//                 getPlayer(player);

//             } else {
//                 // Game hasn't started yet, continue checking
//                 setTimeout(checkGameStatus, 2000); // Check again after 2 seconds
//             }
//         }
//     };
// }