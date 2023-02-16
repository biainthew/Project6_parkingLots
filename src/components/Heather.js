import React from 'react';
import './Heather.scss';

const Heather = () => {
    return (
        <header id="header" className="heather">
            <div className="heather-menu">
                <img src="/img/menu-bar.svg" alt="" />
            </div>
            <div className="heather-logo">
                <h1>Lots to Park</h1>
            </div>
            <div className="header-user">
                <img src="/img/user.svg" alt="" />
            </div>
        </header>
    );
};

export default Heather;
