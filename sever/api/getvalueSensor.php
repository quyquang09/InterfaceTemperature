<?php
session_start();
require_once('../db/dphelper.php');
require_once('../utils/utility.php');
doReadSensor();
function doReadSensor() {
    $user = authenToken();
    if($user == null) {
        $res = [
            "status" => -1,
            "msg" => "chua login !!! ",
            "valueSensor" => [],
        ];
        echo json_encode($res);
        return ;
    }
    $sql = "select * from sensor_value ";
    $result = executeResult($sql);
    $res = [
        "status" => 1,
        "msg" => "",
        "valueSensor" => $result,
    ];
    echo json_encode($res);
}
