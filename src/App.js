import React from 'react';
import Main from './components/Main';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
