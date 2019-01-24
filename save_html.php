<?php

include 'config.php';

session_start();
ob_start();
$con = mysqli_connect( $host, $user, $pass, $db);

//var_dump($_POST['html'], $_SESSION['login']);die;

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (!empty($_POST['html']) && !empty($_SESSION['login']) && !empty($_POST['name'])) {
        mysqli_query(
            $con,
            sprintf(
                "REPLACE INTO user_projects (login, name) VALUES ('%s', '%s')",
                $_SESSION['login'], trim($_POST['name'])
            )
        );
        mysqli_query(
            $con,
            sprintf(
                "REPLACE INTO html (project_id, html) VALUES ('%s', '%s')",
                $con->insert_id, trim($_POST['html'])
            )
        );
        echo json_encode($con->insert_id);
        exit;
    }
}
