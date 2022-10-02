import React from "react";
import Battles from "./Battles";
import Logo from "./Logo";
import Videos from "./Videos";

import { Link } from 'react-router-dom'

const Sidebar = (props) => {
    return (
        <nav className="Sidebar">
            <Link to='/home'><Logo /></Link>
            <Link to='/videos'><Videos /></Link>
            <Link to='battles'><Battles /></Link>
        </nav>
    )
}

export default Sidebar;