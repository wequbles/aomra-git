<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

// Получение JSON из входного потока
$json = file_get_contents('php://input');

// Декодирование JSON в ассоциативный массив
$data = json_decode($json, true);

// Инициализация переменных из массива
$savedOptions = $data['savedOptions'];

$totalTime = require_once 'calculate_cart.php';

// Инициализация переменных
$selectedDayIndex = $data['selectedDayIndex'];
$selectedTimeIndex = $data['selectedTimeIndex'];

$availableTime = $data['availableTime'];
$selectedDay = $availableTime[$selectedDayIndex];
$selectedTime = $selectedDay['time'][$selectedTimeIndex];

// Подключение к базе данных
$servername = "ausrakorolkoviene15357.domaincommysql.com";
$username = "aomra";
$password = "=L/jcyM;gb|Yiw3k";
$dbname = "time_bd";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

var_dump($selectedDay['year']);
var_dump($selectedDay['month']);
var_dump($selectedDay['day']);
var_dump($selectedTime);
var_dump($totalTime);

// Получение значений из массива availableTime и переменной selectedTimeIndex
$year = $selectedDay['year'];
$month = $selectedDay['month'];
$day = $selectedDay['day'];
$time = $selectedTime;
$duration = $totalTime;

// Подготовка SQL-запроса
$sql = "INSERT INTO bookedTime (year, month, day, time, duration) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

// Привязка параметров к подготовленному выражению
$stmt->bind_param("iiisi", $year, $month, $day, $time, $duration);

// Выполнение запроса
$stmt->execute();

// Закрытие подготовленного выражения
$stmt->close();

// Закрытие соединения с базой данных
$conn->close();
?>