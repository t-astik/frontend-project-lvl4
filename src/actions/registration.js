import axios from 'axios';

const registration = (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('/api/v1/signup', {
                username,
                password,
            });
            alert(`Пользователь ${username} был успешно зарегестрирован`);
        } catch (error) {
            console.error(error)
            alert(`Пользователь ${username} уже зарегестрирован`);
        }
    }
    
}


export default registration;

