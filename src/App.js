import React, {useEffect, useState} from 'react';
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

    return (
        <Router>
            <div className="app">
                <Navbar expand="lg" variant="light" bg="light" className="shadow-sm">
                    <Container>
                        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                        <Button variant="primary" onClick={() => dispatch(logout())}>Выйти</Button>
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