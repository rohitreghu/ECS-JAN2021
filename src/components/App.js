import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route path='/' component={Home} />
            </Switch>
        </Router>
    );
}

export default App;