//get the player depending on id

let circlesArray = []
let decrease_intervals = []

function getPlayer(player) {
    fetch(new Request("./DB/players.JSON"))
        .then(r => r.json())
        .then(rsc => {
            let players_list = rsc;

            players_list.forEach(p => {
                if (p.id == player) {
                    checkDistrict(p);
                }
            });
        });
}

function checkDistrict(player) {

    fetch(new Request("./DB/districts.JSON"))
        .then(r => r.json())
        .then(rsc => {
            let districts_list = rsc;

            districts_list.forEach(d => {
                if (d.district_number == player.district_id) {
                    let district_number = d.district_number;
                    let district_proffesion = d.profession
                    buildFooter(player, district_number, district_proffesion);
                } else {
                    // buildFooter(player)
                }
            });
        });
}

function buildFooter(player, district_number, district_profession) {

    // localStorage.removeItem('hungerLevel');
    // localStorage.removeItem('waterLevel');

    let footer = document.createElement("div");
    footer.innerHTML = `
        <div class="footer">
            <img src="${player.image}" class="img_user">
            <p class="user_district">Distrikt ${district_number} - ${district_profession}</p>
            <img src="./IMG/quest.png" class="quest_icon">
            <div class="middle_container">
                <img src="./IMG/apple.png" class="apple_icon">
                <div class="hunger_bar">
                    <div class="hunger_level"></div>
                </div>
                <img src="./IMG/water.png" class="water_icon">
                <div class="water_bar">
                    <div class="water_level"></div>
                </div>
                <img src="./IMG/heart.png" class="heart_icon">
                <div class="check_container">
                
        `;
    document.querySelector("body").append(footer);
    document.querySelector(".footer").style.display = "grid";

    //NEW
    document.querySelector(".quest_icon").addEventListener("click", function() {
        show_overlay();
    })

    for (let i = 0; i < 5; i++) {
        let check_circle = document.createElement("div");
        check_circle.classList.add("check_circle");
        footer.querySelector(".check_container").append(check_circle);
    }

    let hunger_level = footer.querySelector(".hunger_level");
    let water_level = footer.querySelector(".water_level");



    const savedHungerLevel = parseInt(localStorage.getItem('hungerLevel'));
    const savedWaterLevel = parseInt(localStorage.getItem('waterLevel'));

    // Set the initial values of the hunger and water levels
    hunger_level.style.width = !isNaN(savedHungerLevel) ? `${savedHungerLevel}%` : '100%';
    water_level.style.width = !isNaN(savedWaterLevel) ? `${savedWaterLevel}%` : '100%';

    if (savedWaterLevel <= 0) {
        water_level.style.width = "0%";
    }

    if (savedHungerLevel <= 0) {
        hunger_level.style.width = "0%";
    }


    // add a load event listener to the img element to make sur hunger_level and water_level is executed after the img_user
    let img_user = footer.querySelector(".img_user");
    img_user.addEventListener("load", function() {

        const interval_water_id = setInterval(decreaseWater, 180000);
        const interval_hunger_id = setInterval(decreaseHunger, 300000);
        decrease_intervals.push(interval_water_id)
        decrease_intervals.push(interval_hunger_id)

        function decreaseHunger() {
            const current_width = parseInt(hunger_level.style.width, 10);
            const new_width = current_width - 20;
            if (new_width >= 20) {
                hunger_level.style.width = `${new_width}%`;
                localStorage.setItem('hungerLevel', new_width); // Save the updated percentage to Local Storage    
            } else {
                // clearInterval(interval_hunger_id);
                hunger_level.style.width = `${new_width}%`;
                localStorage.setItem('hungerLevel', new_width); // Save the updated percentage to Local Storage
                checkFilledCircles();
            }
        }

        function decreaseWater() {
            const current_width_water = parseInt(water_level.style.width, 10);
            const new_width_water = current_width_water - 20;
            if (new_width_water >= 20) {
                water_level.style.width = `${new_width_water}%`;
                localStorage.setItem('waterLevel', new_width_water); // Save the updated percentage to Local Storage
            } else {
                water_level.style.width = `${new_width_water}%`;
                localStorage.setItem('waterLevel', new_width_water); // Save the updated percentage to Local Storage
                // clearInterval(interval_water_id);
                checkFilledCircles()
            }

        }
    });

    const all_circles = document.querySelectorAll('.check_circle');
    // let count = 0;
    all_circles.forEach(circle => {
        circle.addEventListener('click', () => {
            if (!circle.classList.contains('checked')) {
                circle.classList.add('checked');
                // count++;
                // circle.classList.add(`${count}`);
                circlesArray.push("1")
                if (circlesArray.length >= 5) {
                    popupLose()
                    localStorage.removeItem('hungerLevel');
                    localStorage.removeItem('waterLevel');

                    let options = {
                        method: "PATCH",
                        body: JSON.stringify({
                            alive: false,
                            id: player.id
                        }),
                        headers: { "Content-Type": "application/json" },
                    };
                    fetch("./DB/playerId.php", options)
                }
            }
        });
    });
}

function checkFilledCircles() {

    const not_checked = document.querySelectorAll('.check_circle:not(.checked)');

    if (not_checked.length >= 2) {
        not_checked[0].classList.add('checked');
        not_checked[1].classList.add('checked');
        circlesArray.push("1")
        circlesArray.push("1")
        if (circlesArray.length >= 5) {
            popupLose()
            localStorage.removeItem('hungerLevel');
            localStorage.removeItem('waterLevel');
            let options = {
                method: "PATCH",
                body: JSON.stringify({
                    alive: false,
                    id: player.id
                }),
                headers: { "Content-Type": "application/json" },
            }
            fetch("./DB/playerId.php", options)
        };
    } else if (not_checked.length === 1) {
        not_checked[0].classList.add('checked');
        circlesArray.push("1")
        if (circlesArray.length >= 5) {
            popupLose()
            localStorage.removeItem('hungerLevel');
            localStorage.removeItem('waterLevel');
            let options = {
                method: "PATCH",
                body: JSON.stringify({
                    alive: false,
                    id: player.id
                }),
                headers: { "Content-Type": "application/json" },
            }
            fetch("./DB/playerId.php", options)
        };

    } else if (not_checked.length === 0) {
        circlesArray.push("1")
        if (circlesArray.length >= 5) {
            popupLose()
            localStorage.removeItem('hungerLevel');
            localStorage.removeItem('waterLevel');
            let options = {
                method: "PATCH",
                body: JSON.stringify({
                    alive: false,
                    id: player.id
                }),
                headers: { "Content-Type": "application/json" },
            };
            fetch("./DB/playerId.php", options)

        }
    }
}

///NOTE:Flytta dessa funktioner




// profitPopUp()