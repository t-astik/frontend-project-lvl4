// import { Formik } from 'formik';
import React, { useMemo, useEffect, useState } from 'react';
import authorization from '../actions/authorization.js';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Form, Card } from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {FloatingLabel} from 'react-bootstrap';
import './signupPageStyles.css';

import LoginImage from '../../assets/login-image.jpeg'

const LoginForm = () => {
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [nickNameDirty, setNickNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [nickNameErrors, setNickNameErrors] = useState('Обязательное поле');
    const [passwordErrors, setPasswordErrors] = useState('Обязатальное поле');

    const user = useSelector(state => state.user)

    const formValid = useMemo(() => {
        if (nickNameErrors || passwordErrors || !nickName || !password ) {
            return (false);
        } else return (true);
    }, [(nickNameErrors, passwordErrors, nickName, password)]);

    const handleBlur = (e) => {
        e.preventDefault;
        switch (e.target.name) {
            case 'nickName': {
                setNickNameDirty(true);
                break
            }
            case 'password': {
                setPasswordDirty(true);
                break
            }
        };
    };   

    const handleChangeNickName = (e) => {
        e.preventDefault;
        setNickName(e.target.value);
        if (!e.target.value) {
            setNickNameErrors('Обязательное поле');
        } else {
            setNickNameErrors('');
        };
    };

    const handleChangePassword = (e) => {
        e.preventDefault;
        setPassword(e.target.value);
        if (!e.target.value) {
            setPasswordErrors('Обязателное поле');
        } else {
            setPasswordErrors('');
        };
    };

    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const username = nickName;
        dispatch(authorization(username, password));   
    };

    if (user.isAuth) return <Redirect to={'./'} />;

    return (
        <div className="conteinerForms">
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <div className="cardochka">
                            <Container className="cardochka-body" fluid>
                                <Row>
                                    <Col xs={12} sm={6} md={5}>
                                        <div className="left">
                                            <img className="loginImage" src={LoginImage} alt="Регистрация"></img>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={6} md={7}>
                                        <div className="right">
                                            <h1 className="authorizationTitle">Войти</h1>                                
                                            <FloatingLabel controlId="floatingInput" label="Ваш ник" className="field">
                                                <Form.Control type='text' placeholder="Имя пользевателя" name='nickName' value={nickName} onBlur={handleBlur} onChange={handleChangeNickName}/>
                                                {(nickNameDirty && nickNameErrors) && <div className="Errors" >{nickNameErrors}</div>}
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPassword" label="Пароль" className="field">
                                                <Form.Control type='text' name='password' placeholder="Пароль" value={password} onChange={handleChangePassword} onBlur={handleBlur}/>
                                                {(passwordDirty && passwordErrors) && <div className="Errors" >{passwordErrors}</div>}   
                                            </FloatingLabel>
                                            <Button className="authorizationButton" variant="outline-primary" type='submit' disabled={!formValid} onClick={handleSubmit}>Войти</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="cardochka-footer">
                                <div className="footer">
                                    <span>Нет аккаунта? <a href='./signup'>Регистрация</a></span>
                                </div>
                            </div>
                        </div>     
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default LoginForm;