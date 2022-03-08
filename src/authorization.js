import axios from 'axios';
import {setUser} from './userReducer.js'

const authorization =   (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('/api/v1/login', {
                username,
                password,
            });
            console.log(response.data);
            dispatch(setUser(response.data));
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
};

export default authorization;
