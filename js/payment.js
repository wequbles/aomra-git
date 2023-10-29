"use strict";

const chequePriceElement = document.getElementById('chequePrice');
chequePriceElement.textContent = 'Total to pay ' + '£' + cart.totalPrice;

/* Stripe */
// Это ваш тестовый публикуемый API-ключ
const stripe = Stripe("pk_test_51NpIC0HfU9IylH9AETfZTbHUI73oDb91svwTzZLjZRDh3umSrwANx2Ld1x2iyEN25KQ3tTIlsmCCSBhL1xgG7tSM009YzYQq9h");

let elements;

initialize();
checkStatus();

document
	.querySelector("#payment-form")
	.addEventListener("submit", handleSubmit);

let emailAddress = '';
// Получает намерение платежа и фиксирует секрет клиента
async function initialize() {
	const { clientSecret } = await fetch("php/create.php", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ savedOptions }),
	}).then((r) => r.json());

	elements = stripe.elements({ clientSecret });

	const linkAuthenticationElement = elements.create("linkAuthentication");
	linkAuthenticationElement.mount("#link-authentication-element");

	const paymentElementOptions = {
		layout: "tabs",
	};

	const paymentElement = elements.create("payment", paymentElementOptions);
	paymentElement.mount("#payment-element");
}

async function handleSubmit(e) {
	e.preventDefault();
	setLoading(true);

	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			// Убедитесь, что эта страница соответствует странице завершения платежа
			return_url: "https://s01.yapfiles.ru/files/1118325/_zaebis.gif",
			receipt_email: emailAddress,
		},
	});

	// Эта точка будет достигнута только в том случае, если при подтверждении платежа произошла ошибка. В противном случае клиент будет перенаправлен на ваш `return_url`. Для некоторых методов оплаты, например iDEAL, клиент будет перенаправлен на промежуточный сайт сначала для авторизации платежа, а затем а затем - на `return_url`.
	if (error.type === "card_error" || error.type === "validation_error") {
		showMessage(error.message);
	} else {
		showMessage("An unexpected error occurred.");
	}

	setLoading(false);
}

// Получает статус намерения платежа после отправки платежа
async function checkStatus() {
	const clientSecret = new URLSearchParams(window.location.search).get(
		"payment_intent_client_secret"
	);

	if (!clientSecret) {
		return;
	}

	const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

	switch (paymentIntent.status) {
		case "succeeded":
			showMessage("Payment succeeded!");
			break;
		case "processing":
			showMessage("Your payment is processing.");
			break;
		case "requires_payment_method":
			showMessage("Your payment was not successful, please try again.");
			break;
		default:
			showMessage("Something went wrong.");
			break;
	}
}

// ------- UI помощники -------

function showMessage(messageText) {
	const messageContainer = document.querySelector("#payment-message");

	messageContainer.classList.remove("hidden");
	messageContainer.textContent = messageText;

	setTimeout(function () {
		messageContainer.classList.add("hidden");
		messageContainer.textContent = "";
	}, 4000);
}

// Отображение спиннера при отправке платежа
function setLoading(isLoading) {
	if (isLoading) {
		// Отключить кнопку и показать волчок
		document.querySelector("#submit").disabled = true;
		document.querySelector("#spinner").classList.remove("hidden");
		document.querySelector("#button-text").classList.add("hidden");
	} else {
		document.querySelector("#submit").disabled = false;
		document.querySelector("#spinner").classList.add("hidden");
		document.querySelector("#button-text").classList.remove("hidden");
	}
}