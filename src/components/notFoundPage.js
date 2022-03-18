import { Link } from "react-router-dom";
import React from 'react';


const NotFound = () => {
    return (
        <div>
            <img alt="Страница не найдена" className="img-fluid" src="https://cdn2.hexlet.io/assets/error-pages/404-34f20d4d98c81c575950c89d4c49027513d0bb3f6adbb3ed85ca0923496f65df.png" />            
            <h1>Страница не найдена</h1>
            <p>
                Но вы можете перейти 
                <Link to="/"> На главую страницу</Link>
            </p>
        </div>
    )
};

export default NotFound;