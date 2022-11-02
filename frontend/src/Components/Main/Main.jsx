import React from "react";

import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import Battles from './Battles';

const Main = (props) => {
    return (
        <div className="main">
            <div className="wrapper">
                <Routes>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/battles' element={<Battles />} />
                    <Route path='' element={<Navigate to='/home' />}></Route>
                </Routes>
            </div>
        </div>
    )
}

export default Main;