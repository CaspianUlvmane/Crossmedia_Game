<?php
$request_method = $_SERVER['REQUEST_METHOD'];

$receivedJsonData = file_get_contents("php://input");
$receivedData = json_decode($receivedJsonData, true);

function sendJSON($data, $responseCode = 200){
    header("Content-Type: application/json");
    http_response_code($responseCode);
    $json = json_encode($data);
    echo $json;
    exit();
}

if($request_method === "GET"){
    if(isset($_GET["start"])){
        $json = file_get_contents("./start.JSON");
        $start = json_decode($json, true);
        sendJSON($start);
    }

    if(isset($_GET["end"])){
        $json = file_get_contents("./positions.JSON");
        $positions = json_decode($json, true);
        foreach($positions as $index =>$position){
            $position["lat"] = 0;
            $position["lng"] = 0;
            $positions[$index] = $position;
        }
        $json = json_encode($positions, JSON_PRETTY_PRINT);
        file_put_contents("./positions.JSON", $json);
        sendJSON("Game END");
    }
}

if($request_method === "PATCH"){
    $json = file_get_contents("./start.JSON");
    $start = json_decode($json, true);
    $start["start"] = $receivedData["start"];
    $json = json_encode($start, JSON_PRETTY_PRINT);
    file_put_contents("./start.JSON", $json);
    sendJSON($start);
}

?>