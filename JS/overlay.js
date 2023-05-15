function show_overlay() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").style.backgroundImage = "url(./IMG/background.png)";

    let close_page = document.createElement("div");
    close_page.classList.add("close");
    overlay.append(close_page);

    let overlay_quest_icon = document.createElement("div");
    overlay_quest_icon.id = "overlay_quest_icon";
    overlay_quest_icon.innerHTML = ` <img src="./IMG/quest.png" class="overlay_quest_icon">`;
    overlay.append(overlay_quest_icon);
    getQuests();

    close_page.addEventListener("click", function(event) {
        hide_overlay();
    });

}

function hide_overlay() {
    document.getElementById("overlay").style.display = "none";
}

function getQuests() {
    let all_quests_div = document.createElement("div");
    all_quests_div.classList.add("quest_wrapper");
    overlay.append(all_quests_div);

    let rqst = new Request("./DB/getQuests.php");
    fetch(rqst)
        .then(r => r.json())
        .then(resource => {
            resource.forEach(quest => {
                let div = document.createElement("div");
                div.classList.add("quest_box_closed");
                let triangle_down_div = document.createElement("div");
                triangle_down_div.classList.add("triangle_down");
                div.innerHTML = `
            <h4> Uppdrag ${quest.id}</h4>
          `;
                div.append(triangle_down_div);
                all_quests_div.append(div);
                triangle_down_div.addEventListener("click", function() {
                    triangle_down_div.classList.remove("triangle_down");
                    if (div.className == "quest_box_closed") {
                        div.className = "quest_box_opened";
                        quests_show_more(quest, div);
                    } else {
                        div.className = "quest_box_closed";
                    }
                });
            })
        });
}

function quests_show_more(quest, div) {
    console.log(quest);
    let triangle_up_div = document.createElement("div");
    triangle_up_div.classList.add("triangle_up");
    div.innerHTML = `
        <h4> Uppdrag ${quest.id}</h4>
        <h1>FRÅGA:</h1>
        <p class="quest_info">${quest.question}</p>
        <div class="quest_answers"></div>
      `;
    div.append(triangle_up_div);
    let correctAnswer;
    //let correctAnswer = [];

    quest.answers.forEach(answer => {
        console.log(answer);
        let answer_div = document.createElement("div");
        answer_div.className = "answers";
        answer_div.innerHTML = `
      <label class="container">
      <input type="checkbox" id="${answer.answer}">
      <span class="checkmark ${answer.answer}"></span>
      </label>
      <div class="multiple_answers">${answer.answer}</div>`;
        div.querySelector(".quest_answers").append(answer_div);
        if (answer.correct == true) {
            correctAnswer = answer;
            //correctAnswer.push(answer);
            //console.log(answer);
            //console.log(correctAnswer);

        }
        all_checkboxes(correctAnswer, div, quest.id);

    });

    triangle_up_div.addEventListener("click", function() {
        triangle_up_div.classList.remove("triangle_up");
        triangle_up_div.classList.add("triangle_down");
        if (div.className == "quest_box_opened") {
            div.className = "quest_box_closed";
            div.querySelector(".quest_answers").style.display = "none";

        } else {
            div.className = "quest_box_opened";
            div.querySelector(".quest_answers").style.display = "grid";

        }
    })
}

function all_checkboxes(correctAnswer, div, quest_id) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            console.log(checkbox.checked);
            console.log(checkbox);
            console.log(checkbox.attributes[1].nodeValue);

            if (checkbox.checked == true) {

                if (checkbox.attributes[1].nodeValue.includes(correctAnswer.answer)) {

                    // Check if profitPopUp has already been called
                    document.querySelector("." + checkbox.attributes[1].nodeValue).style.backgroundColor = "green";
                    console.log("correct");
                    setTimeout(() => {
                        //call profitPopUp here!!
                        profitPopUp();

                    }, 1000);

                } else {
                    document.querySelector("." + checkbox.attributes[1].nodeValue).style.backgroundColor = "red";
                    console.log("not correct");
                    setTimeout(() => {
                        lock_quest(div, quest_id);
                    }, 1000);
                }

            } else {
                document.querySelector("." + checkbox.attributes[1].nodeValue).style.backgroundColor = "white";
            }
        })

    });

}

//if wrong answer
function lock_quest(div, quest_id) {
    if (div.className == "quest_box_opened") {
        div.className = "quest_box_closed";
        div.innerHTML = `
    <h4> Uppdrag ${quest_id}</h4>
    <img src="./IMG/padlock.png" class="padlock">
    `;
    }
}




//TODO!!! lägg in alla quest i json när de är klara,
//inga svar som börjar på en siffra ställer till det med koden :)