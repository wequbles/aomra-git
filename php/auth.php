<?php
	error_reporting(E_ALL);

	$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_STRING);
	$pass = filter_var(trim($_POST['pass']), FILTER_SANITIZE_STRING);

	$hashed_password = password_hash($pass, PASSWORD_DEFAULT);

	// Подключение к базе данных
	$servername = "ausrakorolkoviene15357.domaincommysql.com";
	$username = "aomra";
	$password = "=L/jcyM;gb|Yiw3k";
	$dbname = "register_bd";

	$conn = new mysqli($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
		die("Ошибка подключения: " . $conn->connect_error);
	}

	$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows == 0) {
		echo "Такой пользователь не найден";
		exit;
	}

	$user = $result->fetch_assoc();
	if (!password_verify($pass, $user['hashed_password'])) {
		echo "Неправильный пароль";
		exit;
	}

	if (strlen($email) > 50) {
		echo "Email слишком длинный";
		exit;
	}

	$login_attempts_limit = 5;
	$login_attempts_timeout = 60;
	$login_attempts_key = 'login_attempts_'.$email;

	if (isset($_SESSION[$login_attempts_key])) {
		if ($_SESSION[$login_attempts_key] > $login_attempts_limit) {
			echo "Превышен лимит попыток входа. Пожалуйста, подождите ".$login_attempts_timeout." секунд";
			exit;
		}
	}

	if (!password_verify($pass, $user['hashed_password'])) {
		if (!isset($_SESSION[$login_attempts_key])) {
			$_SESSION[$login_attempts_key] = 1;
		} else {
			$_SESSION[$login_attempts_key]++;
		}
		echo "Неправильный пароль";
		exit;
	}

	setcookie('user', $user['email'], time() + 3600, "/");


	$stmt->close();
	$conn->close();

	header('Location: https://aomra.co.uk/index.html');
	exit;
?>
