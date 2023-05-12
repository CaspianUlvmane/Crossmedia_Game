<?php
ini_set("display_errors", 1);
$requestMethod = $_SERVER["REQUEST_METHOD"];

$quests_array = [];

if (file_exists("quests.JSON")) {
    $json = file_get_contents("quests.JSON");
    $quests_array = json_decode($json, true);
}

if($requestMethod == "GET"){
    header("Content-Type: application/json");
    http_response_code(200);
    echo json_encode($quests_array);
    exit();
}

?>