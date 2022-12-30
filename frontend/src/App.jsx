import './App.scss';
import Alerts from './Components/Alert/Alerts';
import ModalLogIn from './Components/Auth/ModalLogIn';
import ModalSignUp from './Components/Auth/ModalSignUp';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
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

export default App;
