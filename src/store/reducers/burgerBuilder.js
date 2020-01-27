import * as actionTypes from '../actions/actionTypes.js'
import { updateObject } from '../utility'

const INGREDIENT_PRICES = { 
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
 }

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false, // in the process of making a burger
}

// These helper functions are purely to make the reducer main block
// a bit cleaner and easier to read the different types
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] +1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = { 
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updatedState) 
}

const removeIngredient = (state, action) => {
    // JS doesn't like that the consts have same name as above, forced into a rename
        // Note: This was true when inline in reducer switch. Now it doesn't matter.
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] -1 }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedSt = { 
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
    }
    return updateObject(state, updatedSt) 
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4, // Grab from server in real app,
        building: false,
    })
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action)
        default:
            return state;
    }
}

export default reducer;