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

export const purchaseBurger= (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        // for firebase, need to add .json to end of endpoint
        axios.post('/orders.json?auth=' + token, orderData)
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

export const fetchOrdersSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        // Fetch our orders
        axios.get('orders.json?auth=' + token)
            .then(res => {
                // Remember, JS const arr is a constant arr
                // but the values within/contents as a whole
                // aren't.
                // Doing data formatting in action creator
                // such that our reducer knows what it gets
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}