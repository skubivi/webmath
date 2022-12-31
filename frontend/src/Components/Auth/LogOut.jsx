import { InvalidTokenError } from "jwt-decode";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUser } from '../../redux/actionCreators/deleteUser'

const LogIn = (props) => {
    const handleClick = () => {
        localStorage.removeItem('token')
        props.deleteUser();
    }

    return (
        <div className={props.className}>
            <button className="logout-button" onClick={handleClick}>Выйти</button>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
        deleteUser: bindActionCreators(deleteUser, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(LogIn);