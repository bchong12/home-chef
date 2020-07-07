//DOM calls
const createRecipeButton = document.getElementById('createRecipe')
const recipeDiv = document.getElementById('recipeList')
const filterBar = document.getElementById('searchRecipes')
const rightNowRenderButton = document.getElementById('rightNow')
const nameText = document.getElementById('name')

//Event listeners
createRecipeButton.addEventListener('click', function (e) {
    recipes.push({
        title: 'New Recipe',
        ingredientsStatus: 'none',
        id: uuidv4(),
        ingredients: [],
        steps: []
    })
    saveRecipes(recipes)
    renderRecipes(recipes, filters)
})

filterBar.addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

rightNowRenderButton.addEventListener('click', () => {
    rightNowRender(recipes)
})

//Arrays
let recipes = getRecipes()
console.log(recipes)
const filters = {
    searchText: ''
}

renderRecipes(recipes, filters)

const nameJSON = localStorage.getItem('name')
nameText.innerHTML = nameJSON
