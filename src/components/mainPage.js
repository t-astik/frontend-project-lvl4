import React, { useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { Redirect } from 'react-router-dom';
import {logout} from '../reducers/userReducer.js';
import getData from '../actions/getData.js';
import {setCurrentChannel} from '../reducers/channelsReducer.js';
import axios from 'axios';

const MainPage = () => {

    const [textOfMessage, setTextOfMessage] = useState('');
    // const [messages, setMessages] = useState([]);

    const channels = useSelector(state => state.channels.channels)
    const messages = useSelector(state => state.channels.messages)
    const currentChannel = useSelector(state => state.channels.currentChannel)
    const user = useSelector(state => state.user)

    const currentChannelMessages = useMemo(() => {
        return messages.filter(((message) => message.channelId === currentChannel))
    }, [messages, currentChannel]);


    const dispatch = useDispatch(); 

    useEffect(() => {
        if (user.isAuth && user.currentUser.token) {
            dispatch(getData(user.currentUser.token))
        }
    }, [user]);

    const handleClick = (channel) => (e) => {
        e.preventDefault;
        dispatch(setCurrentChannel(channel.id));
    }

    if (!user.isAuth) return <Redirect to={'./login'} />;

    const handleChangeMessage = (e) => {
        e.preventDefault;
        setTextOfMessage(e.target.value);
    }

    const sendMasseges = async (e) => {
        e.preventDefault();
        // await axios.post(url, {
        //     message: textOfMessage,
        //     id: Date.now()
        // })
    }

    useEffect(() => {
        const socket = io("/socket.io");

        console.log('socket', socket)
    }, [])


    return (
        <div>
            <h1>MainPage</h1>

            <div>
                <ul>
                    {channels.map((channel) => 
                        <li key={channel.id} onClick={handleClick(channel)}>
                            {currentChannel === channel.id ? '+' : '-'}
                            {channel.name}
                        </li>)
                    }
                </ul>
                <div>
                    <input placeholder='Введите сообщение...' onChange={handleChangeMessage} name='textOfMessage' type='text' value={textOfMessage}/>
                    <button onSubmit={sendMasseges} type='submit'>send</button>
                </div>
                <div>
                    {currentChannelMessages.map((message) => <li key={message.id}>{message.body}</li>)}
                </div>
            </div>
            


            <button onClick={() => dispatch(logout())}>Выйти</button>
        </div>
    );
};

export default MainPage;