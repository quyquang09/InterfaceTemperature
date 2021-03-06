<?php
session_start();
require_once('../db/dphelper.php');
require_once('../utils/utility.php');

$action = getPOST('action');
switch($action) {
    case 'login':
        doLogin();
        break;
    case 'register':
        doRegister();
        break;
    case 'sendSensor':
        doSendValueSensor();
        break;
}
function doLogin() {
    $email = getPOST('email');
    $password = getPOST('password');
    $password = md5Security($password);
    $sql = "select * from userinfo where email = '$email' and password = '$password'" ;
    $user = executeResult($sql,true);
    
    if($user != null) {
        $email = $user['email'];
        $id    = $user['id'];
        $username =$user['username'];
        $token = md5Security($email.time().$id);
        //save database
        $sql = "insert into login_tokens (id_user,token) values ('$id','$token')";
        execute($sql);
        setcookie("token",$token,time()+7*24*60*60,"/");
        $res = [
            "status" => 1,
            "msg" => "Login success !!!",
            "username" => $username
        ];
    }else{
        $res = [
            "status" => -1,
            "msg" => "Login failed !!! "
        ];
    }
    echo json_encode($res);
}
function doRegister() {
    $username = getPOST('username');
    $password = getPOST('password');
    $phone = getPOST('phone');
    $email = getPOST('email');

    $sql = "select * from userinfo where email = '$email' or username ='$username' or phone ='$phone'";
    $sqlEmail = "select * from userinfo where email = '$email'";
    $sqlUsername = "select * from userinfo where username ='$username'";
    $sqlPhone = "select * from userinfo where phone ='$phone'";
    
    $result= executeResult($sql);
    $resultEmail = executeResult($sqlEmail);
    $resultUsername = executeResult($sqlUsername);
    $resultPhone= executeResult($sqlPhone);
    if($result==null || count($result)==0) {
        $password = md5Security($password);
        $sql = "insert into userinfo (username,email,password,phone) values
         ('$username','$email','$password','$phone')";
        execute($sql);
        $res = [
            "status" => 1,
            "msg" => " ????ng k?? th??nh c??ng !!!"
        ];
    }else {
        if($resultEmail!=null || count($resultEmail)!=0) {
            $res = [
                "status" => -1,
                "msg" => "email ???? t???n t???i !!! "
            ];
        }
        if($resultUsername!=null || count($resultUsername)!=0) {
            $res = [
                "status" => -2,
                "msg" => "T??n t??i kho???n ???? t???n t???i !!! "
            ];
        }
        if($resultPhone!=null || count($resultPhone)!=0) {
            $res = [
                "status" => -3,
                "msg" => "S??? ??i???n tho???i ???? t???n t???i !!! "
            ];
        }
        
    }
    echo json_encode($res);
}

function doSendValueSensor() {
    // L???y ng??y v?? gi??? hi???n t???i
    date_default_timezone_set('Asia/Bangkok');
    $d = date("Y-m-d");
    //echo " Date:".$d."<BR>";
    $t = date("H:i:s");
    if(!empty($_POST['nhietdo']) && !empty($_POST['doam'])) {
        $nhietdo = getPOST('nhietdo');
        $doam = getPOST('doam');
        $sql = "insert into sensor_value (doam, nhietdo, Date, Time)
        values ('$doam', '$nhietdo', '$d', '$t')";
        execute($sql);
        $res = [
            "status" => 1,
            "msg" => " G???i gi?? tr??? l??n database th??nh c??ng !!!"
        ];
    }
    else {
        $res = [
            "status" => -1,
            "msg" => " Kh??ng c?? gi?? tr??? ????? g???i !!!"
        ];
    }
    echo json_encode($res);
}
   


