import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import registration from './registration.js';

 
 const SignupForm = () => {
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
        } else {
            return true;
        }
    },[password, passwordVerification]);

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
    };

    return (
        <div className="registration">
            <form>
                <h1>Регистация</h1>
                {(nickNameDirty && nickNameErrors) && <div style={{color: 'red'}}>{nickNameErrors}</div>}
                <input type='text' placeholder="Имя пользевателя" name='nickName' value={nickName} onBlur={handleBlur} onChange={handleChangeNickName}/>
                {(passwordDirty && passwordErrors) && <div style={{color: 'red'}}>{passwordErrors}</div>}
                <input type='text' placeholder="Пароль" name='password' value={password} onChange={handleChangePassword} onBlur={handleBlur}/>
                {(passwordVerificationDirty && passwordVerificationErrors) && <div style={{color: 'red'}}>{passwordVerificationErrors}</div>}
                <input type='text' placeholder="Подвердите пароль" name='passwordVerification' value={passwordVerification} onBlur={handleBlur} onChange={handleChangePasswordVerification}/>
                <button type='submit' disabled={!valid} onClick={handleSubmit}>Зарегестриваться</button>
            </form>
        </div>
    )
};

export default SignupForm;