const recipeNav = document.getElementById('recipe-nav');
const recipeContainer = document.getElementById('recipe-container');
let allRecipes = []; 


async function fetchRecipes() {
    try {
        
        const response = await fetch('data.json.js');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allRecipes = await response.json();
        
      
        createNavigation(allRecipes);
        
    } catch (error) {
        console.error('Could not fetch recipe data:', error);
        recipeContainer.innerHTML = '<p>Error loading recipes. Please check the data.json file.</p>';
    }
}


function createNavigation(recipes) {
    
    recipeNav.querySelector('p')?.remove(); 

    recipes.forEach((recipe, index) => {
        const button = document.createElement('button');
        button.textContent = recipe.title;
        button.classList.add('recipe-button');
        button.setAttribute('data-index', index); 

       
        button.addEventListener('click', () => {
            displayRecipe(recipe);
        });

        recipeNav.appendChild(button);
    });
}


function displayRecipe(recipe) {
    
    const createListHTML = (items) => `
        <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    
    recipeContainer.innerHTML = `
        <div class="recipe-card">
            
            <h2>${recipe.title}</h2>

            <div class="image-section">
                <img src="${recipe.image_path}" alt="A tantalizing photo of ${recipe.title}" class="recipe-img">
            </div>

            <div class="ingredients-section recipe-details">
                <h3>Ingredients:</h3>
                ${createListHTML(recipe.ingredients)}
            </div>

            <div class="directions-section recipe-details">
                <h3>Directions:</h3>
                ${createListHTML(recipe.directions)}
            </div>

        </div>
    `;
}


fetchRecipes();