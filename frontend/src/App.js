import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Header from './components/header';


function App() {
  return (
    <>  
      <Router>
        <div className="App container">
          <Header/>
          <Routes>
            <Route path = '/' element = {<Dashboard/>}></Route>
            <Route path = '/login' element = {<Login/>}></Route>
            <Route path = '/register' element = {<Register/>}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
