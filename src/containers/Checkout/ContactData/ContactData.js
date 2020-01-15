import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
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
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault() // stop from refreshing page
        console.log(this.props.ingredients)
        // Show loading while request happens
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            // in a real app, calculate price server-side
            price: this.props.totalPrice,
        }
        // for firebase, need to add .json to end of endpoint
        axios.post('/orders.json', order)
            .then(response => {
                // Response recieved, no longer loading, don't display spinner or modal
                this.setState({loading: false, purchasing: false})
                this.props.history.push('/') // redirect to home page
            }).catch(error => {
                // Error recieved, no longer loading, don't display spinner or modal
                this.setState({loading: false, purchasing: false})
            })
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
        updatedOrderForm[inputId] = updatedFormElement

        this.setState({orderForm: updatedOrderForm})
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
            <form>
                {/* dynamically make our input for ea formElement*/}
                {formElementsArr.map(formElement => (
                    <Input elementtype={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        val={formElement.config.value}
                        key={formElement.id}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )

        if (this.state.loading) {
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

export default ContactData;