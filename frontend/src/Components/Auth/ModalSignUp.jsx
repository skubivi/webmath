import React, { useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { hideSignUp } from "../../redux/actionCreators/hideSignUp"
import { showAlert } from '../../redux/actionCreators/showAlert'
import { hideAlert } from '../../redux/actionCreators/hideAlert'
import { registration } from "../../http/userAPI"
import { setUser } from '../../redux/actionCreators/setUser'
import jwtDecode from "jwt-decode"
import { getOneUser } from '../../http/userAPI';

const ModalSignUp = (props) => {

    const initialState = {
        email: '',
        username: '',
        password: ''
    }

    const [state, setState] = useState(initialState)

    const handleClick = () => {
        props.hideSignUp()
    }

    const handleButtonClick = async () => {
        try {
            if(!state.email.trim() || !state.username.trim() || !state.password.trim()) {
                const message = !state.email.trim() ?
                'Поле email не может быть пустым' :
                !state.username.trim() ?
                'Поле username не может быть пустым' :
                'Поле password не может быть пустым'
                const id = Date.now().toString()
                const title = 'Ошибка'
                const newAlert = {message, title, id}
                props.showAlert(newAlert)
                setTimeout(() => {
                    props.hideAlert(newAlert)
                }, 5000)
                return
            }
            if(state.email.indexOf('@') === -1 || state.email.indexOf('.') === -1) {
                const message = 'Поле email введено некорректно'
                const id = Date.now().toString()
                const title = 'Ошибка'
                const newAlert = {message, title, id}
                props.showAlert(newAlert)
                setTimeout(() => {
                    props.hideAlert(newAlert)
                }, 5000)
                return
            }
            const token = await registration(state.email, state.password, state.username).then(response => {return response.data.token})
            localStorage.setItem('token', token)
            const userId = jwtDecode(token).id
            getOneUser(userId).then(response => {
                const user = response.data
                console.log(user)
                props.setUser(user)
            })
            props.hideSignUp()
            const message = 'Вы успешно зарегистрировались'
            const title = 'Регистрация'
            const id = Date.now().toString()
            const newAlert = {message, title, id}
            props.showAlert(newAlert)
            setTimeout(() => {
                props.hideAlert(newAlert)
            }, 5000)
        } catch (e) {
            const message = e.response.data.message
            const title = 'Ошибка'
            const id = Date.now().toString()
            const newAlert = {message, title, id}
            props.showAlert(newAlert)
            setTimeout(() => {
                props.hideAlert(newAlert)
            }, 5000)
        }
    }

    const handleInputChange = (e) => {
        setState((prev)  => ({
            ...prev, ...{
                [e.target.name]: e.target.value
            }
        }))
    }

    return (
        <div className={props.active ? 'modal active': 'modal'}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="close" onClick={handleClick}>&#10006;</div>
                <h1>Присоединяйтесь</h1>
                <h4>и Решайте Задачи Прямо Сейчас!</h4>
                <input placeholder="Email" type='email' value={state.email} name='email' onChange={handleInputChange}/>
                <input placeholder="Username" type='text' value={state.username} name='username' onChange={handleInputChange}/>
                <input placeholder="Password" type='password' value={state.password} name='password' onChange={handleInputChange}/>
                <button onClick={handleButtonClick}>Зарегестрироваться</button>
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
        hideSignUp: bindActionCreators(hideSignUp, dispatch),
        showAlert: bindActionCreators(showAlert, dispatch),
        hideAlert: bindActionCreators(hideAlert, dispatch),
        setUser: bindActionCreators(setUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSignUp)