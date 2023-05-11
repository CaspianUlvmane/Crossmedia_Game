let player = 1;
getPlayer(player);

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
                if (d.id == player.id) {
                    let district_number = d.district_number;
                    let district_proffesion = d.profession
                    buildFooter(player, district_number, district_proffesion);
                } else {
                    buildFooter(player)
                }
            });
        });
}

function buildFooter(player, district_number, district_profession) {

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

    for (let i = 0; i < 5; i++) {
        let check_circle = document.createElement("div");
        check_circle.classList.add("check_circle");
        footer.querySelector(".check_container").append(check_circle);
    }


    let hunger_level = footer.querySelector(".hunger_level");
    hunger_level.style.width = "100%";

    let water_level = footer.querySelector(".water_level");
    water_level.style.width = "100%";



    // add a load event listener to the img element to make sur hunger_level and water_level is executed after the img_user
    let img_user = footer.querySelector(".img_user");
    img_user.addEventListener("load", function() {

        const interval_water_id = setInterval(decreaseWater, 2000);
        const interval_hunger_id = setInterval(decreaseHunger, 2000);

        function decreaseHunger() {
            const current_width = parseInt(hunger_level.style.width, 10);
            const new_width = current_width - 20;
            if (new_width >= 0) {
                hunger_level.style.width = `${new_width}%`;
            } else {
                // clearInterval(interval_hunger_id);
                checkFilledCircles();
            }
        }

        function decreaseWater() {
            const current_width_water = parseInt(water_level.style.width, 10);
            const new_width_water = current_width_water - 20;
            if (new_width_water >= 0) {
                water_level.style.width = `${new_width_water}%`;

            } else {
                // clearInterval(interval_water_id);
                checkFilledCircles();
            }
        }
    });

    const all_circles = document.querySelectorAll('.check_circle');

    all_circles.forEach(circle => {
        circle.addEventListener('click', () => {
            circle.classList.add('checked');
        });
    });
    clickProfit(footer)
}

function checkFilledCircles() {

    const not_checked = document.querySelectorAll('.check_circle:not(.checked)');

    if (not_checked.length >= 2) {
        not_checked[0].classList.add('checked');
        not_checked[1].classList.add('checked');
    } else if (not_checked.length === 1) {
        not_checked[0].classList.add('checked');
    }
}

///NOTE:Flytta dessa funktioner

function profitPopUp() {

    let profit_popup = document.createElement('div');
    profit_popup.classList.add('profit_popup');
    profit_popup.innerHTML = `
           <div class="profit_container">
           <p class="profit_text">Du svarade rätt, välj ett pris!</p>
           <img src="./IMG/apple.png" class="apple_popup">
           <img src="./IMG/water.png" class="water_popup">
           </div>
           `;

    document.querySelector('body').append(profit_popup);
}

function clickProfit(footer) {
    //When the user get more food/water by quest and bar goes up

    let apple_icon = document.querySelector(".apple_popup");
    let water_icon = document.querySelector(".water_popup");

    let hunger_level = footer.querySelector(".hunger_level");
    let water_level = footer.querySelector(".water_level");

    apple_icon.addEventListener('click', () => {
        const current_width = parseInt(hunger_level.style.width, 10);
        const new_width = current_width + 20;
        if (new_width <= 100) {
            hunger_level.style.width = `${new_width}%`;
        }
    });

    water_icon.addEventListener('click', () => {
        const current_width = parseInt(water_level.style.width, 10);
        const new_width = current_width + 20;
        if (new_width <= 100) {
            water_level.style.width = `${new_width}%`;
        }
    });
}

profitPopUp()