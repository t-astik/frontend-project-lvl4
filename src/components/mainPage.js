import React, { useCallback, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { Redirect } from 'react-router-dom';
import {logout} from '../reducers/userReducer.js';
import getData from '../actions/getData.js';
import {setCurrentChannel} from '../reducers/channelsReducer.js';
import axios from 'axios';


const MainPage = () => {

    const [textOfMessage, setTextOfMessage] = useState('');
    const [socket, setSocket] = useState(undefined);
    const [channelName, setChannelName] = useState('');
    const [channelNameDirty, setChannelNameDirty] = useState(false);
    const [channelNameErrors, setChannelNameErrors] = useState('Обязательное поле');

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

    const valid = useMemo(() => {
        if (channelNameErrors) {
            return false;
        } else {
            return true;
        }
    },[channelName]);

    const handleClick = (channel) => (e) => {
        e.preventDefault;
        dispatch(setCurrentChannel(channel.id));
    }

    const handleChangeMessage = (e) => {
        e.preventDefault;
        setTextOfMessage(e.target.value);
    }

    const sendMasseges = useCallback((e) => {
        e.preventDefault();

        if (socket && user.currentUser.username) {
            socket.emit('newMessage', {
                
                body: textOfMessage,
                channelId: currentChannel,
                username: user.currentUser.username,
            })
        }
        setTextOfMessage('');
    }, [socket, currentChannel, textOfMessage, user.currentUser.username])

    const loadData = useCallback(() => {
        if (user.isAuth && user.currentUser.token) {
            dispatch(getData(user.currentUser.token))
        }
    }, [user])

    const handelRemoveChannel = (e) => (id) => {
        e.preventDefault();
        channels.filter((c) => c.id !== id);
    }

    const handleRenameChannel = () => {
        e.preventDefault();
        
    }

    const handleChangeChannelName = (e) => {
        e.preventDefault();
        setChannelName(e.target.value)
        if (!e.target.value) {
            setChannelNameErrors('Обязательнок поле')
        } else if (e.target.value.length < 3 || e.target.value.length > 20) {
            setChannelNameErrors('От 3 до 20 символов')
        } else {
            setChannelNameErrors('');
        }
    };

    const handleBlur = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'channelName': {
                setChannelNameDirty(true);
                break;
            }
        }
    };

    const handleAddChannel = useCallback((e) => {
        e.preventDefault();

        if (socket) {
            socket.emit('newChannel', {
                name: channelName
            });
        }
        setChannelName('');
    }, [socket, channelName])


    useEffect(() => {
        setSocket(io(""));
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                console.log('connect socket', socket)

                socket.on('newMessage', (messageWithId) => {
                    loadData()
                })

                socket.on('newChannel', (channelWithId) => {
                    loadData()
                })

                socket.on('removeChannel',({ id }) => {
                    loadData()
                })
              });
              
            socket.on("disconnect", () => {
                console.log('disconnect socket', socket)
            });
        }
    }, [socket])

    if (!user.isAuth) return <Redirect to={'./login'} />;

    return (
        <div>
            <h1>MainPage</h1>

            <div>
                <h2>Каналы</h2>
                {(channelNameDirty && channelNameErrors) && <div style={{color: 'red'}}>{channelNameErrors}</div>}
                <input type="text" placeholder='Добавить канал' onChange={handleChangeChannelName} onBlur={handleBlur} name="channelName" value={channelName}></input>
                <button onClick={handleAddChannel} disabled={!valid} type='submit'>+</button>
                <ul>
                    {channels.map((channel) => 
                        <li key={channel.id}>
                            <button onClick={handleClick(channel)} type='button'>
                                {currentChannel === channel.id ? '+' : '-'}
                                {channel.name}
                            </button>
                            {channel.removable === true ? (
                                <select name="channels" id="channels">
                                  <option />
                                  <option value="remove" onClick={handelRemoveChannel}>Удалить</option>
                                  <option value="rename" onClick={handleRenameChannel}>переименовать</option>
                                </select>
                            ) : null}
                        </li>
                        )
                    }  
                </ul>
                <div>
                    <input placeholder='Введите сообщение...' onChange={handleChangeMessage} name='textOfMessage' type='text' value={textOfMessage}/>
                    <button onClick={sendMasseges} type='submit'>send</button>
                </div>
                <div>
                    {currentChannelMessages.map((message) => <li key={message.id}>{message.body}</li>)}
                </div>
            </div>
            


            <button onClick={() => dispatch(logout())}>Выйти</button>
            
                <div className="btn-group">
                <button className="btn btn-secondary btn-sm" type="button">
                    Small split button
                </button>
                <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden"></span>
                </button>
                <ul className="dropdown-menu">
                    ...
                </ul>
                </div>                
            
        </div>
    );
};

export default MainPage;

