<?php

include 'config.php';

session_start();
ob_start();
$con = mysqli_connect( $host, $user, $pass, $db);

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (!empty($_POST['login']) && !empty($_POST['pass'])) {
        $login = mysqli_query(
            $con,
            sprintf("select login from users where login='%s' and password='%s'", trim($_POST['login']), md5($_POST['pass']))
        );

        if(empty(mysqli_num_rows($login))) {
            echo '<META HTTP-EQUIV="Refresh" CONTENT="2;URL=./index.php">';exit;
        } else {
            $_SESSION['login'] = $_POST['login'];
            echo '<META HTTP-EQUIV="Refresh" CONTENT="0;URL=./index.html">';
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>PWr Group Project</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<!--Google Font - Work Sans-->
<link href='https://fonts.googleapis.com/css?family=Work+Sans:400,300,700' rel='stylesheet' type='text/css'>
<div class="container">
    <div class="profile">
        <button class="profile__avatar" id="toggleProfile">
            <img src="https://www.wroclaw.pl/files/katalog-uczelni/pwr-pion2.jpg" alt="Avatar" />
        </button>
        <div class="profile__form">
            <div class="profile__fields">
                <form action="index.php"  method="post">
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
                        <a class="btn" href="/registration.php">Registration</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="js/index.js"></script>
</body>
</html>
