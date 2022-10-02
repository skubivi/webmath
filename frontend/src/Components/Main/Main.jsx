import React from "react";

import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Home";
import Videos from './Videos';
import Battles from './Battles';

const Main = (props) => {
    return (
        <div className="Main">
            <h1>Main</h1>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/videos' element={<Videos />} />
                <Route path='/battles' element={<Battles />} />
                <Route path='' element={<Navigate to='/home' />}></Route>
            </Routes>
        </div>
    )
}

export default Main;