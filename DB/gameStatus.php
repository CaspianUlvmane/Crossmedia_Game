<?php
session_start();

// Check the request type
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Admin initiated the game start
  startGame();
} else {
  // Player checking the game status
  checkGameStatus();
}

function startGame() {
  // Start the game and notify the waiting players
  // Your game logic here

  // Update the game status in the session
  $_SESSION['gameStarted'] = true;

  // Return a response to the admin page (optional)
  http_response_code(200);
  echo "Game started";
}

function checkGameStatus() {
  // Check the game status and return the response
  // Your game logic here

  // Check the game status from the session
  $gameStarted = isset($_SESSION['gameStarted']) && $_SESSION['gameStarted'];

  // Return the game status as a JSON response
  $response = array('gameStarted' => $gameStarted);
  header('Content-Type: application/json');
  echo json_encode($response);
}
?>