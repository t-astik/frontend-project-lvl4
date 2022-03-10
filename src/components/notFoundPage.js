import { Link } from "react-router-dom";
import React from 'react';


const NotFound = () => {
    return (
        <div>
            <h1>Страница не найдена</h1>
            <p>
                Но вы можете перейти 
                <Link to="/"> На главую страницу</Link>
            </p>
        </div>
    )
};

export default NotFound;