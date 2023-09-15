<?php
// Подключение к базе данных MySQL
$servername = "ausrakorolkoviene15357.domaincommysql.com";
$username = "aomra";
$password = "=L/jcyM;gb|Yiw3k";
$dbname = "products_bd";

try {
	$conn = new mysqli($servername, $username, $password, $dbname);
	$conn->set_charset("utf8");

	if ($conn->connect_error) {
		throw new Exception("Connection failed: " . $conn->connect_error);
	}

	// Подготовленный запрос для получения данных
	$stmt = $conn->prepare("SELECT products.id, title, description, options.id as option_id, time, price FROM products LEFT JOIN options ON products.id = options.product_id ORDER BY products.id, options.id");
	$stmt->execute();
	$result = $stmt->get_result();

	if ($result->num_rows > 0) {
		$products = array();
		$current_product_id = null;
		$current_product = null;

		while ($row = $result->fetch_assoc()) {
			if ($current_product_id !== $row["id"]) {
				if ($current_product !== null) {
					$products[] = $current_product;
				}
				$current_product_id = $row["id"];
				$current_product = array(
					"id" => intval($row["id"]),
					"title" => $row["title"],
					"description" => $row["description"],
					"option" => array(),
				);
			}

			$current_product["option"][] = array(
				"id" => intval($row["option_id"]),
				"time" => intval($row["time"]),
				"price" => floatval($row["price"]),
			);
		}

		if ($current_product !== null) {
			$products[] = $current_product;
		}

		// Возвращаем данные в формате JSON
		echo json_encode($products);
	} else {
		echo "No results found";
	}

	$stmt->close();
	$conn->close();
} catch (Exception $e) {
	echo "Error: " . $e->getMessage();
}
?>
