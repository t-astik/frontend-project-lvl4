import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from "react-router";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import MainPage from './components/mainPage.js';
import LoginForm from './components/loginPage.js';
import NotFound from  './components/notFoundPage.js';
import SignupForm from './components/signupPage.js';
import {setUser, setIsAuth} from './reducers/userReducer.js'

const App = () => {
    const dispatch = useDispatch(); 

    useEffect(() => {
        const token = localStorage.getItem('token');

        dispatch(setIsAuth(!!token))
        dispatch(setUser({
            username: undefined,
            token
        }))
    }, [])

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
                        <li>
                            <Link to="/signup">RegistrationPage</Link>
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
                    <Route path="/signup">
                        <SignupForm />
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