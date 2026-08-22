let allMeals = []; // Global memory array

function searchMeals() {
  // 1. Read input from HTML
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.trim();

  if (searchText === "") {
    alert("Please enter a meal name!");
    return;
  }

  // 2. Build API URL with user query (Requirement 2 & 3)
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  // 3. Fetch from API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("API Data received:", data); // Test in browser console
      allMeals = data.meals;
    });
}

function displayMeals(showAll) {
  const mealsContainer = document.getElementById('meals-container');
  mealsContainer.innerHTML = ""; // Clear previous

  // Requirement 5: Show first 5 only
  const mealsToDisplay = allMeals.slice(0, 5);

  // Requirement 4: Loop and build each card
  mealsToDisplay.forEach(meal => {
    const mealId = meal.idMeal;
    const mealName = meal.strMeal;
    const mealImage = meal.strMealThumb;
    const mealCategory = meal.strCategory ? meal.strCategory : "Delicious Meal";
    const instructions = meal.strInstructions ? meal.strInstructions : "No instructions.";

    const cardHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="meal-card shadow-sm">
          <img src="${mealImage}" alt="${mealName}" class="meal-img">
          <div class="meal-body">
            <span class="meal-id-badge">ID: ${mealId}</span>
            <h5 class="meal-title">${mealName}</h5>
            <p class="meal-category">${mealCategory}</p>
            <label class="fw-bold text-secondary small mb-1">Cooking Instructions:</label>
            <div class="instructions-box">${instructions}</div>
          </div>
        </div>
      </div>
    `;

    mealsContainer.innerHTML += cardHTML;
  });
}

function displayMeals(showAll) {
  const mealsContainer = document.getElementById('meals-container');
  const showAllContainer = document.getElementById('show-all-container');
  mealsContainer.innerHTML = "";

  // If showAll is true, show all; otherwise show only first 5
  let mealsToDisplay;
  if (showAll === true) {
    mealsToDisplay = allMeals;
    showAllContainer.style.display = "none"; // Hide button once all are shown
  } else {
    mealsToDisplay = allMeals.slice(0, 5);

    // If more than 5 results exist, show the button
    if (allMeals.length > 5) {
      showAllContainer.style.display = "block";
    } else {
      showAllContainer.style.display = "none";
    }
  }

  // Loop & render cards... (same loop as Step 2B)
}

// Function called when SHOW ALL is clicked
function showAllMeals() {
  displayMeals(true);
}