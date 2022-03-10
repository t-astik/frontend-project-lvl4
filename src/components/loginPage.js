// import { Formik } from 'formik';
import React, { useMemo, useEffect, useState } from 'react';
import authorization from '../actions/authorization.js';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


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
        <div className="Login">
            <form>
                <h1>Войти</h1>
                {(nickNameDirty && nickNameErrors) && <div style={{color: 'red'}}>{nickNameErrors}</div>}
                <input onChange={handleChangeNickName} onBlur={handleBlur} name='nickName' type='text' placeholder='Имя пользевателя' value={nickName} />
                {(passwordDirty && passwordErrors) && <div style={{color: 'red'}}>{passwordErrors}</div>}
                <input onChange={handleChangePassword} onBlur={handleBlur} name='password' type='text' placeholder='Пароль' value={password} />
                <button disabled={!formValid}  onClick={handleSubmit} type='submit'>Войти</button>
            </form>
        </div>
    )
};

export default LoginForm;