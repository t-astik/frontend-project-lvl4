import React, { useEffect, useMemo, useState } from 'react';
import {useHistory} from "react-router-dom";
import { useDispatch } from 'react-redux';
import registration from '../../actions/registration.js';
import {Button, Form, Card, Container, Row, Col, FloatingLabel} from 'react-bootstrap';
import SignupImage from '../../../assets/signup-image.jpeg'

import './signupPageStyles.css';


 
 const SignupForm = () => {
    const { push } = useHistory()
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerification, setPasswordVerification] = useState('');
    const [nickNameDirty, setNickNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordVerificationDirty, setPasswordVerificationDirty] = useState(false);
    const [nickNameErrors, setNickNameErrors] = useState('Обязатедное поле');
    const [passwordErrors, setPasswordErrors] = useState('Обязатедное поле');
    const [passwordVerificationErrors, setPasswordVerificationErrors] = useState('Обязатедное поле');

    const valid = useMemo(() => {
        if (password !== passwordVerification) {
            return false;
        } else if (!password || !passwordVerification || !nickName) {
            return false;
        } else {
            return true;
        }
    },[password, passwordVerification, nickName]);

    const handleChangeNickName = (e) => {
        e.preventDefault();
        setNickName(e.target.value);
        if (!e.target.value) {
            setNickNameErrors('Обязатедное поле');
        } else if (e.target.value.length < 3 || e.target.value.length > 20) {
            setNickNameErrors('От 3 до 20 символов');
        } else {
            setNickNameErrors('');
        }
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword(password);
        if (!e.target.value) {
            setPasswordErrors('Обязательное поле');
        } else if (e.target.value.length < 6) {
            setPasswordErrors('Не менее 6 символов');
        } else {
            setPasswordErrors('');
        }
    };

    const handleChangePasswordVerification = (e) => {
        e.preventDefault();
        const passwordVerification = e.target.value;
        setPasswordVerification(passwordVerification);
        if (!e.target.value) {
            setPasswordVerificationErrors('Обязательное поле');
        } else if (e.target.value.length < 6) {
            setPasswordVerificationErrors('Не менее 6 символов');
        } else if (e.target.value !== password) {
            setPasswordVerificationErrors('Пароли должны совпадать');
        } else {
            setPasswordVerificationErrors('');
        }
    };

    const handleBlur = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case 'nickName': {
                setNickNameDirty(true);
                break;
            }
            case 'password': {
                setPasswordDirty(true);
                break;
            }
            case 'passwordVerification': {
                setPasswordVerificationDirty(true);
                break;
            }
        };
    };

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = nickName;
        dispatch(registration(username, password));
        setNickName('');
        setPassword('');
        setPasswordVerification('');

        push('/login')
    };

    return (
            <div className="conteinerForms">
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <Card className="card">
                                <Row>
                                    <Col xs={12} sm={6} md={5}>
                                        <div className="left">
                                            <img className="signupImage" src={SignupImage} alt="Регистрация"></img>
                                        </div>
                                    </Col>
                                    <Col xs={12} sm={6} md={7}>
                                        <div className="right">
                                            <h1 className="registrationTitle">Регистрация</h1>                                
                                            <FloatingLabel controlId="floatingInput" label="Имя пользователя" className="field">
                                                <Form.Control type='text' placeholder="Имя пользевателя" name='nickName' value={nickName} onBlur={handleBlur} onChange={handleChangeNickName}/>
                                                {(nickNameDirty && nickNameErrors) && <div className="Errors" >{nickNameErrors}</div>}
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPassword" label="Пароль" className="field">
                                                <Form.Control type='text' name='password' placeholder="Пароль" value={password} onChange={handleChangePassword} onBlur={handleBlur}/>
                                                {(passwordDirty && passwordErrors) && <div className="Errors" >{passwordErrors}</div>}   
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPasswordVerification" label="Подвердите пароль" className="field">
                                                <Form.Control type='text' placeholder="Подвердите пароль" name='passwordVerification' value={passwordVerification} onBlur={handleBlur} onChange={handleChangePasswordVerification}/>
                                                {(passwordVerificationDirty && passwordVerificationErrors) && <div className="Errors" >{passwordVerificationErrors}</div>}   
                                            </FloatingLabel>
                                            <Button className="registrationButton" variant="outline-primary" type='submit' disabled={!valid} onClick={handleSubmit}>Зарегистрироваться</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>     
                        </Col>
                    </Row>
                </Container>
            </div>
            
    )    
};

export default SignupForm;