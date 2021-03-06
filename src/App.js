import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import MainPage from './pages/MainPage/mainPage.js';
import LoginForm from './pages/LoginPage/loginPage.js';
import NotFound from  './pages/NotFoundPage/notFoundPage.js';
import SignupForm from './pages/SignupPage/signupPage.js';
import {setUser, setIsAuth} from './reducers/userReducer.js'
import {Button, Container, Navbar} from 'react-bootstrap';
import {logout} from './reducers/userReducer.js';

const App = () => {


    const dispatch = useDispatch(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');


        dispatch(setIsAuth(!!token))
        dispatch(setUser({
            username,
            token
        }))
    }, [])
    const user = useSelector(state => state.user)


    return (
        <Router>
            <div className="app">
                <Navbar expand="lg" variant="light" bg="light" className="nav shadow-sm">
                    <Container>
                        <Navbar.Brand className="nav__title" href="/">ASTIK CHAT</Navbar.Brand>
                        {user.isAuth ? <Button className="nav__button" variant="primary" onClick={() => dispatch(logout())}>Выйти</Button> : null}
                    </Container>
                </Navbar>

                <div className="content">
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
            </div>
        </Router>
    );
};

export default App;