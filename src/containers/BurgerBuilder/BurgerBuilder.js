import React, { Component } from 'react'
import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENT_PRICES = { 
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
 }
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
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

        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => { 
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount

        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice+priceAddition

        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })

        // Pass updated state directly since setState might not run
        this.updatePurchaseState(updatedIngredients)
  }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return; // Short circuit
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = updatedCount

        const priceSub = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice-priceSub

        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })

        // Pass updated state directly since setState might not run
        this.updatePurchaseState(updatedIngredients)
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
        alert('You continue!')
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;