<?php
	if (isset($_COOKIE['user'])) {
		setcookie('user', '', time() - 3600, "/");
	}

	header('Location: https://aomra.co.uk/index.html');
	exit;
?>