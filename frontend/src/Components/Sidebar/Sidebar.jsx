import React from "react";
import TasksLink from "./TasksLink";
import LogoLink from "./LogoLink";

import { Link } from 'react-router-dom'
import LogIn from "../Auth/LogIn";
import SignUp from "../Auth/SignUp";
import { connect } from "react-redux";
import LogOut from "../Auth/LogOut";

const Sidebar = (props) => {
    return (
        <nav className="sidebar">
            <Link to='/home'><LogoLink className="sidebar-child sidebar-logo"/></Link>
            <Link to='/tasks'><TasksLink className="sidebar-child" /></Link>
            {!props.isAuth &&
                <SignUp className="sidebar-child" />
            }
            {!props.isAuth &&
                <LogIn className="sidebar-child" />
            }
            <div className="space"></div>
            {props.isAuth &&
                <LogOut className="sidebar-child" />
            }
            
        </nav>
    )
}

function mapStateToProps(state) {
    return {
        isAuth: state.user.isAuth
    }
}

export default  connect(mapStateToProps, null)(Sidebar);