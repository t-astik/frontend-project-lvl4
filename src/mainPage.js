import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


const MainPage = () => {

    const isAuth = useSelector(state => state.isAuth);

    const token = localStorage.getItem('token');

    if (!isAuth) return <Redirect to={'./login'} />

    return (
        <div>'MainPage'</div>
    )
};

export default MainPage;