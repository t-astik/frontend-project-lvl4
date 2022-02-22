import React from 'react';
import { Route, Switch } from "react-router";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import MainPage from './mainPage.js';
import LoginForm from './loginPage.js';
import NotFound from  './notFoundPage.js';

//import { notFound } from "./notFoundPage";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                        <Link to="/">MainPage</Link>
                        </li>
                        <li>
                        <Link to="/login">LoginPage</Link>
                        </li>
                    </ul>
                </nav>
        
                <Switch>
                    <Route path="/" exact={true}>
                        <MainPage />
                    </Route>
                    <Route path="/login">
                        <LoginForm />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;