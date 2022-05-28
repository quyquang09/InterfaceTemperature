<?php

$servername = "localhost";
$username = "id19000075_uset";
$password = "************";
$dbname = "id19000075_data";

$api_key_value = "tPmAT5Ab3j7F9";

 $nhietdo = $doam =  "";

    //Get current date and time
    date_default_timezone_set('Asia/Bangkok');
    $d = date("Y-m-d");
    //echo " Date:".$d."<BR>";
    $t = date("H:i:s");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nhietdo = test_input($_POST["nhietdo"]);
        $doam = test_input($_POST["doam"]);
        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } 
        
        $sql = "INSERT INTO sensor_value (nhietdo, doam, date, time)
        VALUES ('" . $nhietdo . "', '" . $doam . "', '".$d."','".$t."')"; 
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } 
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    
        $conn->close();

}
else {
    echo "No data posted with HTTP POST.";
}


