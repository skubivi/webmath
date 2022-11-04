import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideLogIn } from "../../redux/actionCreators/hideLogIn";

import logo from "../../assets/Images/LogoHomeBlackWebsite.png"

import Image from "../RepeatedComponents/Image";

const ModalLogIn = (props) => {
    const handleClick = () => {
        props.hideLogIn();
    }
    return (
        <div className={props.active ? 'modal active': 'modal'} onClick={handleClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="img">
                    <Image src={logo} />
                </div>
                <input placeholder="Email" type='email'/>
                <input placeholder="Password" type='password'/>
                <div className="remember">
                    <input type='checkbox' className="checkbox"/>
                    <label>Запомнить данные</label>
                </div>
                <button>Войти</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        active: state.modal.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hideLogIn: bindActionCreators(hideLogIn, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogIn);