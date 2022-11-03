import React from "react";
import TasksLink from "./TasksLink";
import LogoLink from "./LogoLink";

import { Link } from 'react-router-dom'
import LogIn from "../Auth/LogIn";
import SignUp from "../Auth/SignUp";

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <Link to='/home'><LogoLink className="sidebar-child sidebar-logo"/></Link>
            <Link to='/tasks'><TasksLink className="sidebar-child" /></Link>
            <SignUp className="sidebar-child" />
            <LogIn className="sidebar-child" />
        </nav>
    )
}

export default Sidebar;