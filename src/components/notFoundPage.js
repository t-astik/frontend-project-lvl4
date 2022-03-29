import { Link } from "react-router-dom";
import React from 'react';
import './notFoundPageStyles.css';

const NotFound = () => {
    return (
        <div className="notFoundPage">
            <img alt="Страница не найдена" className="img-fluid notFoundPage__img" src="https://cdn2.hexlet.io/assets/error-pages/404-34f20d4d98c81c575950c89d4c49027513d0bb3f6adbb3ed85ca0923496f65df.png" />            
            <div className="notFoundPage__text">
                <h1 className="notFoundPage__textTitle">Страница не найдена</h1>
                <p className="notFoundPage__textBody">
                    Но вы можете перейти 
                    <Link to="/"> На главую страницу</Link>
                </p>
            </div>
        </div>
    )
};

export default NotFound;