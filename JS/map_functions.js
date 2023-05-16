function start_game() {
    fetch("./DB/API.php?start")
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.start) {
          getPlayer(localStorage.getItem('playerId'))
          document.querySelector("#popup").style.display = "none";
          return true;
        } else {
          setTimeout(() => start_game(), 5000);
        }
      });
  }