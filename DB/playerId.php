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

  if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['end'])){
    $playersData = file_get_contents('players.JSON');
    $players = json_decode($playersData, true);

    foreach($players as $index => $player){
    
        $player["in_use"] = false;
        $players[$index] = $player;
       
      }

      $json = json_encode($players, JSON_PRETTY_PRINT);
      file_put_contents("players.JSON", $json);
      exit;
  }

  $receivedJsonData = file_get_contents("php://input");
  $receivedData = json_decode($receivedJsonData, true);

function sendJSON($data, $responseCode = 200){
    header("Content-Type: application/json");
    http_response_code($responseCode);
    $json = json_encode($data);
    echo $json;
    exit();
}

  if($_SERVER['REQUEST_METHOD'] === 'PATCH'){
    // $json = file_get_contents("players.JSON");
    // $alive = json_decode($json, true);

    $playersData = file_get_contents('players.JSON');
    $players = json_decode($playersData, true);

    $playerId = $receivedData["id"];
    $alive = $receivedData["alive"];
    if(isset($receivedData["id"], $receivedData["alive"])){

      foreach($players as $index => $player){
        if($player["id"] ==  $playerId){
          $player["alive"] = $receivedData["alive"];
          $players[$index] = $player;
          $json = json_encode($players, JSON_PRETTY_PRINT);
          file_put_contents("players.JSON", $json);
          sendJSON($player);
          
        }
      }
  
    }

  }
?>