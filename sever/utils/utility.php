<?php
function fixSqlInjection($str) {
	$str = str_replace("\\", "\\\\", $str);
	$str = str_replace("'", "\'", $str);
	return $str;
}
function authenToken() {
    if (isset($_SESSION['username'])) {
		return $_SESSION['username'];
	}
	$token = getCOOKIE('token');
    if(empty($token)) {
        return null;
    }
    $sql = "select userinfo.* from userinfo, login_tokens where userinfo.id  
		= login_tokens.id_user and login_tokens.token ='$token'";
    $result = executeResult($sql);
    if($result !=null && count($result)>0) {
        $_SESSION['username'] = $result[0];
		return '$result[0]';
    }
    return null;
}
function getPOST($key) {
	$value = '';
	if (isset($_POST[$key])) {
		$value = $_POST[$key];
	}
	return fixSqlInjection($value);
}
function getCOOKIE($key) {
	$value = '';
	if (isset($_COOKIE[$key])) {
		$value = $_COOKIE[$key];
	}
	return fixSqlInjection($value);
}
function getGET($key) {
	$value = '';
	if (isset($_GET[$key])) {
		$value = $_GET[$key];
	}
	return fixSqlInjection($value);
}
function md5Security($pwd) {
	return md5(md5($pwd).MD5_PRIVATE_KEY);
}
?>