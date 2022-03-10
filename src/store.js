import { createStore, applyMiddleware, combineReducers } from 'redux';
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import {userReducer} from './reducers/userReducer.js';
import { channelsReducer} from './reducers/channelsReducer.js';



export const store = createStore(
    combineReducers({
        channels: channelsReducer, 
        user: userReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
