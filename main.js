const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");

button.addEventListener("click", () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then((res) => res.json())
    .then((data) => displaySearchResults(data.meals))
    .catch((err) => console.log(err));
});

const getFirstTwentyWords = (text) => {
  const words = text.split(" ");
  return words.slice(0, 20).join(" ") + "... Read More";
};

const displaySearchResults = (meals) => {
  const mealContainer = document.getElementById("container");
  mealContainer.innerHTML = "";

  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.className = "col";

    div.innerHTML = `
            <div class="card h-100" onclick="handleViewMeal(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${
      meal.strMeal
    }">
                <div class="card-body">
                    <h4 class="card-title fs-3">${
                      meal.strMeal
                    }</h4>                                
                    <p class="card-text"><strong>Instruction:</strong> ${getFirstTwentyWords(
                      meal.strInstructions
                    )}</p>
                    <div class="badge bg-dark py-2">${meal.strCategory}</div>
                </div>
            </div>
        `;

    mealContainer.appendChild(div);
  });
};
