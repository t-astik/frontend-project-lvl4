import axios from 'axios';
import {setUser, setIsAuth} from '../reducers/userReducer.js'

const authorization =   (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('/api/v1/login', {
                username,
                password,
            });
            console.log(response.data);
            dispatch(setUser(response.data));
            dispatch(setIsAuth(true));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
};

export default authorization;
