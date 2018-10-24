<?php

include 'config.php';

session_start();
ob_start();
$con = mysqli_connect( $host, $user, $pass, $db);

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (!empty($_POST['firstname']) &&
        !empty($_POST['lastname']) &&
        !empty($_POST['email']) &&
        !empty($_POST['login']) &&
        !empty($_POST['pass'])
    ) {
        $reg = mysqli_query(
            $con,
            sprintf(
                "INSERT INTO users (firstname, lastname, email, login, password) VALUES ('%s', '%s', '%s', '%s', '%s')",
                trim($_POST['firstname']), trim($_POST['lastname']), trim($_POST['email']), trim($_POST['login']), md5($_POST['pass'])
            )
        );

        if(!$reg) {
            echo '<META HTTP-EQUIV="Refresh" CONTENT="2;URL=./registration.php">';exit;
        } else {
            $_SESSION['login'] = $_POST['login'];
            echo '<META HTTP-EQUIV="Refresh" CONTENT="0;URL=./index.html">';
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>PWr Group Project</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<!--Google Font - Work Sans-->
<link href='https://fonts.googleapis.com/css?family=Work+Sans:400,300,700' rel='stylesheet' type='text/css'>
<div class="container">
    <div class="profile profile--open">
        <div class="profile__form ">
            <div class="profile__fields">
                <form action="registration.php"  method="post">
                    <div class="field">
                        <input type="text" id="fieldUser" class="input" name="firstname" required />
                        <label for="fieldUser" class="label">First Name</label>
                    </div>
                    <div class="field">
                        <input type="text" id="fieldUser" class="input" name="lastname" required />
                        <label for="fieldUser" class="label">Last Name</label>
                    </div>
                    <div class="field">
                        <input type="email" id="fieldUser" class="input" name="email" required />
                        <label for="fieldUser" class="label">Email</label>
                    </div>
                    <div class="field">
                        <input type="text" id="fieldUser" class="input" name="login" required pattern=.*\S.* />
                        <label for="fieldUser" class="label">Username</label>
                    </div>
                    <div class="field">
                        <input type="password" id="fieldPassword" class="input" name="pass" required pattern=.*\S.* />
                        <label for="fieldPassword" class="label">Password</label>
                    </div>
                    <div class="profile__footer">
                        <input type="submit" class="btn">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="js/index.js"></script>
</body>
</html>
