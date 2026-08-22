/**
 * Meal Finder - JavaScript (app.js)
 * Course: MIS455 Final Assessment
 * Author: MD. Ozaire Wasit (Student ID: 2222425)
 * Copyright (c) 2026 MD. Ozaire Wasit. All rights reserved.
 */

// Global variable to store all meals returned by the API
let allMeals = [];

// Search function triggered when user clicks Search or presses Enter
function searchMeals() {
  // 1. Get the typed text from search input (Requirement 3)
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.trim();

  // Check if user left the input empty
  if (searchText === "") {
    alert("Please enter a meal name to search!");
    return;
  }

  // 2. Erase previous results from the page (Requirement 6)
  const mealsContainer = document.getElementById('meals-container');
  const statusMessage = document.getElementById('status-message');
  const showAllContainer = document.getElementById('show-all-container');

  mealsContainer.innerHTML = "";
  showAllContainer.style.display = "none";
  statusMessage.innerHTML = `<span class="spinner-border spinner-border-sm text-danger" role="status"></span> Searching for "${searchText}"...`;

  // 3. Replace typedtext with actual typed word in API URL (Requirement 2 & 3)
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  // 4. Fetch data from TheMealDB API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Check if no meal was found
      if (!data.meals) {
        statusMessage.innerHTML = `<div class="alert alert-warning d-inline-block">No meals found for "${searchText}". Please try another word like "Chicken", "Pasta", or "Beef".</div>`;
        return;
      }

      // Save results to our global array
      allMeals = data.meals;

      // Update status message
      statusMessage.innerHTML = `<h4 class="text-dark">Found ${allMeals.length} recipes for "${searchText}"</h4>`;

      // 5. Display the first 5 meals initially (Requirement 5)
      displayMeals(false);

      // Scroll page smoothly to results top (Requirement 6)
      document.getElementById('main-content').scrollIntoView({ behavior: 'smooth' });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      statusMessage.innerHTML = `<div class="alert alert-danger d-inline-block">Failed to connect to API. Please check your internet connection.</div>`;
    });
}

// Function to create and display meal cards in the UI
function displayMeals(showAll) {
  const mealsContainer = document.getElementById('meals-container');
  const showAllContainer = document.getElementById('show-all-container');
  
  // Clear previous HTML
  mealsContainer.innerHTML = "";

  // Requirement 5: If > 5 results found, show only first 5 meals initially
  let mealsToDisplay;
  if (showAll === true) {
    mealsToDisplay = allMeals; // Show everything
    showAllContainer.style.display = "none"; // Hide button once all are shown
  } else {
    mealsToDisplay = allMeals.slice(0, 5); // Show first 5 only

    // If more than 5 results exist, display the "SHOW ALL" button
    if (allMeals.length > 5) {
      showAllContainer.style.display = "block";
    } else {
      showAllContainer.style.display = "none";
    }
  }

  // Loop through each meal and build the card (Requirement 4)
  mealsToDisplay.forEach(meal => {
    // Extract required fields
    const mealId = meal.idMeal;
    const mealName = meal.strMeal;
    const mealImage = meal.strMealThumb;
    const mealCategory = meal.strCategory ? meal.strCategory : "Delicious Meal";
    const mealArea = meal.strArea ? `(${meal.strArea} Dish)` : "";
    const instructions = meal.strInstructions ? meal.strInstructions : "No instructions available.";

    // Create column and card HTML (Requirement 4: ID, Name, Image, Title, Cooking Instructions)
    const cardHTML = `
      <div class="col-md-6 col-lg-4">
        <div class="meal-card shadow-sm">
          <!-- Meal Image -->
          <img src="${mealImage}" alt="${mealName}" class="meal-img">
          
          <div class="meal-body">
            <!-- Meal ID -->
            <span class="meal-id-badge">ID: ${mealId}</span>
            
            <!-- Meal Name & Title -->
            <h5 class="meal-title">${mealName}</h5>
            <p class="meal-category">${mealCategory} ${mealArea}</p>
            
            <!-- Cooking Instructions -->
            <label class="fw-bold text-secondary small mb-1">Cooking Instructions:</label>
            <div class="instructions-box">
              ${instructions}
            </div>
          </div>
        </div>
      </div>
    `;

    // Append to container
    mealsContainer.innerHTML += cardHTML;
  });
}

// Function called when "SHOW ALL" button is clicked (Requirement 5)
function showAllMeals() {
  displayMeals(true);
}

// Allow pressing "Enter" key inside the search input box to search
document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchMeals();
  }
});
