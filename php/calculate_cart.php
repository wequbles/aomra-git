<?php

ini_set('display_errors',1);
error_reporting(E_ALL);

function totalTimeCalculation(array $savedOptions, array $products) {
	$totalTime = 0;

	foreach ($savedOptions as $item) {
		$productId = $item["productId"];
		$optionId = $item["optionId"];

		foreach ($products as $product) {
			if ($product["id"] == $productId) {
				foreach ($product["option"] as $option) {
					if ($option["id"] == $optionId) {
						$totalTime += $option["time"];
					}
				}
			}
		}
	}

	return $totalTime;
}

function get_products() {
	require_once 'get_products.php';
	return $products;
}
$products = get_products();

totalTimeCalculation($savedOptions, $products);