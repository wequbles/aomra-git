<?php
	error_reporting(E_ALL);

	$email = filter_var(trim($_POST['email']),
	FILTER_SANITIZE_STRING);
	$pass = filter_var(trim($_POST['pass']),
	FILTER_SANITIZE_STRING);
	$conf_pass = filter_var(trim($_POST['conf_pass']),
	FILTER_SANITIZE_STRING);

	if (empty($email) || empty($pass) || empty($conf_pass)) {
		echo "Необходимо заполнить все поля";
		exit;
	} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		echo "Неправильный формат email";
		exit;
	} else if (mb_strlen($pass) < 6 || mb_strlen($pass) > 20) {
		echo "Пароль должен содержать не менее 6 символов и не более 20";
		exit;
	} else if ($pass !== $conf_pass) {
		echo "Пароль и подтверждение пароля не совпадают";
		exit;
	}

	$hashed_password = password_hash($pass, PASSWORD_DEFAULT);

	// Подключение к базе данных
	$servername = "ausrakorolkoviene15357.domaincommysql.com";
	$username = "aomra";
	$password = "=L/jcyM;gb|Yiw3k";
	$dbname = "products_bd";

	$conn = new conni($servername, $username, $password, $dbname);

	if ($conn->connect_error) {
		die("Ошибка подключения: " . $conn->connect_error);
	}

	$stmt = $conn->prepare("INSERT INTO `users` (`email`, `hashed_password`) VALUES (?, ?)");
	$stmt->bind_param("ss", $email, $hashed_password);
	$stmt->execute();
	$stmt->close();
	$conn->close();

	echo "Регистрация успешно завершена!";

	header('Location: https://aomra.co.uk/index.html');
	exit;
?>