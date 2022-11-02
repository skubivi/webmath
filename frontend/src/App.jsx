import './App.scss';
import ModalSignUp from './Components/Auth/ModalSignUp';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Main />
      <ModalSignUp />
    </div>
  );
}

export default App;
