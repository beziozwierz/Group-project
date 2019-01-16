<?php

include 'config.php';

session_start();
ob_start();
$con = mysqli_connect( $host, $user, $pass, $db);

//var_dump($_POST['html'], $_SESSION['login']);die;

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (!empty($_POST['html']) && !empty($_SESSION['login'])) {
        mysqli_query(
            $con,
            sprintf(
                "Replace INTO html (user, html) VALUES ('%s', '%s')",
                $_SESSION['login'], trim($_POST['html'])
            )
        );
        echo json_encode('ok');
        exit;
    }
}
?>