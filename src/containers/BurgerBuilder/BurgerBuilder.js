import React, { Component } from 'react'
import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions' // implicit index import


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        // console.log("mounted bb")
    }

    updatePurchaseState(ingredients) {
        // Turn ingredients into array to check if we have at least one
        // Then turn into a sum
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0;
    }

    // Note we need this to be () =>, not a simple ()
    // This is because a () will cause this to refer to possibly a different class
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    // When we click on the backdrop & close the order modal,
    // ensure we set purchasing back to false.
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings,
        }
        
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        // Show spinner if sending a request, otherwise order summary
        let orderSummary = null
        if (this.props.ings && !this.state.loading) {
            orderSummary = <OrderSummary 
                        ingredients={this.props.ings}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.props.totalPrice}
                        />
        }
        else if (this.state.loading) {
            orderSummary = <Spinner />
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        // Check that we have fetched ingredients list from
        // DB before trying to display our burger
        if (this.props.ings) {
            burger = <Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
                </Aux>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));