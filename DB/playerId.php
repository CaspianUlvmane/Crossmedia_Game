<?php
// session_start();

//Handle the "Join Game" request
// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//   // Assign a player ID to the user
//   $playerId = assignPlayerId();

//   // Return the assigned player ID as the response
//   $response = array('playerId' => $playerId);
//   header('Content-Type: application/json');
//   echo json_encode($response);
// }

// Function to assign a player ID sequentially

// function assignPlayerId() {
//     // Retrieve the player data from the API
//     // $playersData = file_get_contents('players.JSON');
//     // $players = json_decode($playersData, true);
  
//     // // Check if there are any unassigned players
//     // if (!isset($_SESSION['assignedPlayers'])) {
//     //   // Initialize the assigned players array
//     //   $_SESSION['assignedPlayers'] = [];
//     // }
  
//     // // Iterate through the players in the API data
//     // foreach ($players as $player) {
//     //   // Check if the player has already been assigned
//     //   if (!in_array($player['id'], $_SESSION['assignedPlayers'])) {
//     //     // Assign the player ID to the user
//     //     $assignedPlayerId = $player['id'];
  
//     //     // Add the assigned player ID to the session
//     //     $_SESSION['assignedPlayers'][] = $assignedPlayerId;
  
//     //     // Save the player information in the session
//     //     $_SESSION['playerInfo'] = $player;

//     //     // Write session data and release the lock
//     //     session_write_close();
  
//     //     // Return the assigned player ID
//     //     return $assignedPlayerId;
//     //   }
//     // }
  
//     // If all players have been assigned, return an error or handle the situation accordingly
//     // ...
//   }


  // Endpoint to retrieve player information
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['getPlayerInfo'])) {
    // Retrieve the assigned player ID from the session or database
    // $assignedPlayerId = $_SESSION['playerInfo'];
  
    // Fetch the player information based on the assigned player ID from your data source (e.g., API, database, etc.)
    // ...
  
    // Return the player information as a JSON response
    // $playerInfo = $_SESSION['playerInfo'];
    // header('Content-Type: application/json');
    


    echo json_encode($playerInfo);
    exit;
  }
?>