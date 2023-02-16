import React from 'react';
import './Detail.scss';

const Detail = ({ locations }) => {
    const informations = locations.map((item, idx) => {
        // console.log(item);
        const title = item.title;
        // console.log(title);
        return title;
    });
    return null;
};

export default Detail;
