import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionTypes'

// Goal here is to show a summary
class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchase()
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        // Redirect to home page if we have no ingredients,
        // else show the summary
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchasedRedirect = state.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinue={this.checkoutContinueHandler}
                    />
                    {/* Use render to pass props through the Route
                    Compare to component, which just references the Object
                    and won't let you pass through the ingredients prop
                    */}
                    <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                    />
                 </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.PURCHASE_INIT()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);