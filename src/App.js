import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch, withRouter} from 'react-router-dom'
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
    return (
      <Layout>
        <Switch>
          {/* Note only components that are directly called
          via a Route get the route base components.
          url, etc
          */}
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
  }
}

// Apparently withRouter should be required - but didn't seem so for me
export default withRouter(connect(null,mapDispatchToProps)(App));
