import axios from 'axios';
import {setMessages, setChannels} from '../reducers/channelsReducer.js'
const getData = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('/api/v1/data', {
                headers: {'Authorization': `Bearer ${token}`},
            });
            console.log(response.data);     
            dispatch(setMessages(response.data.messages));
            dispatch(setChannels(response.data.channels));       
        } catch (error) {
            alert(error.response.data.message);
        }
    };
};

export default getData;
