//get the player depending on id

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

        const interval_water_id = setInterval(decreaseWater, 300000);
        const interval_hunger_id = setInterval(decreaseHunger, 300000);

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
                checkFilledCircles();
            }

        }
    });

    const all_circles = document.querySelectorAll('.check_circle');
    let count = 0;
    all_circles.forEach(circle => {
        circle.addEventListener('click', () => {
            if (!circle.classList.contains('checked')) {
                circle.classList.add('checked');
                count++;
                circle.classList.add(`${count}`);
                if (circle.classList.contains('5')) {
                    popupLose()
                    checkIfOnePlayerLeft()
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
    } else if (not_checked.length === 1) {
        not_checked[0].classList.add('checked');
        popupLose()
        checkIfOnePlayerLeft()
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
        localStorage.removeItem('hungerLevel');
        localStorage.removeItem('waterLevel');
    } else if (not_checked.length === 0) {
        popupLose()
        checkIfOnePlayerLeft()
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

///NOTE:Flytta dessa funktioner

function profitPopUp() {

    if (!document.querySelector(".profit_popup")) {
        let profit_popup
        profit_popup = document.createElement('div');
        profit_popup.classList.add('profit_popup');
        profit_popup.innerHTML = `
               <div class="profit_container">
               <p class="profit_text"> <span style="color:green;">RÄTT</span> <br> <br>VÄLJ EN GÅVA</p>
               <img src="./IMG/apple.png" class="apple_popup">
               <img src="./IMG/water.png" class="water_popup">
               </div>
               `;

        document.querySelector('body').append(profit_popup);
        hide_overlay();
        clickProfit();

    } else {
        console.log("nope")
    }
}

function clickProfit() {
    //When the user get more food/water by quest and bar goes up

    let apple_icon = document.querySelector(".apple_popup");
    let water_icon = document.querySelector(".water_popup");

    let hunger_level = document.querySelector(".hunger_level");
    let water_level = document.querySelector(".water_level");

    apple_icon.addEventListener('click', () => {
        const current_width = parseInt(hunger_level.style.width, 10);
        const new_width = current_width + 20;
        if (new_width <= 100) {
            hunger_level.style.width = `${new_width}%`;
            localStorage.setItem('hungerLevel', new_width);
        }
        document.querySelector(".profit_popup").remove()
    });

    water_icon.addEventListener('click', () => {
        const current_width = parseInt(water_level.style.width, 10);
        const new_width = current_width + 20;
        if (new_width <= 100) {
            water_level.style.width = `${new_width}%`;
            localStorage.setItem('waterLevel', new_width);
        }
        document.querySelector(".profit_popup").remove()
    });
}


// profitPopUp()