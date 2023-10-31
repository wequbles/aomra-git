<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

require_once '../stripe-php/init.php';
require_once 'secrets.php';

$stripe = new \Stripe\StripeClient($stripeSecretKey);

function calculateOrderAmount(array $savedOptions, array $products): int {
	$totalPrice = 0;

	foreach ($savedOptions as $item) {
		$productId = $item["productId"];
		$optionId = $item["optionId"];

		foreach ($products as $product) {
			if ($product["id"] == $productId) {
				foreach ($product["option"] as $option) {
					if ($option["id"] == $optionId) {
						$totalPrice += $option["price"];
					}
				}
			}
		}
	}

	$totalPrice = number_format($totalPrice, 2, ".", "") * 100;
	return intval($totalPrice);
}

function get_products() {
	require_once 'get_products.php';
	return $products;
}

header('Content-Type: application/json');

try {
	// получаем JSON из тела POST
	$jsonStr = file_get_contents('php://input');
	$jsonObj = json_decode($jsonStr, true);

	$products = get_products();

	$orderAmount = calculateOrderAmount($jsonObj['savedOptions'], $products);

	// Создаем PaymentIntent с суммой и валютой
	$paymentIntent = $stripe->paymentIntents->create([
		'amount' => $orderAmount,
		'currency' => 'eur',
		'automatic_payment_methods' => [
			'enabled' => true,
		],
	]);

	$output = [
		'clientSecret' => $paymentIntent->client_secret,
	];

	echo json_encode($output);
} catch (Error $e) {
	http_response_code(500);
	echo json_encode(['error' => $e->getMessage()]);
}