import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";


const defaultState = {
    currentUser: {},
    isAuth: false,
};

const SET_USER = 'SET_USER';

const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_USER: {
            console.log(action);
            return {...state, currentUser: action.payload, isAuth: true};
        }
        default:
            return state;
    };
};

export const store = createStore(userReducer, composeWithDevTools(applyMiddleware(thunk)));

export const setUser = user => ({ type: SET_USER, payload: user });

export default userReducer;
