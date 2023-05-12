

function show_overlay() {
  document.getElementById("overlay").style.display = "block";

  let close_page = document.createElement("div");
  close_page.classList.add("close");
  overlay.append(close_page);

  getQuests();

  close_page.addEventListener("click", function (event) {
    hide_overlay();
  });

}

function hide_overlay() {
  document.getElementById("overlay").style.display = "none";
}

//kalla på från questikonen istället
show_overlay();

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
        triangle_down_div.addEventListener("click", function () {
          triangle_down_div.classList.remove("triangle_down");
          if (div.className == "quest_box_closed") {
            div.className = "quest_box_opened";
            quests_show_more(quest, div);
          } else {
            div.className = "quest_box_closed";
          }
        });
      })
    }
    );
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
    all_checkboxes(correctAnswer);

  });

  triangle_up_div.addEventListener("click", function () {
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

function all_checkboxes(correctAnswer) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('click', function () {
      console.log(checkbox.checked);
      console.log(checkbox);
      console.log(checkbox.attributes[1].nodeValue);

      if (checkbox.checked == true) {

        if (checkbox.attributes[1].nodeValue.includes(correctAnswer.answer)) {

          document.querySelector("." + checkbox.attributes[1].nodeValue).style.backgroundColor = "green";
          console.log("correct");
        } else {
          document.querySelector("." + checkbox.attributes[1].nodeValue).style.backgroundColor = "red";
          console.log("not correct");
        }

      } else {
        document.querySelector("." + checkbox.attributes[1].nodeValue).style.backgroundColor = "white";
      }
    })

  });

}
