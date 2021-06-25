import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Cart from './Cart';
import Checkout from './Checkout';
// import Home from './temp';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/checkout' component={Checkout}/>
                <Route path='/' component={Home} />
            </Switch>
        </Router>
    );
}

export default App;