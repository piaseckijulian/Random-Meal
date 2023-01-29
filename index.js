const mealDiv = document.getElementById('meal');
const newMealBtn = document.getElementById('newMeal');

const generateMeal = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(url);
  const data = await response.json();

  displayMeal(data);
};

const displayMeal = (data) => {
  const meal = data.meals[0];

  mealDiv.innerHTML = '';

  const title = document.createElement('h1');
  title.innerText = meal.strMeal;

  const picture = document.createElement('img');
  picture.src = meal.strMealThumb;
  picture.alt = '';
  picture.id = 'picture';

  const ingredientsHeading = document.createElement('h2');
  ingredientsHeading.innerText = 'Ingredients';

  const ingredients = document.createElement('ul');
  for (let i = 1; i <= 20; i++) {
    if (
      meal['strIngredient' + i].trim() === '' ||
      meal['strMeasure' + i].trim() === ''
    )
      break;

    const ingredient = document.createElement('li');
    ingredient.innerText = `${meal['strIngredient' + i]}: ${
      meal['strMeasure' + i]
    }`;
    ingredients.appendChild(ingredient);
  }

  const instructionsHeading = document.createElement('h2');
  instructionsHeading.innerText = 'Instructions';

  const instructions = document.createElement('p');
  instructions.innerText = meal.strInstructions;

  const videoHeading = document.createElement('h2');
  videoHeading.innerText = 'Video';

  const video = document.createElement('iframe');
  const videoUrl = 'https://www.youtube.com/embed/';
  const code = meal.strYoutube.slice(32);

  video.src = `${videoUrl}${code}`;
  video.width = 800;
  video.height = 400;
  video.setAttribute('allow', 'fullscreen');

  mealDiv.appendChild(title);
  mealDiv.appendChild(picture);
  mealDiv.appendChild(ingredientsHeading);
  mealDiv.appendChild(ingredients);
  mealDiv.appendChild(instructionsHeading);
  mealDiv.appendChild(instructions);
  mealDiv.appendChild(videoHeading);
  mealDiv.appendChild(video);
};

newMealBtn.onclick = () => generateMeal();
