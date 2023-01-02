import React, {useState} from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { hideLogIn } from "../../redux/actionCreators/hideLogIn"
import logo from "../../assets/Images/LogoHomeBlackWebsite.png"
import Image from "../RepeatedComponents/Image"
import { showAlert } from "../../redux/actionCreators/showAlert"
import { login } from "../../http/userAPI"
import jwtDecode from "jwt-decode"
import { setUser } from "../../redux/actionCreators/setUser"

const ModalLogIn = (props) => {
    const handleClick = () => {
        props.hideLogIn()
    }
    const handleButtonClick = async () => {
        try {
            if(!state.email.trim() || !state.password.trim()) {
                const message = !state.email.trim() ?
                'Поле email не может быть пустым' :
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
            const token = await login(state.email, state.password).then(response => {return response.data.token})
            localStorage.setItem('token', token)
            const user = jwtDecode(token)
            console.log(user)
            props.setUser(user)
            props.hideLogIn()
            const message = 'Вы успешно вошли'
            const title = 'Вход'
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

    const initialState = {
        email: '',
        password: ''
    }

    const handleInputChange = (e) => {
        setState((prev)  => ({
            ...prev, ...{
                [e.target.name]: e.target.value
            }
        }))
    }

    const [state, setState] = useState(initialState)

    return (
        <div className={props.active ? 'modal active': 'modal'}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="close" onClick={handleClick}>&#10006;</div>
                <div className="img">
                    <Image src={logo} />
                </div>
                <input placeholder="Email" type='email' name='email' value={state.email} onChange={handleInputChange}/>
                <input placeholder="Password" type='password' name='password' value={state.password} onChange={handleInputChange}/>
                <button onClick={handleButtonClick}>Войти</button>
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
        hideLogIn: bindActionCreators(hideLogIn, dispatch),
        showAlert: bindActionCreators(showAlert, dispatch),
        setUser: bindActionCreators(setUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogIn);