//Arrays
const recipes = getRecipes()
const id = location.hash.substring(1)
const recipe = recipes.find((recipe) => {
    return recipe.id === id
})
const ingredientsArr = recipe.ingredients //[]
titleText.value = recipe.title

//Event Listeners
deleteRecipeButton.addEventListener('click', () => {
    const index = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    recipes.splice(index, 1)
    saveRecipes(recipes)
    location.assign('index.html')
})

titleText.addEventListener('input', (e) => {
    recipe.title = e.target.value
    saveRecipes(recipes)
})

ingredientsList.addEventListener('submit', (e) => {
    e.preventDefault()
    recipe.ingredients.push({
        title: e.target.elements.ingredientsInput.value,
        checked: false
    })
    e.target.elements.ingredientsInput.value = ''
    renderIngredients(recipe.ingredients)
    saveRecipes(recipes)
    console.log(recipe.ingredients)
})

steps.addEventListener('submit', (e) => {
    e.preventDefault()
    recipe.steps.push(e.target.elements.stepsInput.value)
    e.target.elements.stepsInput.value = ''
    renderSteps(recipe.steps)
    saveRecipes(recipes)
})

renderIngredients(recipe.ingredients)
renderSteps(recipe.steps)

console.log(ingredientsArr)
