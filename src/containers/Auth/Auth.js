import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import { updateObject, checkValidity } from '../../shared/utility'

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

    componentDidMount() {
        // Setup the redirect to go back to homepage if we're not building a burger
        // Otherwise, we have it set to redirect us to the checkout page
        // since someone built a burger and then went to sign in w/ a built burger
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            })
        })

        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        // Prevent page reload
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
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

        let authRedirect = null
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
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
        isAuthenticated: state.auth.token != null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Auth );