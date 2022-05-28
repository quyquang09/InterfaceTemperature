<?php
require_once ('config.php');

/**
 * Su dung cho lenh: insert,update,delete ->ko tra ve ket qua
 */
function execute($sql) {
	// Them du lieu vao database
	//B1. Mo ket noi toi database
	$conn = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);
	mysqli_set_charset($conn, 'utf8');

	//B2. Thuc hien truy van insert
	mysqli_query($conn, $sql);

	//B3. Dong ket noi database
	mysqli_close($conn);
}
/**
 * Su dung cho lenh: select
 */
function executeResult($sql , $isSingleRecord =false) {
	// Them du lieu vao database
	//B1. Mo ket noi toi database
	$conn = mysqli_connect(HOST, USERNAME, PASSWORD, DATABASE);
	mysqli_set_charset($conn, 'utf8');

	//B2. Thuc hien truy van insert
	$resultset = mysqli_query($conn, $sql);
    if($isSingleRecord){
        $data = mysqli_fetch_array($resultset, 1);
    }else {
        $data= [];
	    while (($row = mysqli_fetch_array($resultset, 1)) != null) {
		    $data[] = $row;
	    }
    }
	//B3. Dong ket noi database
	mysqli_close($conn);

	return $data;
}




