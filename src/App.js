import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

// Setup for lazy loading; not super useful when components are small
const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

const asyncOrders= asyncComponent(() => {
  return import('./containers/Orders/Orders')
})

class App extends Component{
  componentDidMount() {
    this.props.onTryAutoSignin()
  }

  render() {
    /* Note only components that are directly called
    via a Route get the route base components.
    url, etc
    */
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    // Use this as a guard
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
  }
}

// Apparently withRouter should be required - but didn't seem so for me
// suppososedly for passing routing props correctly
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
