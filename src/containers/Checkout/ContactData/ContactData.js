import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postCode: '',
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
            customer: {
                name: 'Max Schwarzmuller',
                address: {
                    street: 'testSt',
                    zipCode: '34212',
                    country: 'us',
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest',
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="street name"/>
                <input className={classes.Input} type="text" name="post" placeholder="Post Code"/>
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