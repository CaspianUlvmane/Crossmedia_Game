<?php

$filename = "hazards.JSON";
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
$hazards = [];

if(!file_exists($filename)){
    $json = json_encode($hazards, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
}


// If the user is looking for hazards with the GET method

if($request_method === "GET"){
    if(isset($_GET["positions"])){
        $json = file_get_contents("positions.JSON");
        $positions = json_decode($json, true);
        sendJSON($json);
    }
    $json = file_get_contents($filename);
    $hazards = json_decode($json, true);
    sendJSON($hazards);
}

if($request_method === "POST"){
    $json = file_get_contents($filename);
    $hazards = json_decode($json, true);
    if(count($hazards) < 1){
        $id = 1;
    } else{
        foreach($hazards as $index => $hazard){
            if(count($hazards) - 1 === $index){
                $id = $hazard["id"] + 1;
            }
        }
    }
    $hazard = $receivedData;
    $hazard["id"] = $id;
    $hazards[] = $hazard;
    $json = json_encode($hazards, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    sendJSON($id);
}

if($request_method === "DELETE"){
    $json = file_get_contents($filename);
    $hazards = json_decode($json, true);
    $id = (int)$receivedData["id"];
   
    foreach($hazards as $index => $hazard){
        if($hazard["id"] === $id){
            array_splice($hazards, $index, 1);
            $json = json_encode($hazards, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            sendJSON($id);
        }
    }
}

if($request_method === "PATCH"){
    $filename = "positions.JSON";
    $json = file_get_contents($filename);
    $positions = json_decode($json, true);

    foreach($positions as $index => $position){
        if($position["id"] === (int)$receivedData["user_id"]){
            $position["lat"] = $receivedData["lat"];
            $position["lng"] = $receivedData["lng"];
            $positions[$index] = $position;
            $json = json_encode($positions, JSON_PRETTY_PRINT);
            file_put_contents($filename, $json);
            sendJSON($position);
        }
    }
}

?>