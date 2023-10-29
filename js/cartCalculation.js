let savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || []; // Получаем сохраненные опции из LocalStorage при загрузке страницы

let products;

products = [
	{
		id: 1,
		title: 'Массаж банками',
		description: 'Описание банок',
		option: [{id: 1, time: 30, price: 19.99 }]
	},
	{
		id: 2,
		title: 'Массаж палками',
		description: 'Описание палок',
		option: [
			{id: 1, time: 15, price: 19.99 },
			{id: 2, time: 30, price: 24.44 }
		]
	},
	{
		id: 3,
		title: 'Массаж руками',
		description: 'Описание рук',
		option: [
			{id: 1, time: 45, price: 19.99 },
			{id: 2, time: 60, price: 31.50 },
			{id: 3, time: 90, price: 49.99 }
		]
	}
];

/* Корзина */
let cart = {
	size: 0,
	totalPrice: 0,
	totalTime: 0
};

// Используем fetch для выполнения GET-запроса к серверу
// fetch('php/get_products.php', {
// 	headers: {
// 		'Accept': 'application/json'
// 	}
// })
// .then(response => {
// 	if (!response.ok) {
// 		throw new Error('Network response was not ok');
// 	}
// 	return response.json(); // Парсим JSON-ответ
// })
// .then(products => {
// 	console.log(products);

	function cartCalculation(savedOptions) {
		/* Вычисляем общую сумму цен выбранных опций totalPrice */
		cart.totalPrice = 0; // Обнуляем totalPrice перед пересчетом
		savedOptions.forEach(option => {
			const product = products.find(prod => prod.id === option.productId);
			if (product) {
				const selectedOption = product.option.find(opt => opt.id === option.optionId);
				if (selectedOption) {
					cart.totalPrice += selectedOption.price;
				}
			}
		});

		/* Вычисляем общее время приема totalTime */
		cart.totalTime = 0;
		savedOptions.forEach(option => {
			const product = products.find(prod => prod.id === option.productId);
			if (product) {
				const selectedOption = product.option.find(opt => opt.id === option.optionId);
				if (selectedOption) {
					cart.totalTime += selectedOption.time;
				}
			}
		});

		/* Вычисляем размер корзины cart.size */
		cart.size = savedOptions.length;
		if (typeof updateCart === 'function') {
				updateCart();
		}
	}

	function localstorageInspect() {
		console.log(JSON.stringify(localStorage.getItem('selectedOptions')));
		console.log(cart);
	}

	cartCalculation(savedOptions);
	localstorageInspect();

// })
// .catch(error => {
// 	console.error('There was a problem with the fetch operation:', error);
// });