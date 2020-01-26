import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name,
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name,
    }
}

// Synchronous action creator
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const initIngredients = () => {
    return dispatch => {
        // Execute async code in here

        // Get our ingredients list dynamically from our database when we
        // mount the burger builder
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}