import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Welcome from './welcome.js';
import ChatApp from './pages/Chat'; // Assuming your main chat app component

const App = () => {
    return (
        <Router>
            <Switch>
                {/* <Route path="/" exact component={Welcome} /> */}
                <Route path="/chat" component={ChatApp} />
                {/* Add more routes as needed */}
                <Redirect to="/" /> {/* Redirect all other routes to the welcome page */}
            </Switch>
        </Router>
    );
}

export default App;
