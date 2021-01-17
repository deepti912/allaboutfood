const searchInput = document.querySelector('.search-wrapper');
const searchResult = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '3eabcbe1';
const APP_KEY = 'e7fcbe1fc6c469655e7602c070a5b4bb';


searchInput.addEventListener('submit', (e) => {
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	fetchAPI();
});

async function fetchAPI () {
	const API_link = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
	const response = await fetch(API_link);
	const data = await response.json();
	generateResults(data.hits);
	console.log(data);
}

function generateResults(results) {
	let generatedHTML = '';
	results.map(result => {
		generatedHTML +=
		`
		<div class="item">
			<img src="${result.recipe.image}" alt="">
			<div class="flex-container">
				<h1 class="title">${result.recipe.label}</h1>
			</div>
			<a class="view-button" href="${result.recipe.url}" target="_blank">Click for Recipe</a>
			<p class="item-datas"><b>Calories per serving: </b>${Math.ceil(result.recipe.calories.toFixed(0)/result.recipe.yield)}</p>
			<p class="item-datas"><b>Diet-Label: </b>${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: 'Not available'}</p>
			<p class="item-datas"><b>Heath-Label: </b>${result.recipe.healthLabels}</p>
		</div>
		`
	})
	searchResult.innerHTML = generatedHTML;
}
