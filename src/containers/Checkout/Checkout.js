import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

// Goal here is to show a summary
class Checkout extends Component {
    state = { 
        ingredients: {
            meat: 1,
            salad: 1,
            cheese: 1,
            bacon: 1,
        }
    }

    componentDidMount() {
        // Parse our ingredients from the URL
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for (let param of query.entries()) {
            // Key -> value; ['salad', 1]
            ingredients[param[0]] = +param[1]
        }
        this.setState({
            ingredients: ingredients,
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
            </div>
        )
    }
}

export default Checkout;