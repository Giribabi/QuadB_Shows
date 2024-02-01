import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Summary from './components/Summary/Summary'
import { createContext, useState } from 'react';

export const ShowContext = createContext()

const ShowContextProvider = ({children}) => {
  const [show, setShow] = useState({})
  return (
    <ShowContext.Provider value={{show,setShow}}>
      {children}
    </ShowContext.Provider>
  )
}

function App() {
  return (
    <div className="App">
      <ShowContextProvider>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='summary' element = {<Summary/>} />
        </Routes>
      </ShowContextProvider>
    </div>
  );
}

export default App;
