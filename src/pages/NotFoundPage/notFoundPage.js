import { Link } from "react-router-dom";
import React from 'react';
import NotFoundImage from '../../../assets/notFound-image.jpg'


import './notFoundPageStyles.css';

const NotFound = () => {
    return (
        <div className="notFoundPage">
            <img alt="Страница не найдена" className="notFoundPage__img" src={NotFoundImage} />            
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