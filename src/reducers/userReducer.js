import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";


const defaultState = {
    currentUser: {},
    isAuth: false,
};

const SET_USER = 'SET_USER';
const SET_IS_AUTH = 'SET_IS_AUTH';
const LOGOUT = 'LOGOUT';

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {...state, currentUser: action.payload };
        }
        case SET_IS_AUTH: {
            return {...state, isAuth: action.payload };
        }
        case LOGOUT: {
            localStorage.removeItem('token');
            return {...state, currentUser: {}, isAuth: false};
        }
        default:
            return state;
    };
};


export const setUser = user => ({ type: SET_USER, payload: user });
export const setIsAuth = isAuth => ({ type: SET_IS_AUTH, payload: isAuth });
export const logout = () => ({ type: LOGOUT }); 

