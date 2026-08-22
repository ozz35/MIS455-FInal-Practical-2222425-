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