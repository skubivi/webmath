import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss';
import Alerts from './Components/Alert/Alerts';
import ModalLogIn from './Components/Auth/ModalLogIn';
import ModalSignUp from './Components/Auth/ModalSignUp';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';
import { check, getOneUser } from './http/userAPI';
import { setUser } from './redux/actionCreators/setUser';

function App(props) {
  useEffect(() => {
    check().then(response => {
      const token = response.data.token
      localStorage.setItem('token', token)
      const id = jwtDecode(token).id
      getOneUser(id).then(response => {
        const user = response.data
        console.log(user)
        props.setUser(user)
      })
    })
    const inteval = setInterval(() => {
      check().then(response => {
        const token = response.data.token
        localStorage.setItem('token', token)
        const id = jwtDecode(token).id
        getOneUser(id).then(response => {
          const user = response.data
          console.log(user)
          props.setUser(user)
        })
      })
    }, 10000) 
    return () => clearInterval(inteval)
  })
  return (
    <div className="app">
      <Sidebar />
      <Main />
      <ModalSignUp />
      <ModalLogIn />
      <Alerts />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: bindActionCreators(setUser, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App);
