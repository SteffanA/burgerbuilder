import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

// Goal here is to show a summary
class Checkout extends Component {
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
            summary = (
                <div>
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
        ings: state.ingredients,
    }
}


export default connect(mapStateToProps, null)(Checkout);