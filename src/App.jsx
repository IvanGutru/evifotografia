import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react'
import { GlobalContext } from './context/GlobalContext';
import { UserProvider } from './context/UserContext';

function App() {

  const [global] = useContext(GlobalContext);

  return (
    <div className="App">
      <UserProvider>
        {global.module}
      </UserProvider>
    </div>
  )
}

export default App
