import React, { useCallback, useEffect, useMemo, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from "socket.io-client";
import { Redirect } from 'react-router-dom';
import getData from '../actions/getData.js';
import {setCurrentChannel} from '../reducers/channelsReducer.js';
import {Button, Form, Card, Container, Row, Col, FloatingLabel, Dropdown, SplitButton, Modal, InputGroup, ButtonGroup} from 'react-bootstrap';
import './mainPageStyles.css';
import AddChannelModal from './AddChannelModal.js';
import RenameChannelModal from './RenameChannelModal.js';
import DeleteChannelModal from './DeleteChannelModal.js';

const MainPage = () => {

    const [textOfMessage, setTextOfMessage] = useState('');
    const [socket, setSocket] = useState(undefined);

    const [modalAddActive, setModalAddActive] = useState(false);
    const [modalDeleteActive, setModalDeleteActive] = useState(false);
    const [modalRenameActive, setModalRenameActive] = useState(false);

    const channels = useSelector(state => state.channels.channels)
    const messages = useSelector(state => state.channels.messages)
    const currentChannelId = useSelector(state => state.channels.currentChannel)
    const user = useSelector(state => state.user)

    const currentChannel = useMemo(() => {
        return channels.find((channel) => channel.id === currentChannelId)
    }, [channels, currentChannelId])
    
    const currentChannelMessages = useMemo(() => {
        return messages.filter(((message) => message.channelId === currentChannelId))
    }, [messages, currentChannelId]);

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

    const handleChangeMessage = (e) => {
        e.preventDefault;
        setTextOfMessage(e.target.value);
    }

    const sendMasseges = useCallback((e) => {
        e.preventDefault();

        if (socket && user.currentUser.username) {
            socket.emit('newMessage', {
                
                body: textOfMessage,
                channelId: currentChannelId,
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

    const handelRemoveChannelV2 = useCallback((id) => {
        if (socket) {
            socket.emit('removeChannel', {
                id: id,
            });
            dispatch(setCurrentChannel(1));
        }
    }, [socket]);

    const handleRenameChannelV2 = useCallback((id, newName) => {
        if (socket) {
            socket.emit('renameChannel', {
                id: id,
                name: newName,
            });
        }
    }, [socket]);

    const handleAddChannelV2 = useCallback((channelName) => {
        if (socket) {
            socket.emit('newChannel', {
                name: channelName
            });
        }
    }, [socket]);

    const messagesCounter = (count) => {
        if (count === 1) {
            return `${count} сообщение`
        } else if (count > 1 && count < 5) {
            return `${count} сообщения`           
        } else if (count >= 5 || count === 0) {
            return `${count} сообщений`
        }
    };

    useEffect(() => {
        setSocket(io(""));
    }, []);

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

                socket.on('renameChannel',({ id, name }) => {
                    loadData()
                })
              });
              
            socket.on("disconnect", () => {
                console.log('disconnect socket', socket)
            });
        }
    }, [socket])

    const handleToggleAddChannelModal = (isActive) => {
        setModalAddActive(isActive)
    }

    const handleToggleRenameChannelModal = (isActive) => {
        setModalRenameActive(isActive)
    }

    const handleToggleDeleteChannelModal = (isActive) => {
        setModalDeleteActive(isActive)
    }

    if (!user.isAuth) return <Redirect to={'./login'} />;

    return (
        <Container className="mainPageContainer shadow">
            <Row className="mainPageRow">
                <Col xs={6} md={2} className="griCol">
                    <div className="leftCol">
                        
                        <AddChannelModal onAddChannel={handleAddChannelV2} onToggleModal={handleToggleAddChannelModal} isActive={modalAddActive}/>

                        <RenameChannelModal onRenameChannel={handleRenameChannelV2} onToggleModal={handleToggleRenameChannelModal} id={currentChannelId} currentChannel={currentChannel} isActive={modalRenameActive}/>

                        <DeleteChannelModal onDeleteChannel={handelRemoveChannelV2}  onToggleModal={handleToggleDeleteChannelModal} id={currentChannelId} isActive={modalDeleteActive}/>

                        <div className="channels">
                            <div className="channelsHead">
                                <span className="channelsListTitle">Каналы</span> 
                                <Button className="plus" size="sm" variant="outline-primary" onClick={() => setModalAddActive(true)}>+</Button>
                            </div>
                            <ul className="channelsList">
                                {channels.map((channel) => 
                                    <li className="channels-list-element mb-2" key={channel.id}>
                                        {channel.removable === true ? (
                                            <div className="mb-2">
                                            {['down'].map((direction) => (
                                            <div onClick={handleClick(channel)}>
                                                <SplitButton
                                                as={ButtonGroup}
                                                key={direction}
                                                id={`dropdown-button-drop-${direction}`}
                                                drop={direction}
                                                variant={currentChannelId === channel.id ? 'secondary' : 'light'}
                                                title={`# ${channel.name}`}
                                            >
                                                <Dropdown.Item eventKey="1" onClick={() => setModalDeleteActive(true)}>Удалить</Dropdown.Item>
                                                <Dropdown.Item eventKey="2" onClick={() => setModalRenameActive(true)}>Переименовать</Dropdown.Item>
                                                </SplitButton>
                                            </div>
                                            ))}
                                        </div> 
                                        ) : (
                                            <div onClick={handleClick(channel)}>
                                                <Button  variant={currentChannelId === channel.id ? 'secondary' : 'light'} type='button'>
                                                    {`# ${channel.name}`}
                                                </Button>
                                            </div>
                                        )}
                                    </li>
                                    )
                                }  
                            </ul>
                            
                        </div>             
                    </div>
                </Col>


                <Col xs={12} md={10} className="griCol">
                    <div className="rightCol">
                        <div className="chatListHead">
                            {currentChannel && (
                                <span className="currentChannelTitle">
                                    # {currentChannel.name}
                                    <br />
                                </span>
                            )}
                            <p className="text-secondary">{messagesCounter(currentChannelMessages.length)}</p>
                        </div>
                        <div className="chatListBody">
                            <div className="messagesList">
                                {currentChannelMessages.map((message) => <li className="listMasseges" key={message.id}><span className="userName">{message.username}</span>: {message.body}</li>)}
                            </div>
                            <div className="messagesInput">
                                <InputGroup>
                                    <Form.Control variant="outline-primary" type='text' placeholder="Введите сообщение..." name='textOfMessage' onChange={handleChangeMessage} value={textOfMessage} />
                                    <Button  variant="outline-primary" onClick={sendMasseges} disabled={!textOfMessage} type='submit'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ardiv-right-square" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                        </svg>
                                    </Button>
                                </InputGroup>    
                            </div>
                        </div> 
                    </div>
                </Col>         
            </Row>
        </Container>
    );
};

export default MainPage;



