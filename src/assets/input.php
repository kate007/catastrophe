<?php

header('Content-Type: application/json');
if(!$_POST['datetime']){
    echo json_encode(["status" => 0, "meesages" => "Please select a date time", "data" => null]);
}elseif(!$_POST['branch']){
    echo json_encode(["status" => 0, "meesages" => "Please select a valid branch", "data" => null]);
}elseif(!$_POST['state']){
    echo json_encode(["status" => 0, "meesages" => "Please select a valid state", "data" => null]);
}else{
    echo json_encode(["status" => 1, "meesages" => "Successfully made appointment", "data" => null]);
}


?>