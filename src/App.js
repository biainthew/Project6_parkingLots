import React from 'react';
import Main from './components/Main';
import { Route, Routes } from 'react-router';
import Detail from './components/Detail';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/detail" element={<Detail />} />
        </Routes>
    );
};

export default App;
