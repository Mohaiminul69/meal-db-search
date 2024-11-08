const input = document.getElementById("searchInput");
const button = document.getElementById("searchButton");

input.addEventListener("keypress", (e) => e.key === "Enter" && searchFood());
button.addEventListener("click", () => searchFood());

const searchFood = () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals))
    .catch((err) => console.log(err));
};

const getDetails = (mealId) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]))
    .catch((err) => console.log(err));
};

const getInstruction = (text) => `${text.split(" ").slice(0, 20).join(" ")}...`;

const displayMealDetails = (meal) => {
  const mealDetails = document.getElementById("modal-body");
  mealDetails.innerHTML = "";
  const div = document.createElement("div");

  div.innerHTML = `
      <div class="card">
          <div class="row g-0">
              <div class="col-md-4">
                  <img src="${meal.strMealThumb}" class="img-fluid rounded-start h-100 w-100" alt="${meal.strMeal}" >
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-2">
                          <h4 class="card-title fw-bolder">${meal.strMeal}</h4>
                          <div class="badge bg-dark py-2"><strong>Category:</strong> ${meal.strCategory}</div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mb-2">
                          <p class="card-text my-auto"><strong>Origin:</strong> ${meal.strArea}</p>
                      </div>
                      <p class="card-text"><strong>Instruction:</strong> ${meal.strInstructions}</p>                        
                      <a href="${meal.strSource}" class="text-decoration-none"><button class="btn btn-success me-2">Read Blog</button></a>                       
                      <a href="${meal.strYoutube}" class="text-decoration-none"><button class="btn btn-success">Watch Video Tutorial</button></a>                       
                  </div>
              </div>
          </div>
      </div>
  `;

  mealDetails.appendChild(div);
};

const displayMeals = (meals) => {
  const mealContainer = document.getElementById("container");
  mealContainer.innerHTML = "";

  if (meals === null) {
    mealContainer.innerHTML = `
    <div class="row justify-content-center mt-3">
    <div class="col-12">
      <h5 class="text-warning">No results found</h5>
      <p class="text-warning">Try adjusting your search to find what you're looking for.</p>
    </div>
  </div>
    `;

    return;
  }

  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.className = "col";

    div.innerHTML = `
            <div 
            data-bs-toggle="modal"
            data-bs-target="#exampleModal" 
            class="card h-100 rounded-4" 
            onclick="getDetails(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${
      meal.strMeal
    }">
                <div class="card-body">
                    <h4 class="card-title fs-3">${
                      meal.strMeal
                    }</h4>                                
                    <p class="card-text"><strong>Instruction:</strong> ${getInstruction(
                      meal.strInstructions
                    )}</p>
                    <div class="badge bg-dark py-2">${meal.strCategory}</div>
                </div>
            </div>
        `;

    mealContainer.appendChild(div);
  });
};
