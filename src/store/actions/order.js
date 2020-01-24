import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger= (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        // for firebase, need to add .json to end of endpoint
        axios.post('/orders.json', orderData)
            .then(response => {
                // Response recieved, no longer loading, don't display spinner or modal
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
                // Error recieved, no longer loading, don't display spinner or modal
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}