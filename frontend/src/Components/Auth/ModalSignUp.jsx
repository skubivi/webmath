import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { hideSignUp } from "../../redux/actionCreators/hideSignUp";

const ModalSignUp = (props) => {
    const handleClick = () => {
        props.hideSignUp();
    }
    return (
        <div className={props.active ? 'modal active': 'modal'} onClick={handleClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h1>Присоединяйтесь</h1>
                <h4>и Решайте Задачи Прямо Сейчас!</h4>
                <input placeholder="Username" type='text'/>
                <input placeholder="Email" type='email'/>
                <input placeholder="Password" type='password'/>
                <button>Зарегестрироваться</button>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        active: state.modal.signup
    }
}

function mapDispatchToProps(dispatch) {
    return {
        hideSignUp: bindActionCreators(hideSignUp, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSignUp);