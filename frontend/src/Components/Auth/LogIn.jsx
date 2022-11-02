import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showLogIn } from "../../redux/actionCreators/showLogIn";

const LogIn = (props) => {
    const handleClick = () => {
        props.showLogIn();
    }

    return (
        <div className={props.className}>
            <button className="login-button" onClick={handleClick}>Вход</button>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
        showLogIn: bindActionCreators(showLogIn, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(LogIn);