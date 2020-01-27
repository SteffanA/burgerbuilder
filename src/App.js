import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter, Redirect} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

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
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    // Use this as a guard
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
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
