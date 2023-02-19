import React from 'react';
import Main from './components/Main';
import { Route, Routes } from 'react-router';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
        </Routes>
    );
};

export default App;
