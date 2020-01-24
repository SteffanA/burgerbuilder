import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        // Note: This can be made w/ a helper function
        // to reduce bloat in the future
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest',
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest',
                        },
                    ]
                },
                valid: true, // no validation rules, always true
            },
        },
        formValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault() // stop from refreshing page
        // console.log(this.props.ings)
        const formData = {}
        // Get user entered values for all data
        for (let formElemID in this.state.orderForm) {
            formData[formElemID] = this.state.orderForm[formElemID].value
        }
        const order = {
            ingredients: this.props.ings,
            // in a real app, calculate price server-side
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order)
    }

    checkValidity(value, rules) {
        let isValid = false
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== ''
        }

        if (rules.minLength) {
            isValid &= value.trim().length >= rules.minLength
        }

        if (rules.maxLength) {
            isValid &= value.trim().length <= rules.maxLength
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = {
            // Not a deep clone of all inner objects
            ...this.state.orderForm
        }

        // Deep cloning the form element?
        const updatedFormElement = { 
            ...updatedOrderForm[inputId]
        }
        updatedFormElement.value = event.target.value
        // Ensure current value is valid
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputId] = updatedFormElement

        let formIsValid = true
        for (let inputId in updatedOrderForm) {
            formIsValid &= updatedOrderForm[inputId].valid
        }

        this.setState({orderForm: updatedOrderForm, formValid: formIsValid})
    }

    render() {
        const formElementsArr = []
        // Make an array w/ all form elements with a key identifier
        for (let key in this.state.orderForm) {
            formElementsArr.push({
                id: key,
                config: this.state.orderForm[key],
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* dynamically make our input for ea formElement
                Make sure we pass the current validity, and if we should
                even validate it (or rather; did we)
                */}
                {formElementsArr.map(formElement => (
                    <Input elementtype={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        val={formElement.config.value}
                        key={formElement.id}
                        invalid={!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled = {!this.state.formValid}>ORDER</Button>
            </form>
        )

        if (this.props.loading) {
            form = (<Spinner/>)
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        loading: state.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));