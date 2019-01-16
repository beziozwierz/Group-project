<?php

include 'config.php';

session_start();
ob_start();
$con = mysqli_connect( $host, $user, $pass, $db);

if (!empty($_SESSION['login'])) {
    $query = mysqli_query(
        $con,
        sprintf("select html from html where user='%s'", $_SESSION['login'])
    );
    while ($row = mysqli_fetch_array($query)) {
	    $html = $row[0];
	}
	echo json_encode($html);exit;
}
?>