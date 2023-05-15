<?php
  // Endpoint to retrieve player information
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getPlayerInfo'])) {

  $playersData = file_get_contents('players.JSON');
  $players = json_decode($playersData, true);
  
    // Fetch the player information based on the assigned player ID from your data source (e.g., API, database, etc.)
    // ...
    foreach($players as $index => $player){
      if(!$player["in_use"]){
        $player["in_use"] = true;
        $players[$index] = $player;
        $json = json_encode($players, JSON_PRETTY_PRINT);
        file_put_contents("players.JSON", $json);
        $json = json_encode($player, JSON_PRETTY_PRINT);

        // Return the player information as a JSON response
        echo $json;
        exit();
      }elseif(count($players)-1 === $index){
        echo json_encode($playerInfo);
      }

    }
  
    exit;
  }
?>