import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        }
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

        if (rules.isEmail) {
            // Can add the regex here later
            isValid &= true
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            // Not a deep clone of all inner objects
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            },
        }

        this.setState({controls: updatedControls})
    }


    render() {
        const formElementsArr = []
        // Make an array w/ all form elements with a key identifier
        for (let key in this.state.controls) {
            formElementsArr.push({
                id: key,
                config: this.state.controls[key],
            })
        }

        const form = formElementsArr.map(formElement => (
            <Input
                key={formElement.id}
                elementConfig={formElement.config.elementConfig}
                val={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ))
        return (
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button
                        btnType="Success"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default Auth;