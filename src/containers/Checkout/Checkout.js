import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

// Goal here is to show a summary
class Checkout extends Component {
    state = { 
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount() {
        // Parse our ingredients from the URL
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for (let param of query.entries()) {
            // Key -> value; ['salad', 1]
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: price,
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
                {/* Use render to pass props through the Route
                Compare to component, which just references the Object
                and won't let you pass through the ingredients prop
                */}
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => ( 
                    <ContactData ingredients={this.state.ingredients}
                      totalPrice={this.state.totalPrice}
                      {...props} />
                )} />
            </div>
        )
    }
}

export default Checkout;