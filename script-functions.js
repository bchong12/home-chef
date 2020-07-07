//for uuidv4
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//Functions
const saveRecipes = (array) => {
    localStorage.setItem('recipes', JSON.stringify(array))
}

const getRecipes = () => {
    const recipeJSON = localStorage.getItem('recipes')
    if (recipeJSON === null || typeof recipeJSON === 'object') {
        return []
    } else {
        return JSON.parse(recipeJSON)
    }
}

recipes = getRecipes()

const createRecipeDOM = (array) => {
    const newDiv = document.createElement('div')

    array.forEach((recipe) => {
        const button = document.createElement('button')
        const div2 = document.createElement('div')
        const div = document.createElement('div')
        const newLink = document.createElement('a')
        const newSpan = document.createElement('p')
        const ingredientP = document.createElement('p')
        newSpan.textContent = recipe.title
        ingredientP.textContent = ingredientStatusMessage(recipe)
        newLink.setAttribute('href', `recipe.html#${recipe.id}`)
        newLink.className = 'recipe-list'
        div.appendChild(newSpan)
        div.appendChild(ingredientP)
        button.textContent = 'x'
        newLink.appendChild(div)
        div2.appendChild(button)
        div2.appendChild(newLink)
        newDiv.appendChild(div2)

        button.className = 'div-buttons'

        button.addEventListener('click', () => {
            deleteRecipe(recipe.id)
            saveRecipes(recipes)
            renderRecipes(recipes, filters)
        })

        div2.className = 'recipe-div2'
    })
    newDiv.className = 'recipe-div'

    return newDiv
}

const deleteRecipe = (id) => {
    const index = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    recipes.splice(index, 1)
}

const renderRecipes = (array, filters) => {
    const filteredArray = array.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    recipeDiv.innerHTML = ''

    const newRecipes = createRecipeDOM(filteredArray)
    recipeDiv.appendChild(newRecipes)
}

const ingredientStatusMessage = (recipe) => {
    if (recipe.ingredientsStatus === 'none') {
        return 'You have none of the ingredients'
    } else if (recipe.ingredientsStatus === 'some') {
        return 'You have some of the ingredients'
    } else {
        return 'You have all of the ingredients'
    }
}

const rightNowRender = (array) => {
    recipeDiv.innerHTML = ''

    const filteredArray = array.filter((recipe) => {
        if (recipe.ingredientsStatus === 'all') {
            return recipe
        }
    })

    const newRecipes = createRecipeDOM(filteredArray)

    recipeDiv.appendChild(newRecipes)
}

const updateStatus = (ingredientsArr) => {
    const test1 = ingredientsArr.every((ingredientObj) => {
        if (ingredientObj.checked === true) {
            return true
        } else {
            return false
        }
    })

    const test2 = ingredientsArr.some((ingredientObj) => {
        if (ingredientObj.checked === true) {
            return true
        } else {
            return false
        }
    })

    if (test1) {
        recipe.ingredientsStatus = 'all'
    } else if (test2) {
        recipe.ingredientsStatus = 'some'
    } else {
        recipe.ingredientsStatus = 'none'
    }
}

const renderIngredients = (ingredientsArr) => {

    appendedDiv.innerHTML = ''

    ingredientsArr.forEach((ingredient) => {
        const button = document.createElement('button')
        const newLabel = document.createElement('label')
        const newP = document.createElement('span')
        const input = document.createElement('input')

        input.type = 'checkbox'
        if (ingredient.title === '') {
            newP.textContent = 'Unnamed ingredient'
        } else {
            newP.textContent = ingredient.title
        }

        input.addEventListener('change', (e) => {
            ingredient.checked = e.target.checked
            updateStatus(ingredientsArr)
            saveRecipes(recipes)
        })

        input.checked = ingredient.checked

        newP.className = 'ingredientSpan'
        button.className = 'ingredientButtons buttons'
        input.className = 'lists'

        button.textContent = 'x'
        button.addEventListener('click', () => {
            const index = ingredientsArr.indexOf(ingredient)
            ingredientsArr.splice(index, 1)
            saveRecipes(recipes)
            renderIngredients(ingredientsArr)
        })

        newLabel.appendChild(input)
        newLabel.appendChild(newP)
        appendedDiv.appendChild(button)
        appendedDiv.appendChild(newLabel)
        newLabel.className = 'ingredientLabel'
    })
}

const renderSteps = (stepsArr) => {

    appendedDiv2.innerHTML = ''

    stepsArr.forEach((step) => {
        const button = document.createElement('button')
        const newP = document.createElement('span')
        const div = document.createElement('div')
        button.textContent = 'x'
        button.addEventListener('click', () => {
            const index = stepsArr.indexOf(step)
            stepsArr.splice(index, 1)
            saveRecipes(recipes)
            renderSteps(stepsArr)
        })

        newP.className = 'stepsText'
        button.className = 'stepsButton buttons'
        div.className = 'stepsDiv'

        if (newP) {
            const index = stepsArr.indexOf(step) + 1
            if (step === '') {
                newP.textContent = 'No Directions Added'
            } else {
                newP.textContent = `Step ${index}. ${step}`
            }
        }
        div.appendChild(button)
        div.appendChild(newP)
        appendedDiv2.appendChild(div)
    })
}

