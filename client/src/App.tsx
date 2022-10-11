import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import Bingo from './components/Bingo/Bingo';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/bingo/:room" element={<Bingo />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
