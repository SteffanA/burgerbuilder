import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler' // handle DB errors gracefully

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        // Fetch our orders
        axios.get('orders.json')
            .then(res => {
                // Remember, JS const arr is a constant arr
                // but the values within/contents as a whole
                // aren't.
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchedOrders})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false})
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => ( 
                    <Order 
                    key = {order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                ))}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);