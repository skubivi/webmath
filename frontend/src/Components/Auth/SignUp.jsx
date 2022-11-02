import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSignUp } from "../../redux/actionCreators/showSignUp";

const SignUp = (props) => {
    const handleClick = () => {
        props.showSignUp();
    }

    return (
        <div className={props.className}>
            <button className="sign-up-button" onClick={handleClick}>Регистрация</button>
        </div>
    )
}

function mapDispatchToProps (dispatch) {
    return {
        showSignUp: bindActionCreators(showSignUp, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(SignUp);