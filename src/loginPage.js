import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';

const LoginForm = () => {
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [nickNameDirty, setNickNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [nickNameErrors, setNickNameErrors] = useState('Обязательное поле');
    const [passwordErrors, setPasswordErrors] = useState('Обязатальное поле');
    const [valid, setValid] = useState(false)

    const formValid = useEffect(() => {
        if (nickNameErrors || passwordErrors || !nickName || !password ) {
            setValid(false);
        } else setValid(true);
    });

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

    const handelSubmit = (e) => {
        e.preventDefault()
        setNickName('');
        setPassword('');
    };

    const handleChangeEmail = (e) => {
        e.preventDefault;
        setNickName(e.target.value);
        if (!e.target.value.length) {
            setNickNameErrors('Обязательное поле');
        } else {
            setNickNameErrors('')
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

    return (
        <div className="Login">
            <form onSubmit={handelSubmit}>
                <h1>Войти</h1>
                {(nickNameDirty && nickNameErrors) && <div style={{color: 'red'}}>{nickNameErrors}</div>}
                <input onChange={handleChangeEmail} onBlur={(e) => handleBlur(e)} name='nickName' type='text' placeholder='Имя пользевателя' value={nickName} />
                {(passwordDirty && passwordErrors) && <div style={{color: 'red'}}>{passwordErrors}</div>}
                <input onChange={handleChangePassword} onBlur={(e) => handleBlur(e)} name='password' type='text' placeholder='Пароль' value={password} />
                <button disabled={!valid} type='submit'>Войти</button>
            </form>
        </div>
    )
};

export default LoginForm;