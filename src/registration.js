import axios from 'axios';

const registration = (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('/api/v1/signup', {
                username,
                password,
            });
            alert(response.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    
}


export default registration;

