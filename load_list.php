<?php

include 'config.php';

session_start();
ob_start();
$con = mysqli_connect( $host, $user, $pass, $db);

if (!empty($_SESSION['login'])) {
    $query = mysqli_query(
        $con,
        sprintf("select project_id, name from user_projects where login='%s'", $_SESSION['login'])
    );

    while ($row = mysqli_fetch_array($query)) {
	    $html[] = [
	    	'project_id' => $row['project_id'],
	    	'name' => $row['name'],
	    ];
	}
	echo json_encode($html);exit;
}
?>