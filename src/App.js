import React from 'react';
import Main from './components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Project6_parkingLots/" element={<Main />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
