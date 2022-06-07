import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/header';
import { UserContextProvider} from './contexts/userContext';
import {useState} from 'react';


function App() {
  
  return (
    <>
      <Router>
        <div className="App container">
          
          {/* cannot use anything other than a route in the routes tag */} 
          <UserContextProvider> 
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
            </Routes>
          </UserContextProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
