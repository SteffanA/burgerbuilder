import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

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
        },
        isSignup: true,
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

    submitHandler = (event) => {
        // Prevent page reload
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
        // console.log(this.state.controls.email.value)
        // console.log(this.state.controls.password.value)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
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

        let form = formElementsArr.map(formElement => (
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

        if (this.props.loading) {
            form  = <Spinner />
        }

        let errorMessage = null
        if (this.props.error) {
            // Output whatever error we got from Firebase
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button
                        btnType="Success"
                    >
                        Submit
                    </Button>
                    <Button
                        btnType="Danger"
                        clicked={this.switchAuthModeHandler}
                    >
                        Switch To {this.state.isSignup ? "Sign In" : "Sign Up"}
                    </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Auth );