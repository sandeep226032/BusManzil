
import './App.css';
import Header from "./components/Header.js";
import { BrowserRouter, Route ,Switch,Link} from 'react-router-dom';

import Login from './components/Login.js';
import Signup from './components/Signup.js';
// import Navbar from "./components/Navbar.js";
function App() {
  return (
     <BrowserRouter>
    <div className="App">
     
            <header>
                  <div className="nav">
                    <div className="logo">
                <img src="bus-manzil-high-resolution-logo.png" alt=""></img>
                    </div>
                    <div className='linebox'>
                            <h1 className='oneline'>Your guide to transit: Find bus stops and routes in a click.</h1>
                            
                    </div>
        <div className="menu">
              <ul>
                                            <li><Link to="/">Home</Link></li>

                        
                            <li><Link to="/login">log in</Link></li>
                          
            
                            <li><Link to="/signup">sign up</Link></li>
                            
            </ul>
        </div>
                        </div>
                </header>
                <Switch>
        <Route exact path="/" component={Header} />
        
   
    
        <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </Switch>
           
      
      </div>
       </BrowserRouter>
  );
}

export default App;
