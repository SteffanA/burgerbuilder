import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout';

class App extends Component{
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            {/* Note only components that are directly called
            via a Route get the route base components.
            url, etc
            */}
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }

}

export default App;
