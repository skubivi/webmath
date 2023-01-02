import React from "react";
import { connect } from "react-redux"
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeLoggedOut from "./HomeLoggedOut";
import HomeLoggedIn from "./HomeLoggedIn";
import MonthlyTasks from "./MonthlyTasks";
import Tasks from './Tasks';

const Main = (props) => {
    return (
        <div className="main">
            <div className="wrapper">
                <Routes>
                    {!props.userData.isAuth &&
                        <Route path='/home' element={<HomeLoggedOut/>} />
                    }
                    {props.userData.isAuth &&
                        <Route path='/home' element={<HomeLoggedIn/>} />
                    }
                    <Route path='/tasks' element={<Tasks />} />
                    <Route path='/tasks/monthly' element={<MonthlyTasks />} />
                    <Route path='' element={<Navigate to='/home' />}></Route>
                </Routes>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps, null)(Main)